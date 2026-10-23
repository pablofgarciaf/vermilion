#!/usr/bin/env python3
"""Seguimiento humano de leads de Vermilion Routes (borradores para aprobar).

Qué hace
  1. Lee los leads de Firestore (colecciones `leads` y `bookings` de la web).
  2. Agrupa por correo (si descargó 3 tours, es UN solo mensaje que los nombra).
  3. Redacta el correo humano de Jhayro en el idioma del lead (español si vino de la web en
     español; inglés en los demás casos).
  4. Guarda los borradores en la carpeta `followup_drafts/` para que los REVISES.
  5. Solo envía si tú lo pides con --send y --ids (nada sale sin tu aprobación).

Uso (desde la raíz del proyecto)
  pip install firebase-admin
  py -3 scripts/followup_leads.py                 # genera borradores (no envía nada)
  py -3 scripts/followup_leads.py --min-days 2    # solo leads con 2+ días sin respuesta nuestra
  py -3 scripts/followup_leads.py --send --ids mildred@x.com,otro@y.com   # envía SOLO esos

Credenciales: se leen del `.env` único de la raíz (FIREBASE_SERVICE_ACCOUNT_JSON o
FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY y SMTP_EMAIL/SMTP_PASSWORD/SMTP_HOST/SMTP_PORT).
Nunca se imprimen. Cada envío se registra en el lead (`followUp.sentAt`) para no repetirlo.
"""
import argparse
import base64
import csv
import json
import os
import re
import smtplib
import ssl
import sys
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# El worktree está dentro de .claude/worktrees/...: el .env único vive en la carpeta principal.
ENV_CANDIDATES = [ROOT / ".env", ROOT.parent.parent.parent / ".env"]
OUT = ROOT / "followup_drafts"

PLACEHOLDER_EMAILS = {"pending@guest.com", "guest@vermilionroutes.com", ""}


def load_env():
    for p in ENV_CANDIDATES:
        if p.exists():
            for line in p.read_text(encoding="utf-8").splitlines():
                m = re.match(r"^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$", line)
                if not m or line.lstrip().startswith("#"):
                    continue
                k, v = m.group(1), m.group(2)
                if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
                    v = v[1:-1]
                os.environ.setdefault(k, v)
            return p
    return None


