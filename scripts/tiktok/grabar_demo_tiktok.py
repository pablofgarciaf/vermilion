"""
Graba el video de demostración para la revisión de TikTok (Vermilion Routes).

Qué hace:
  1. Abre el panel de Vermilion para que inicies sesión (esta parte NO se graba).
  2. Empieza a grabar y recorre el flujo completo: menú → TikTok → "Connect with TikTok"
     → pantalla de permisos de TikTok (aquí inicias sesión y pulsas Autorizar)
     → vuelve a la web con tu cuenta conectada → elige el video → "Send to TikTok drafts" → "Done!".
  3. Guarda el resultado como MP4 en la misma carpeta del script.

Instalación (una sola vez, en PowerShell):
  py -m pip install playwright imageio-ffmpeg
  py -m playwright install chromium

Uso:
  py grabar_demo_tiktok.py "C:\\ruta\\vermilion-demo-tiktok.mp4"

Después graba con el celular (grabador de pantalla del teléfono) cómo llega el borrador
a TikTok y sube los dos videos en el formulario de TikTok (acepta hasta 5 archivos).
"""
import os
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import TimeoutError as PwTimeout
from playwright.sync_api import sync_playwright

BASE = os.environ.get("DEMO_BASE", "https://www.vermilionroutes.com")
LOCALE = "en"  # en inglés, para los revisores de TikTok
HERE = Path(__file__).resolve().parent
SIZE = {"width": 1280, "height": 800}


def say(msg):
    print(f"\n>>> {msg}", flush=True)


def caption(page, text):
    """Rótulo discreto arriba a la derecha para que el revisor sepa qué paso está viendo."""
    page.evaluate(
        """(t) => {
            let el = document.getElementById('demo-caption');
            if (!el) {
              el = document.createElement('div');
              el.id = 'demo-caption';
              el.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;max-width:420px;' +
                'background:#111;color:#fff;font:600 15px/1.35 system-ui,sans-serif;padding:10px 14px;' +
                'border-radius:10px;box-shadow:0 4px 18px rgba(0,0,0,.35);pointer-events:none';
              document.body.appendChild(el);
            }
            el.textContent = t;
          }""",
        text,
    )


def launch(p):
    # Usa tu Google Chrome si está instalado (TikTok lo acepta mejor); si no, el Chromium de Playwright.
    headless = os.environ.get("DEMO_HEADLESS") == "1"  # solo para pruebas
    if os.environ.get("DEMO_CHROMIUM"):
        return p.chromium.launch(executable_path=os.environ["DEMO_CHROMIUM"], headless=headless, slow_mo=250)
    try:
        return p.chromium.launch(channel="chrome", headless=headless, slow_mo=250)
    except Exception:
        return p.chromium.launch(headless=headless, slow_mo=250)


def main():
    if len(sys.argv) < 2 or not Path(sys.argv[1]).is_file():
        sys.exit('Uso: py grabar_demo_tiktok.py "C:\\ruta\\video.mp4"')
    video = str(Path(sys.argv[1]).resolve())
    state_file = HERE / "sesion_vermilion.json"
    rec_dir = HERE / "grabacion"
    rec_dir.mkdir(exist_ok=True)

    with sync_playwright() as p:
        browser = launch(p)

        # 1) Inicio de sesión en el panel, sin grabar.
        ctx = browser.new_context(viewport=SIZE)
        page = ctx.new_page()
        page.goto(f"{BASE}/{LOCALE}/admin")
        say("Inicia sesión en el panel de Vermilion en la ventana que se abrió. Te espero (hasta 10 minutos).")
        page.locator('a[href$="/admin/tiktok"]').first.wait_for(state="attached", timeout=600_000)
        ctx.storage_state(path=str(state_file), indexed_db=True)  # la sesión de Firebase vive en IndexedDB
        ctx.close()
        say("Sesión lista. Empieza la grabación.")

        # 2) Flujo grabado.
        ctx = browser.new_context(
            viewport=SIZE,
            storage_state=str(state_file),
            record_video_dir=str(rec_dir),
            record_video_size=SIZE,
        )
        page = ctx.new_page()
        page.goto(f"{BASE}/{LOCALE}/admin")
        link = page.locator('a[href$="/admin/tiktok"]:visible').first
        link.wait_for(timeout=120_000)
        caption(page, "Vermilion Routes admin panel → TikTok")
        time.sleep(2)
        link.click()

        connect = page.get_by_role("button", name="Connect with TikTok")
        connect.wait_for(timeout=60_000)
        caption(page, "Step 1 · Login Kit: connect the TikTok account (user.info.basic)")
        time.sleep(3)
        connect.click()

        say("En la ventana de TikTok: inicia sesión con la cuenta de Vermilion y pulsa Autorizar. Te espero (hasta 10 minutos).")
        page.wait_for_url(f"{BASE}/{LOCALE}/admin/tiktok**", timeout=600_000)
        try:
            page.get_by_text("Connected account").wait_for(timeout=60_000)
        except PwTimeout:
            say("No apareció la cuenta conectada. Revisa el mensaje en la página y mándale una captura a Claude.")
            time.sleep(5)
            raise
        caption(page, "Connected: TikTok profile shown with user.info.basic")
        time.sleep(4)

        caption(page, "Step 2 · Content Posting API (video.upload): send a video to TikTok drafts")
        page.locator("input[type=file]").set_input_files(video)
        time.sleep(2)
        page.get_by_role("button", name="Send to TikTok drafts").click()
        page.get_by_text("Done!").wait_for(timeout=300_000)
        caption(page, "Uploaded: the draft is now in the creator's TikTok inbox")
        time.sleep(5)

        webm = Path(page.video.path())
        ctx.close()  # aquí Playwright termina de escribir el video
        browser.close()

    # 3) Convertir a MP4 (TikTok acepta mp4 o mov).
    import imageio_ffmpeg

    out = HERE / "demo_tiktok_vermilion.mp4"
    subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-i", str(webm),
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "23", "-movflags", "+faststart", str(out)],
        check=True,
    )
    state_file.unlink(missing_ok=True)  # no dejar la sesión guardada en disco
    say(f"Listo: {out}")
    say("Ahora graba con el celular cómo llega el borrador a TikTok y sube los dos videos al formulario.")


if __name__ == "__main__":
    main()
