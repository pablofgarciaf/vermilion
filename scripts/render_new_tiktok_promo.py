import os
import sys
import subprocess
import tempfile
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

FFMPEG = "ffmpeg"
OUTPUT_DIR = r"C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Vermilion Routes\TikTok_Campañas"
FINAL_VIDEO = os.path.join(OUTPUT_DIR, "Vermilion_TikTok_Promo_2026_9x16.mp4")
FINAL_COPY = os.path.join(OUTPUT_DIR, "COPY_TIKTOK_PROMO_2026.txt")

MUSIC_PATH = r"C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Modulares GM\BlackFriday2026\composition\assets\music\happy-beats-business-moves-vol-12-by-ende-dot-app.mp3"
LOGO_PATH = r"C:\dev\proyectos\vermilion\public\logo_blanco.png"

# Footage sources
CLIPS = [
    {
        "path": r"C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Vermilion Routes\Metraje_Original_Descargado_TikTok\9-16_tiktok_galapagos_islas_fauna_01.mp4",
        "ss": "2.0",
        "t": "3.8",
        "badge": "ISLAS GALÁPAGOS · ECUADOR",
        "title": "¿Conocer Galápagos\nsin multitudes?",
        "desc": "Expediciones 100% privadas a tu medida",
        "highlight": "FAUNA SALVAJE EN LIBERTAD"
    },
    {
        "path": r"C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Vermilion Routes\Metraje_Original_Descargado_TikTok\9-16_tiktok_cotopaxi_volcan_paramo_01.mp4",
        "ss": "3.0",
        "t": "3.8",
        "badge": "PARQUE NACIONAL COTOPAXI",
        "title": "Los Andes como\nnunca los imaginaste",
        "desc": "Haciendas históricas y paisajes infinitos",
        "highlight": "GUÍAS NATURALISTAS NATIVOS"
    },
    {
        "path": r"C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Vermilion Routes\Metraje_Original_Descargado_TikTok\9-16_tiktok_quilotoa_crater_laguna_01.mp4",
        "ss": "1.5",
        "t": "3.8",
        "badge": "CRÁTER ESMERALDA DEL QUILOTOA",
        "title": "Sin grupos de 50 personas.\nSolo tu familia y tú.",
        "desc": "Itinerarios flexibles creados para ti",
        "highlight": "EXPEDICIONES EXCLUSIVAS"
    },
    {
        "path": r"C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Vermilion Routes\Metraje_Original_Galapagos\9-16_galapagos_lobo_marino_nadando_01.mp4",
        "ss": "3.5",
        "t": "4.2",
        "badge": "VERMILION ROUTES · DMC",
        "title": "PLANIFICA TU VIAJE 2026",
        "desc": "★★★★★ 5.0 en TripAdvisor (52 Reseñas)\nLicencia Oficial Mintur #1793215456001",
        "highlight": "LINK EN BIO · VERMILIONROUTES.COM",
        "is_endcard": True
    }
]

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Fonts
try:
    FONT_BADGE = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 26)
    FONT_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 52)
    FONT_TITLE_BIG = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 56)
    FONT_DESC = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 32)
    FONT_CTA = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 34)
except Exception:
    FONT_BADGE = ImageFont.load_default()
    FONT_TITLE = ImageFont.load_default()
    FONT_TITLE_BIG = ImageFont.load_default()
    FONT_DESC = ImageFont.load_default()
    FONT_CTA = ImageFont.load_default()

