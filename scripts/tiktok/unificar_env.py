"""
Une todos los archivos .env de un proyecto en uno solo (.env.local) y deja el contenido
listo para pegar en Vercel. Nunca imprime los valores de las claves en pantalla.

Uso (PowerShell, desde la carpeta del proyecto, por ejemplo la de Vermilion):
  py unificar_env.py
  py unificar_env.py "C:\\ruta\\al\\proyecto"      (si lo corres desde otra carpeta)

Qué hace:
  1. Busca .env, .env.local, .env.production, etc. (ignora .env.example, que es la plantilla de GitHub).
  2. Los une respetando la prioridad de Next.js (.env.production.local > .env.local > .env.production > .env).
     Arregla líneas escritas a mano como "tiktok client key XXXX" → TIKTOK_CLIENT_KEY=XXXX.
  3. Guarda una copia de respaldo de todos los originales FUERA del proyecto (en tu carpeta de usuario).
  4. Escribe un único .env.local y, si confirmas, borra los demás.
  5. Copia al portapapeles el texto para pegar en Vercel (sin variables locales ni de sistema).
"""
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# Variables que usa el código de Vermilion (para avisar cuáles faltan).
VERMILION_VARS = """ADMIN_EMAIL ADMIN_PASSWORD AI_PROVIDER DEEPSEEK_API_KEY FIREBASE_CLIENT_EMAIL FIREBASE_PRIVATE_KEY
FIREBASE_PROJECT_ID GEMINI_API_KEY GLM_API_KEY JWT_SECRET N8N_WEBHOOK_URL NEXT_PUBLIC_ADMIN_EMAIL NEXT_PUBLIC_AHREFS_KEY
NEXT_PUBLIC_BASE_URL NEXT_PUBLIC_CLARITY_PROJECT_ID NEXT_PUBLIC_FACEBOOK_APP_ID NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
NEXT_PUBLIC_FIREBASE_API_KEY NEXT_PUBLIC_FIREBASE_APP_ID NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN NEXT_PUBLIC_FIREBASE_DATABASE_ID
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID NEXT_PUBLIC_FIREBASE_PROJECT_ID NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_GA_SECONDARY_ID NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_SECONDARY NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_META_PIXEL_ID NEXT_PUBLIC_PAYPAL_CLIENT_ID NVAPI_KEY NVIDIA_API_KEY PAYPAL_CLIENT_ID PAYPAL_CLIENT_SECRET PAYPAL_MODE
SEED_SECRET SMTP_EMAIL SMTP_HOST SMTP_PASSWORD SMTP_PORT STRIPE_RESTRICTED_KEY STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET
TIKTOK_CLIENT_KEY TIKTOK_CLIENT_SECRET WHATSAPP_APP_SECRET WHATSAPP_TOKEN WHATSAPP_VERIFY_TOKEN ZHIPU_API_KEY""".split()
MUST_HAVE_FOR_TIKTOK = ["TIKTOK_CLIENT_KEY", "TIKTOK_CLIENT_SECRET"]
NOT_FOR_VERCEL = {"NODE_ENV", "VERCEL", "VERCEL_ENV", "VERCEL_URL"}

# De menor a mayor prioridad (el último gana), como hace Next.js en producción.
PRIORITY = [".env", ".env.development", ".env.production", ".env.local", ".env.development.local", ".env.production.local"]

KV = re.compile(r"^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$")
HANDWRITTEN = [  # líneas escritas a mano → nombre correcto
    (re.compile(r"^\s*tiktok\s+client\s+key\s*[:=]?\s*(\S+)\s*$", re.I), "TIKTOK_CLIENT_KEY"),
    (re.compile(r"^\s*tiktok\s+client\s+secret\s*[:=]?\s*(\S+)\s*$", re.I), "TIKTOK_CLIENT_SECRET"),
    (re.compile(r"^\s*tiktok\s+(?:app\s*id\s*[:=]?\s*)?(\d{10,})\s*$", re.I), "TIKTOK_APP_ID"),
]


def clean_value(v):
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
        return v[1:-1]
    if " #" in v:  # comentario al final de la línea
        v = v.split(" #", 1)[0].rstrip()
    return v