def init_firestore():
    try:
        import firebase_admin
        from firebase_admin import credentials, firestore
    except ImportError:
        sys.exit("Falta firebase-admin. Instala con: pip install firebase-admin")
    raw = os.environ.get("FIREBASE_SERVICE_ACCOUNT_JSON", "").strip()
    info = None
    if raw:
        if not raw.startswith("{"):
            raw = base64.b64decode(raw).decode("utf-8")
        info = json.loads(raw)
    elif os.environ.get("FIREBASE_PRIVATE_KEY"):
        info = {
            "type": "service_account",
            "project_id": os.environ.get("FIREBASE_PROJECT_ID") or os.environ.get("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
            "client_email": os.environ["FIREBASE_CLIENT_EMAIL"],
            "private_key": os.environ["FIREBASE_PRIVATE_KEY"].replace("\\n", "\n"),
            "token_uri": "https://oauth2.googleapis.com/token",
        }
    if not info:
        sys.exit(
            "No hay credenciales de Firebase Admin en el .env.\n"
            "Agrega FIREBASE_SERVICE_ACCOUNT_JSON (la misma que usa Vercel) a tu .env y vuelve a correr."
        )
    firebase_admin.initialize_app(credentials.Certificate(info))
    return firestore.client()


def to_dt(v):
    if v is None:
        return None
    if hasattr(v, "timestamp"):
        return datetime.fromtimestamp(v.timestamp(), tz=timezone.utc)
    if isinstance(v, str):
        try:
            return datetime.fromisoformat(v.replace("Z", "+00:00"))
        except ValueError:
            return None
    return None


PROPER = {"ecuador", "galápagos", "galapagos", "andes", "amazonía", "amazonia", "quito", "cotopaxi", "quilotoa",
          "isabela", "santa", "cruz", "san", "cristóbal", "cristobal", "pacífico", "pacifico", "otavalo", "baños",
          "mindo", "papallacta", "cuenca", "guayaquil", "vermilion"}


def sentence_case_es(t: str) -> str:
    """'De Los Andes Al Encanto De Galápagos' -> 'De los Andes al encanto de Galápagos' (solo títulos en español)."""
    if re.search(r"\b(The|And|With|Of|Ultimate|Tour)\b", t):
        return t  # título en inglés: se deja tal cual
    out = []
    for i, w in enumerate(re.split(r"(\s+)", t)):
        if not w or w.isspace():
            out.append(w)
            continue
        bare = re.sub(r"[.,:;]", "", w.lower())
        out.append(w[:1].upper() + w[1:].lower() if (i == 0 or bare in PROPER) else w.lower())
    return "".join(out)


def clean_item(s: str) -> str:
    return sentence_case_es(re.sub(r"^Descargó el itinerario en PDF:\s*", "", s or "", flags=re.I).strip())


def join_list(items, word):
    items = list(dict.fromkeys(i for i in items if i))
    if len(items) <= 1:
        return items[0] if items else ""
    return f"{', '.join(items[:-1])} {word} {items[-1]}"


def interest_of(raw: dict) -> str:
    if raw.get("source") == "pdf_download":
        return raw.get("tourName") or raw.get("tourId") or ""
    if raw.get("source") == "lead_magnet":
        return "Ecuador & Galápagos guide" if (raw.get("locale") or "en") != "es" else "guía de Ecuador y Galápagos"
    title = raw.get("tourTitle") or raw.get("destination") or ""
    return clean_item(str(title)) if isinstance(title, str) else ""


def draft(name, locale, items):
    first = (name or "").strip().split(" ")[0].capitalize() or ("Hola" if locale == "es" else "there")
    is_es = (locale or "").startswith("es")
    if is_es:
        tours = join_list(items, "y")
        subject = "Tu viaje a Ecuador y Galápagos – Vermilion Routes"
        body = (
            f"Hola {first},\n\n"
            f"Gracias por descargar {('el itinerario de ' + tours) if tours else 'nuestros itinerarios de Ecuador y Galápagos'}.\n\n"
            "Soy Jhayro, gerente de Vermilion Routes. Llevo más de 25 años ayudando a viajeros a descubrir Ecuador "
            "y me encantaría ayudarte a planificar un viaje inolvidable.\n\n"
            "Nuestros tours se adaptan a tus fechas, intereses y presupuesto: los Andes, la Amazonía, la costa del "
            "Pacífico o las Islas Galápagos.\n\n"
            "¿Qué tipo de viaje estás pensando y para qué fechas? Si prefieres, lo hablamos por WhatsApp "
            "(+593 96 003 9156) o en una videollamada corta.\n\n"
            "Solo responde a este correo y te preparo una propuesta.\n\n"
            "Un saludo,\n\nJhayro Ludeña\nGerente | Vermilion Routes\nvermilionroutes.com"
        )
    else:
        tours = join_list(items, "and")
        subject = "Your Ecuador & Galápagos trip – Vermilion Routes"
        body = (
            f"Hi {first},\n\n"
            f"Thank you for downloading {('the ' + tours + ' itinerary') if tours else 'our Ecuador and Galápagos tour itineraries'}!\n\n"
            "I'm Jhayro, the manager of Vermilion Routes. I've been helping travelers discover Ecuador for over 25 "
            "years, and I'd be happy to help you plan a memorable trip.\n\n"
            "Our tours can be tailored to your travel dates, interests, and budget, whether you're dreaming of "
            "exploring the Andes, the Amazon rainforest, Ecuador's Pacific coast, or the Galápagos Islands.\n\n"
            "May I ask what kind of trip you're planning, and when you're hoping to visit Ecuador? If you prefer, "
            "we can talk on WhatsApp (+593 96 003 9156) or on a short video call.\n\n"
            "Simply reply to this email. I'd be happy to help you find the best itinerary for your trip.\n\n"
            "Best regards,\n\nJhayro Ludeña\nManager | Vermilion Routes\nvermilionroutes.com"
        )
    return subject, body


def collect(db, min_days):
    now = datetime.now(timezone.utc)
    groups = {}
    for col in ("leads", "bookings"):
        for d in db.collection(col).stream():
            raw = d.to_dict() or {}
            if col == "bookings" and raw.get("paymentStatus") in ("paid", "confirmed", "verified"):
                continue  # ya es una reserva pagada, no un lead
            email = str(raw.get("customerEmail") or raw.get("email") or "").strip().lower()
            if email in PLACEHOLDER_EMAILS or "@" not in email:
                continue
            created = to_dt(raw.get("createdAt")) or now
            g = groups.setdefault(email, {"email": email, "name": "", "locale": "", "country": "", "items": [],
                                          "refs": [], "first": created, "contacted": False})
            g["name"] = g["name"] or str(raw.get("customerName") or raw.get("name") or "")
            g["locale"] = g["locale"] or str(raw.get("locale") or "")
            g["country"] = g["country"] or str(raw.get("country") or "")
            it = interest_of(raw)
            if it:
                g["items"].append(it)
            g["refs"].append((col, d.id))
            g["first"] = min(g["first"], created)
            if (raw.get("followUp") or {}).get("sentAt") or raw.get("leadStatus") in ("contacted", "itinerary_sent", "won") \
                    or raw.get("status") in ("contacted", "itinerary_sent", "won"):
                g["contacted"] = True
    out = []
    for g in groups.values():
        if g["contacted"]:
            continue
        if (now - g["first"]) < timedelta(days=min_days):
            continue
        out.append(g)
    return sorted(out, key=lambda x: x["first"])


def send_mail(to, subject, body):
    host = os.environ.get("SMTP_HOST", "mail.vermilionroutes.com")
    port = int(os.environ.get("SMTP_PORT", "465"))
    user = os.environ.get("SMTP_EMAIL", "info@vermilionroutes.com")
    pwd = os.environ.get("SMTP_PASSWORD", "")
    if not pwd:
        raise RuntimeError("SMTP_PASSWORD no está en el .env")
    msg = EmailMessage()
    msg["From"] = f"Jhayro Ludeña | Vermilion Routes <{user}>"
    msg["To"] = to
    msg["Reply-To"] = user
    msg["Subject"] = subject
    msg.set_content(body)
    ctx = ssl.create_default_context()
    with smtplib.SMTP_SSL(host, port, context=ctx) if port == 465 else smtplib.SMTP(host, port) as s:
        if port != 465:
            s.starttls(context=ctx)
        s.login(user, pwd)
        s.send_message(msg)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--min-days", type=int, default=0, help="esperar N días desde que llegó el lead (def. 0)")
    ap.add_argument("--send", action="store_true", help="enviar (requiere --ids)")
    ap.add_argument("--ids", default="", help="correos separados por coma que APRUEBAS enviar")
    a = ap.parse_args()

    env = load_env()
    print(f"[i] .env: {'encontrado' if env else 'NO encontrado'}")
    db = init_firestore()
    leads = collect(db, a.min_days)
    OUT.mkdir(exist_ok=True)
    rows = []
    for g in leads:
        subject, body = draft(g["name"], g["locale"], [clean_item(i) for i in g["items"]])
        safe = re.sub(r"[^a-z0-9@._-]", "_", g["email"])
        (OUT / f"{safe}.txt").write_text(f"Para: {g['email']}\nAsunto: {subject}\n\n{body}\n", encoding="utf-8")
        rows.append([g["email"], g["name"], g["locale"] or "?", g["country"] or "?", "; ".join(dict.fromkeys(clean_item(i) for i in g["items"])), g["first"].date().isoformat(), subject])
    with open(OUT / "resumen.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(["correo", "nombre", "idioma", "pais", "pidio", "llego", "asunto"])
        w.writerows(rows)
    print(f"[ok] {len(leads)} lead(s) sin seguimiento. Borradores en: {OUT}")

    if a.send:
        approved = {e.strip().lower() for e in a.ids.split(",") if e.strip()}
        if not approved:
            sys.exit("--send necesita --ids con los correos que apruebas. No se envió nada.")
        for g in leads:
            if g["email"] not in approved:
                continue
            subject, body = draft(g["name"], g["locale"], [clean_item(i) for i in g["items"]])
            send_mail(g["email"], subject, body)
            stamp = {"followUp": {"sentAt": datetime.now(timezone.utc).isoformat(), "by": "followup_leads.py"}}
            for col, doc_id in g["refs"]:
                db.collection(col).document(doc_id).set(stamp, merge=True)
            print(f"[enviado] {g['email']}")
    else:
        print("[i] Modo borrador: no se envió nada. Revisa la carpeta y, si apruebas, usa --send --ids correo1,correo2")


if __name__ == "__main__":
    main()