def create_overlay(clip_info, out_png):
    img = Image.new("RGBA", (1080, 1920), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    is_endcard = clip_info.get("is_endcard", False)

    # Gradient overlay for text readability
    if is_endcard:
        # Full dark luxury overlay for CTA
        for y in range(1920):
            alpha = int(140 + (y / 1920.0) * 80)
            draw.line([(0, y), (1080, y)], fill=(8, 12, 16, alpha))
        
        # Draw Logo if available
        if os.path.exists(LOGO_PATH):
            logo = Image.open(LOGO_PATH).convert("RGBA")
            logo.thumbnail((440, 140), Image.Resampling.LANCZOS)
            lw, lh = logo.size
            img.paste(logo, (540 - lw//2, 420), logo)

        # Title
        t = clip_info["title"]
        bbox = draw.textbbox((0, 0), t, font=FONT_TITLE_BIG)
        tw = bbox[2] - bbox[0]
        draw.text((540 - tw//2, 620), t, font=FONT_TITLE_BIG, fill=(255, 255, 255))

        # Rating stars
        stars_text = "★★★★★"
        bbox_stars = draw.textbbox((0, 0), stars_text, font=FONT_BADGE)
        sw = bbox_stars[2] - bbox_stars[0]
        draw.text((540 - sw//2, 720), stars_text, font=FONT_BADGE, fill=(250, 204, 21))

        # Desc
        desc_lines = clip_info["desc"].split("\n")
        curr_y = 770
        for line in desc_lines:
            bbox = draw.textbbox((0, 0), line, font=FONT_DESC)
            lw = bbox[2] - bbox[0]
            draw.text((540 - lw//2, curr_y), line, font=FONT_DESC, fill=(226, 232, 240))
            curr_y += 44

        # Deposito badge
        dep_text = "🛡️ Depósito 100% Protegido · Asesoría Personalizada"
        bbox = draw.textbbox((0, 0), dep_text, font=FONT_BADGE)
        dw = bbox[2] - bbox[0]
        draw.rounded_rectangle([540 - dw//2 - 25, 900, 540 + dw//2 + 25, 955], radius=28, fill=(16, 185, 129, 60), outline=(52, 211, 153), width=2)
        draw.text((540 - dw//2, 912), dep_text, font=FONT_BADGE, fill=(167, 243, 208))

        # CTA Button
        cta_text = clip_info["highlight"]
        bbox = draw.textbbox((0, 0), cta_text, font=FONT_CTA)
        cw = bbox[2] - bbox[0]
        draw.rounded_rectangle([540 - cw//2 - 40, 1030, 540 + cw//2 + 40, 1120], radius=32, fill=(220, 38, 38, 240), outline=(248, 113, 113), width=2)
        draw.text((540 - cw//2, 1052), cta_text, font=FONT_CTA, fill=(255, 255, 255))

    else:
        # Bottom gradient band for regular scenes (0 to 1920)
        # Top gradient subtle
        for y in range(400):
            alpha = int(140 * (1.0 - y / 400.0))
            draw.line([(0, y), (1080, y)], fill=(0, 0, 0, alpha))
        
        # Bottom gradient heavy (from y=1100 to 1920)
        for y in range(1100, 1920):
            alpha = int(210 * ((y - 1100.0) / 820.0))
            draw.line([(0, y), (1080, y)], fill=(5, 8, 12, alpha))

        # Top Watermark / Logo small
        if os.path.exists(LOGO_PATH):
            logo = Image.open(LOGO_PATH).convert("RGBA")
            logo.thumbnail((260, 80), Image.Resampling.LANCZOS)
            img.paste(logo, (60, 80), logo)

        # Badge pill
        badge_text = clip_info["badge"]
        bbox_b = draw.textbbox((0, 0), badge_text, font=FONT_BADGE)
        bw = bbox_b[2] - bbox_b[0]
        draw.rounded_rectangle([60, 1280, 60 + bw + 40, 1335], radius=20, fill=(0, 0, 0, 180), outline=(212, 160, 86, 220), width=2)
        draw.text((80, 1292), badge_text, font=FONT_BADGE, fill=(245, 158, 11))

        # Title (multi-line)
        lines = clip_info["title"].split("\n")
        curr_y = 1360
        for l in lines:
            draw.text((62, curr_y+2), l, font=FONT_TITLE, fill=(0, 0, 0, 220)) # shadow
            draw.text((60, curr_y), l, font=FONT_TITLE, fill=(255, 255, 255))
            curr_y += 66

        # Description
        draw.text((62, curr_y + 12), clip_info["desc"], font=FONT_DESC, fill=(0, 0, 0, 220))
        draw.text((60, curr_y + 10), clip_info["desc"], font=FONT_DESC, fill=(226, 232, 240))

        # Highlight tag
        curr_y += 70
        hw_text = "✨ " + clip_info["highlight"]
        bbox_h = draw.textbbox((0, 0), hw_text, font=FONT_BADGE)
        hw = bbox_h[2] - bbox_h[0]
        draw.rounded_rectangle([60, curr_y, 60 + hw + 36, curr_y + 48], radius=16, fill=(16, 185, 129, 210))
        draw.text((78, curr_y + 10), hw_text, font=FONT_BADGE, fill=(255, 255, 255))

    img.save(out_png, "PNG")
    print(f"Overlay created: {out_png}")

def main():
    temp_dir = tempfile.mkdtemp(prefix="vr_tiktok_")
    print(f"Working in temp dir: {temp_dir}")
    rendered_segments = []

    for idx, c in enumerate(CLIPS):
        overlay_png = os.path.join(temp_dir, f"overlay_{idx}.png")
        create_overlay(c, overlay_png)

        seg_mp4 = os.path.join(temp_dir, f"seg_{idx}.mp4")
        # Video filter: scale to cover 1080x1920, crop, overlay PNG
        # -c:v libx264 -preset veryfast -pix_fmt yuv420p
        vf = (
            f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30[bg];"
            f"[1:v]scale=1080:1920[ovl];"
            f"[bg][ovl]overlay=0:0[outv]"
        )
        cmd = [
            FFMPEG, "-y",
            "-ss", c["ss"],
            "-i", c["path"],
            "-loop", "1", "-i", overlay_png,
            "-t", c["t"],
            "-filter_complex", vf,
            "-map", "[outv]",
            "-c:v", "libx264",
            "-preset", "faster",
            "-crf", "20",
            "-pix_fmt", "yuv420p",
            seg_mp4
        ]
        print(f"Rendering segment {idx + 1}/{len(CLIPS)}...")
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error in segment {idx}:", res.stderr)
            sys.exit(1)
        rendered_segments.append(seg_mp4)

    # Concat segments
    concat_txt = os.path.join(temp_dir, "concat.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for s in rendered_segments:
            f.write(f"file '{s.replace(chr(92), '/')}'\n")

    video_only = os.path.join(temp_dir, "concat_video.mp4")
    subprocess.run([
        FFMPEG, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_txt,
        "-c", "copy",
        video_only
    ], check=True)

    # Add music track
    print("Mixing background music...")
    total_duration = sum(float(c["t"]) for c in CLIPS)
    fade_start = max(0, total_duration - 1.5)
    
    cmd_audio = [
        FFMPEG, "-y",
        "-i", video_only,
        "-i", MUSIC_PATH,
        "-filter_complex",
        f"[1:a]volume=0.35,afade=t=in:st=0:d=0.5,afade=t=out:st={fade_start:.1f}:d=1.5[aout]",
        "-map", "0:v",
        "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-t", f"{total_duration:.1f}",
        "-movflags", "+faststart",
        FINAL_VIDEO
    ]
    subprocess.run(cmd_audio, check=True)

    # Write Copy
    copy_content = """# 📱 PROMO TIKTOK / REELS 2026 — VERMILION ROUTES
Archivo de video: Vermilion_TikTok_Promo_2026_9x16.mp4
Formato: 1080x1920 (9:16 Vertical HD)
Duración: 15.6 segundos

----------------------------------------------------
📝 COPY PARA TIKTOK / INSTAGRAM REELS (Copiar y Pegar):
----------------------------------------------------
¿Conocer Galápagos y Ecuador sin grupos de 50 personas? 🌊🐢

En Vermilion Routes diseñamos expediciones 100% privadas a tu propio ritmo:
✨ Encuentros cercanos con fauna única en libertad
🌋 Volcanes colosales y lagunas esmeralda en los Andes
🌿 Guías naturalistas oficiales bilingües
🛡️ Depósito 100% Protegido con Licencia Oficial Mintur

Calificación 5.0 ★★★★★ en TripAdvisor (52 Reseñas Verificadas)

👉 Diseña tu itinerario privado en el link de la bio
🌐 vermilionroutes.com

#Galapagos #Ecuador #ViajesPrivados #TravelTok #EcuadorTravel #GalapagosIslands #BucketListTravel #TurismoEcuador
"""
    with open(FINAL_COPY, "w", encoding="utf-8") as f:
        f.write(copy_content)

    print("\n" + "="*60)
    print("🎬 VIDEO PROMOCIONAL RENDERIZADO CON ÉXITO:")
    print(FINAL_VIDEO)
    print("📝 COPY DE PUBLICACIÓN:")
    print(FINAL_COPY)
    print("="*60)

if __name__ == "__main__":
    main()
