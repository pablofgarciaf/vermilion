import os
import sys
import subprocess
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

WIDTH = 1080
HEIGHT = 1920
FPS = 30
DURATION_SEC = 40
TOTAL_FRAMES = DURATION_SEC * FPS

FFMPEG_PATH = r"C:\Users\pablo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
AUDIO_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\Galapagos_Exclusivo\audio_galapagos_es_mixed.mp3"
OUTPUT_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\Galapagos_Exclusivo\Vermilion_Galapagos_Exclusivo_9x16.mp4"

# Vertical fonts
FONT_V_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 46)
FONT_V_SUBTITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 24)
FONT_SERIF_H3 = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 26)

FONT_SANS_BOLD = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 22)
FONT_SANS_REG = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 18)
FONT_SANS_SMALL = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 15)
FONT_MONO = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 15)
FONT_MONO_BOLD = ImageFont.truetype(r"C:\Windows\Fonts\consolab.ttf", 18)

# Colors
COLOR_GOLD = (212, 160, 86)
COLOR_GOLD_LIGHT = (238, 208, 155)
COLOR_TERRACOTTA = (197, 86, 38)
COLOR_WHITE = (255, 255, 255)
COLOR_MUTED = (185, 200, 205)
COLOR_EMERALD = (16, 185, 129)

# Load Assets
LOGO_IMG = Image.open(r"C:\Users\pablo\OneDrive\Desktop\proyectos web\vermilion\public\logo_blanco.png").convert("RGBA")
UI_HOME_MOB = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\UI_Recordings\Retina_Captures\ui_home_mobile.png").convert("RGB")
UI_MOBILE_TOURS = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\UI_Recordings\Retina_Captures\ui_mobile_tours_cards.png").convert("RGB")

PHOTO_TORTOISE = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_tortuga-gigante-galapagos_01.webp").convert("RGB")
PHOTO_BOOBY = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_4-3_piquero-patas-azules-patas-celestes_275.jpg").convert("RGB")
PHOTO_IGUANA = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_4-3_cabeza-iguana-marina-perfil_302.jpg").convert("RGB")
PHOTO_EXPEDITION = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_NUEVA_16-9_galapagos_expedicion_0201.jpg").convert("RGB")