def parse(path, notes):
    out = {}
    lines = path.read_text(encoding="utf-8-sig", errors="replace").splitlines()
    i = 0
    while i < len(lines):
        raw = lines[i]
        line = raw.strip()
        i += 1
        if not line or line.startswith("#"):
            continue
        if line.lower().startswith("tiktok-developers-site-verification"):
            notes.append(f"{path.name} línea {i}: la verificación de TikTok no va en el .env, va en el DNS del dominio (registro TXT). La quité.")
            continue
        m = KV.match(raw)
        if m:
            key, value = m.group(1), m.group(2).strip()
            # valores entre comillas que ocupan varias líneas (p. ej. FIREBASE_PRIVATE_KEY)
            if value[:1] in "\"'" and not (len(value) > 1 and value.endswith(value[0])):
                quote, parts = value[0], [value]
                while i < len(lines) and not lines[i].rstrip().endswith(quote):
                    parts.append(lines[i])
                    i += 1
                if i < len(lines):
                    parts.append(lines[i])
                    i += 1
                value = "\n".join(parts)
            out[key] = clean_value(value)
            continue
        for rx, name in HANDWRITTEN:
            hm = rx.match(line)
            if hm:
                out[name] = hm.group(1)
                notes.append(f"{path.name} línea {i}: estaba escrita a mano; la convertí a {name}=…")
                break
        else:
            notes.append(f"{path.name} línea {i}: no tiene el formato NOMBRE=valor; la dejé fuera (revísala).")
    return out


def fmt(key, value):
    # Las claves de varias líneas (FIREBASE_PRIVATE_KEY) quedan en una sola línea con \n, como las espera la web y Vercel.
    if "\n" in value:
        return f'{key}="{value.replace(chr(10), chr(92) + "n")}"'
    if " " in value or "#" in value:
        return f'{key}="{value}"'
    return f"{key}={value}"


def main():
    root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path.cwd()
    files = [p for p in root.glob(".env*") if p.is_file() and p.name != ".env.example"]
    if not files:
        sys.exit(f"No encontré archivos .env en {root}")

    rank = {name: n for n, name in enumerate(PRIORITY)}
    files.sort(key=lambda p: rank.get(p.name, -1))  # nombres raros (.env copia, .env.bak) = prioridad más baja
    print(f"\nProyecto: {root}")
    print(f"Encontré {len(files)} archivo(s) .env: " + ", ".join(p.name for p in files))

    merged, origin, conflicts, notes = {}, {}, [], []
    for p in files:
        for k, v in parse(p, notes).items():
            if k in merged and merged[k] != v and v:
                conflicts.append(f"{k}: tenía un valor en {origin[k]} y otro en {p.name}; gana {p.name}")
            if v or k not in merged:
                merged[k], origin[k] = v, p.name

    backup = Path.home() / f"respaldo-env-{root.name}-{datetime.now():%Y%m%d-%H%M%S}"
    backup.mkdir(parents=True)
    for p in files:
        shutil.copy2(p, backup / p.name)

    target = root / ".env.local"
    body = "\n".join(fmt(k, merged[k]) for k in sorted(merged)) + "\n"
    target.write_text("# Archivo único de variables (unificado con unificar_env.py). No se sube a GitHub.\n" + body, encoding="utf-8")

    print(f"\n✔ Respaldo de los originales en: {backup}")
    print(f"✔ Archivo único creado: {target} ({len(merged)} variables)")
    for n in notes:
        print("  ·", n)
    for c in conflicts:
        print("  ⚠", c)

    if root.name.lower().startswith("vermilion") or (root / "proxy.ts").exists():
        missing = [v for v in VERMILION_VARS if not merged.get(v)]
        if missing:
            print("\nFaltan (o están vacías) estas variables que usa la web:")
            print("  " + ", ".join(missing))
        for v in MUST_HAVE_FOR_TIKTOK:
            if not merged.get(v):
                print(f"  ⚠ {v} no está: sin ella el botón de TikTok no funciona.")

    others = [p for p in files if p.name != ".env.local"]
    if others and input(f"\n¿Borro los otros {len(others)} .env y dejo solo .env.local? (s/n): ").strip().lower() == "s":
        for p in others:
            p.unlink()
        print("✔ Listo: solo queda .env.local (y la plantilla .env.example).")

    local_only = sorted(k for k, v in merged.items() if "localhost" in v or "127.0.0.1" in v)
    for_vercel = "\n".join(fmt(k, merged[k]) for k in sorted(merged) if k not in NOT_FOR_VERCEL and k not in local_only) + "\n"
    try:
        subprocess.run("clip", input=for_vercel.encode("utf-16"), check=True, shell=True)  # portapapeles de Windows
        print("\n✔ Copié al portapapeles el texto para Vercel.")
        print("  Vercel → proyecto → Settings → Environment Variables → haz clic en el campo «Key»,")
        print("  pega (Ctrl+V) y Vercel separa todas las variables solo → Save → Deployments → Redeploy.")
    except Exception:
        print("\nNo pude copiar al portapapeles: abre .env.local, copia todo y pégalo en Vercel (campo «Key»).")
    if local_only:
        print("  No copié estas porque apuntan a tu PC (localhost): " + ", ".join(local_only))


if __name__ == "__main__":
    main()