def create_base_canvas(width, height):
    base = Image.new("RGBA", (width, height), (10, 14, 16, 255))
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for r in range(height, 0, -8):
        alpha = int(45 * (1 - r / height))
        d.ellipse([width//2 - r*1.3, -r//3, width//2 + r*1.3, r*1.2], fill=(16, 185, 129, alpha))
    for r in range(height//2, 0, -12):
        alpha = int(24 * (1 - r / (height//2)))
        d.ellipse([width - r*1.2, height - r*0.8, width + r*0.8, height + r*0.5], fill=(212, 160, 86, alpha))
    for r in range(height//3, 0, -10):
        alpha = int(18 * (1 - r / (height//3)))
        d.ellipse([width//2 - r, height//2 - r, width//2 + r, height//2 + r], fill=(197, 86, 38, alpha))
    return Image.alpha_composite(base, overlay).convert("RGB")

BASE_CANVAS = create_base_canvas(WIDTH, HEIGHT)

def rounded_image(img, size, radius):
    img_resized = img.resize(size, Image.Resampling.LANCZOS)
    mask = Image.new("L", size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, size[0], size[1]], radius=radius, fill=255)
    res = Image.new("RGBA", size, (0, 0, 0, 0))
    res.paste(img_resized.convert("RGBA"), (0, 0), mask)
    return res

def draw_iphone_mockup(frame, img_content, x, y, w, h):
    draw = ImageDraw.Draw(frame)
    notch_w, notch_h = 90, 22
    draw.rounded_rectangle([x-4, y-4, x+w+4, y+h+4], radius=38, fill=(16, 20, 24), outline=COLOR_GOLD, width=2)
    draw.rounded_rectangle([x, y, x+w, y+h], radius=34, fill=(14, 18, 20))
    screen_w, screen_h = w - 16, h - 16
    screen_round = rounded_image(img_content, (screen_w, screen_h), radius=28)
    frame.paste(screen_round, (x+8, y+8), screen_round)
    draw.rounded_rectangle([x + w//2 - notch_w//2, y+14, x + w//2 + notch_w//2, y+14+notch_h], radius=11, fill=(0, 0, 0))
    draw.ellipse([x + w//2 + 20, y+19, x + w//2 + 30, y+29], fill=(20, 30, 45))

def render_scene_1(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "VERMILION ROUTES · EXPEDICIONES GALÁPAGOS"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 80, WIDTH//2 + tw//2 + 20, 120], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 90), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Islas Galápagos"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 145), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    t2 = "El Santuario del Planeta"
    bbox2 = draw.textbbox((0, 0), t2, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox2[2]-bbox2[0])//2, 205), t2, fill=COLOR_GOLD_LIGHT, font=FONT_V_TITLE)

    sub = "Cruceros Boutique · Encuentros Íntimos con la Fauna"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_V_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 275), sub, fill=COLOR_MUTED, font=FONT_V_SUBTITLE)

    mw, mh = 440, 900
    mx = WIDTH//2 - mw//2
    my = 350
    draw_iphone_mockup(frame, UI_HOME_MOB, mx, my, mw, mh)

    fw, fh = 360, 240
    fx, fy = WIDTH - fw - 40, 420
    draw.rounded_rectangle([fx-3, fy-3, fx+fw+3, fy+fh+3], radius=18, fill=(16, 22, 25), outline=COLOR_GOLD, width=1)
    photo_round = rounded_image(PHOTO_TORTOISE, (fw, fh), radius=16)
    frame.paste(photo_round, (fx, fy), photo_round)
    draw.rounded_rectangle([fx + 15, fy + fh - 40, fx + fw - 15, fy + fh - 10], radius=8, fill=(10, 14, 16), outline=COLOR_GOLD, width=1)
    draw.text((fx + 25, fy + fh - 32), "TORTUGAS GIGANTES", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    badges = [
        ("TripAdvisor 5.0 Estrellas", "100% Calificación de Excelencia en Galápagos"),
        ("Certificación Oficial MINTUR", "Operador Turístico Autorizado Licencia #1793215264001"),
        ("Naturalistas Bilingües Nivel III", "Biólogos y Guías Expertos del Parque Nacional")
    ]
    by = 1320
    for b_title, b_desc in badges:
        draw.rounded_rectangle([70, by, WIDTH - 70, by + 115], radius=20, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.text((110, by + 24), b_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((110, by + 65), b_desc, fill=COLOR_WHITE, font=FONT_SANS_REG)
        by += 140

    ft = "vermilionroutes.com/galapagos · Asistencia 24/7: info@vermilionroutes.com"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1780), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def render_scene_2(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "FAUNA ÚNICA Y SIN BARRERAS"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 80, WIDTH//2 + tw//2 + 20, 120], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 90), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Especies Endémicas"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 145), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    sub = "Tortugas Gigantes · Piqueros · Iguanas · Playas Vírgenes"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_V_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 215), sub, fill=COLOR_GOLD_LIGHT, font=FONT_V_SUBTITLE)

    worlds = [
        ("TORTUGAS GIGANTES", "Reserva El Chato & Senderos de Lava", PHOTO_TORTOISE),
        ("PIQUEROS PATAS AZULES", "Cortejo Nupcial & Nidos en Seymour", PHOTO_BOOBY),
        ("IGUANAS MARINAS", "Los Únicos Saurios Marinos del Mundo", PHOTO_IGUANA),
        ("AGUAS TURQUESAS", "Tortuga Bay & Snorkel en Las Grietas", PHOTO_EXPEDITION)
    ]

    by = 290
    card_h = 320
    for name, desc, img_asset in worlds:
        draw.rounded_rectangle([70, by, WIDTH - 70, by + card_h], radius=22, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        pw, ph = 300, card_h
        round_p = rounded_image(img_asset, (pw, ph), radius=20)
        frame.paste(round_p, (70, by), round_p)
        rx = 400
        draw.text((rx, by + 45), name, fill=COLOR_WHITE, font=FONT_SERIF_H3)
        draw.text((rx, by + 105), desc[:42], fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((rx, by + 145), desc[42:], fill=COLOR_MUTED, font=FONT_SANS_REG)
        draw.rounded_rectangle([rx, by + 210, rx + 240, by + 260], radius=12, fill=(28, 38, 42), outline=COLOR_GOLD, width=1)
        draw.text((rx + 30, by + 225), "Ver Expedición →", fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        by += card_h + 30

    nt = "Acceso a zonas exclusivas reguladas por el Parque Nacional Galápagos"
    bbox_nt = draw.textbbox((0, 0), nt, font=FONT_SANS_REG)
    draw.text((WIDTH//2 - (bbox_nt[2]-bbox_nt[0])//2, 1750), nt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_REG)

    return frame

def render_scene_3(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "CRUCEROS BOUTIQUE & YATES PRIVADOS"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 80, WIDTH//2 + tw//2 + 20, 120], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 90), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Navegación Íntima VIP"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 145), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    sub = "Itinerarios de 4 a 8 Días desde $1,790 USD"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_V_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 215), sub, fill=COLOR_GOLD_LIGHT, font=FONT_V_SUBTITLE)

    mw, mh = 440, 900
    mx = WIDTH//2 - mw//2
    my = 290
    draw_iphone_mockup(frame, UI_MOBILE_TOURS, mx, my, mw, mh)

    benefits = [
        ("Yates y Catamaranes Boutique", "Fondeaderos remotos y confort exclusivo sin multitudes."),
        ("Snorkel Diario con Fauna Marina", "Buceo guiado con tortugas, lobos marinos y rayas doradas."),
        ("Logística Integral y Vuelos", "Vuelos a Baltra/San Cristóbal, permisos y traslados VIP.")
    ]
    by = 1260
    for b_title, b_desc in benefits:
        draw.rounded_rectangle([70, by, WIDTH - 70, by + 125], radius=20, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.text((110, by + 26), b_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((110, by + 68), b_desc, fill=COLOR_WHITE, font=FONT_SANS_REG)
        by += 150

    ft = "Reserva en vermilionroutes.com/galapagos"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1780), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def render_scene_4(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    logo_w, logo_h = 280, 117
    logo_resized = LOGO_IMG.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    frame.paste(logo_resized, (WIDTH//2 - logo_w//2, 100), logo_resized)

    tag = "RESERVA TU EXPEDICIÓN EN GALÁPAGOS"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 240, WIDTH//2 + tw//2 + 20, 280], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 250), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Vive la Aventura de tu Vida"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 310), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    sub = "Expediciones Extraordinarias en las Islas Encantadas"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_V_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 380), sub, fill=COLOR_GOLD_LIGHT, font=FONT_V_SUBTITLE)

    cards = [
        ("PLATAFORMA OFICIAL", "vermilionroutes.com/galapagos", "Catálogo Completo & Salidas", [
            "• Cruceros boutique de 4 a 8 días",
            "• Salidas semanales con fechas garantizadas",
            "• Pago seguro con AMEX, Visa, Apple Pay"
        ]),
        ("CONSERJERÍA VIP DIRECTA", "(+593) 96 003 9156", "WhatsApp VIP y Atención 24/7", [
            "• Asesores especialistas en Galápagos en vivo",
            "• Itinerarios a medida para parejas y familias",
            "• Respuesta en menos de 2 horas garantizada"
        ]),
        ("GARANTÍA FIDUCIARIA", "100% DEPÓSITO PROTEGIDO", "Tranquilidad y Respaldo Total", [
            "• Operador acreditado por el Parque Nacional",
            "• Políticas transparentes de cancelación flexible",
            "• Calificación 5.0 comprobada en TripAdvisor"
        ])
    ]

    by = 460
    card_h = 360
    for tag_top, val_main, sub_title, bullets in cards:
        draw.rounded_rectangle([70, by, WIDTH - 70, by + card_h], radius=22, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.rounded_rectangle([100, by + 24, 100 + 260, by + 56], radius=10, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
        draw.text((115, by + 30), tag_top, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)
        draw.text((100, by + 74), val_main, fill=COLOR_WHITE, font=FONT_SERIF_H3)
        draw.text((100, by + 116), sub_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.line([100, by + 154, WIDTH - 100, by + 154], fill=(212, 160, 86, 80), width=1)
        by_b = by + 175
        for b in bullets:
            draw.text((100, by_b), b, fill=COLOR_MUTED, font=FONT_SANS_REG)
            by_b += 46
        by += card_h + 35

    draw.rounded_rectangle([WIDTH//2 - 460, 1680, WIDTH//2 + 460, 1755], radius=16, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
    cta = "PARQUE NACIONAL GALÁPAGOS · OPERADOR OFICIAL MINTUR #1793215264001"
    bbox_cta = draw.textbbox((0, 0), cta, font=FONT_MONO_BOLD)
    draw.text((WIDTH//2 - (bbox_cta[2]-bbox_cta[0])//2, 1705), cta, fill=COLOR_WHITE, font=FONT_MONO_BOLD)

    ft = "© 2026 Vermilion Routes LLC / Cía. Ltda. · Quito · Puerto Ayora · San Cristóbal"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1800), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def get_frame(frame_num):
    scene_idx = frame_num // 300
    local_frame = frame_num % 300
    progress = local_frame / 300.0

    renderers = [render_scene_1, render_scene_2, render_scene_3, render_scene_4]
    renderer = renderers[min(scene_idx, len(renderers) - 1)]
    curr_img = renderer(progress)

    if local_frame < 15 and scene_idx > 0:
        prev_renderer = renderers[scene_idx - 1]
        prev_img = prev_renderer(1.0)
        alpha = local_frame / 15.0
        return Image.blend(prev_img, curr_img, alpha)

    return curr_img

def main():
    print(f"Rendering 9:16 Vermilion Galapagos Exclusive Video: {TOTAL_FRAMES} frames ({WIDTH}x{HEIGHT} @ {FPS}fps)...")
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    cmd = [
        FFMPEG_PATH,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-i", AUDIO_PATH,
        "-map", "0:v",
        "-map", "1:a",
        "-c:v", "libx264",
        "-profile:v", "main",
        "-level", "4.0",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "18",
        "-c:a", "aac",
        "-b:a", "192k",
        "-t", str(DURATION_SEC),
        "-movflags", "+faststart",
        OUTPUT_PATH
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    for i in range(TOTAL_FRAMES):
        frame = get_frame(i)
        proc.stdin.write(frame.tobytes())
        if i % 150 == 0 or i == TOTAL_FRAMES - 1:
            print(f"Render progress 9:16 Galapagos: {i}/{TOTAL_FRAMES} frames ({int(i/TOTAL_FRAMES*100)}%)...")

    proc.stdin.close()
    proc.wait()
    print(f"9:16 Galapagos Exclusive Video rendered successfully to: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
