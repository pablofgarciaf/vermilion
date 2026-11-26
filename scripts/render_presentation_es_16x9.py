import os
import sys
import subprocess
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

WIDTH = 1920
HEIGHT = 1080
FPS = 30
DURATION_SEC = 40
TOTAL_FRAMES = DURATION_SEC * FPS

FFMPEG_PATH = r"C:\Users\pablo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
AUDIO_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\Presentacion_Espanol\audio_presentation_es_mixed.mp3"
OUTPUT_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\Presentacion_Espanol\Vermilion_Presentacion_Web_16x9_ES.mp4"

# Fonts
FONT_SERIF_XL = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 50)
FONT_SERIF_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 38)
FONT_SERIF_H3 = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 25)
FONT_SERIF_SUBTITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 22)

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

# Assets
LOGO_IMG = Image.open(r"C:\Users\pablo\OneDrive\Desktop\proyectos web\vermilion\public\logo_blanco.png").convert("RGBA")
UI_HOME_DESK = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\UI_Recordings\Retina_Captures\ui_home_desktop.png").convert("RGB")
UI_TOURS_CARDS = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\UI_Recordings\Retina_Captures\ui_tours_cards.png").convert("RGB")

PHOTO_TORTOISE = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_tortuga-gigante-galapagos_01.webp").convert("RGB")
PHOTO_BOOBY = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_4-3_piquero-patas-azules-patas-celestes_275.jpg").convert("RGB")
PHOTO_AMAZON = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_rio-napo-navegacion-amazonia_01.webp").convert("RGB")
PHOTO_ANDES = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_volcan-chimborazo-coloso-andino_01.webp").convert("RGB")
PHOTO_CUENCA = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_cuenca-catedral-patrimonio_01.webp").convert("RGB")

def create_base_canvas(width, height):
    base = Image.new("RGBA", (width, height), (10, 14, 16, 255))
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    # Warm terracotta radial light at center top
    for r in range(height, 0, -8):
        alpha = int(45 * (1 - r / height))
        d.ellipse([width//2 - r*1.3, -r//3, width//2 + r*1.3, r*1.2], fill=(197, 86, 38, alpha))
    # Subtle emerald glow at bottom right
    for r in range(height//2, 0, -12):
        alpha = int(22 * (1 - r / (height//2)))
        d.ellipse([width - r*1.2, height - r*0.8, width + r*0.8, height + r*0.5], fill=(16, 185, 129, alpha))
    # Ambient gold center glow
    for r in range(height//3, 0, -10):
        alpha = int(16 * (1 - r / (height//3)))
        d.ellipse([width//2 - r, height//2 - r, width//2 + r, height//2 + r], fill=(212, 160, 86, alpha))
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

def draw_browser_mockup(frame, img_content, x, y, w, h, title="vermilionroutes.com"):
    draw = ImageDraw.Draw(frame)
    bar_h = 36
    draw.rounded_rectangle([x-4, y-4, x+w+4, y+h+4], radius=20, fill=(16, 22, 25), outline=COLOR_GOLD, width=1)
    draw.rounded_rectangle([x, y, x+w, y+h], radius=16, fill=(18, 22, 25))
    draw.rounded_rectangle([x, y, x+w, y+bar_h], radius=16, fill=(26, 32, 36))
    draw.rectangle([x, y+bar_h-6, x+w, y+bar_h], fill=(26, 32, 36))
    # Window dots
    draw.ellipse([x+16, y+12, x+28, y+24], fill=(239, 68, 68))
    draw.ellipse([x+34, y+12, x+46, y+24], fill=(234, 179, 8))
    draw.ellipse([x+52, y+12, x+64, y+24], fill=(34, 197, 94))
    # URL pill
    draw.rounded_rectangle([x+90, y+8, x+w-90, y+28], radius=10, fill=(14, 18, 20), outline=(70, 85, 95), width=1)
    bbox = draw.textbbox((0, 0), title, font=FONT_MONO)
    tw = bbox[2] - bbox[0]
    draw.text((x + (w - tw)//2, y+10), title, fill=COLOR_MUTED, font=FONT_MONO)
    # Content
    content_h = h - bar_h
    content_round = rounded_image(img_content, (w, content_h), radius=12)
    frame.paste(content_round, (x, y+bar_h), content_round)

def render_scene_1(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "VERMILION ROUTES · OPERADOR BOUTIQUE DMC & EXPEDICIONES DE LUJO"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 45, WIDTH//2 + tw//2 + 24, 82], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 53), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Expediciones a Medida en Ecuador y Galápagos"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 98), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Itinerarios Privados Hechos a Mano · Yates Exclusivos · Guías Naturalistas Certificados"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 162), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    mock_w, mock_h = 860, 560
    draw_browser_mockup(frame, UI_HOME_DESK, 80, 220, mock_w, mock_h, "vermilionroutes.com/es")

    px, py, pw, ph = 1000, 220, 840, 560
    draw.rounded_rectangle([px-4, py-4, px+pw+4, py+ph+4], radius=20, fill=(16, 22, 25), outline=COLOR_GOLD, width=1)
    photo_round = rounded_image(PHOTO_TORTOISE, (pw, ph), radius=16)
    frame.paste(photo_round, (px, py), photo_round)
    draw.rounded_rectangle([px + 30, py + ph - 80, px + pw - 30, py + ph - 25], radius=14, fill=(10, 15, 18), outline=COLOR_GOLD, width=1)
    draw.text((px + 50, py + ph - 68), "FAUNA ICÓNICA DE GALÁPAGOS · SANTA CRUZ & ISABELA", fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    badges = [
        ("Calificación 5.0 TripAdvisor", "100% Excelencia Comprobada & Travelers' Choice"),
        ("Certificación Oficial MINTUR", "Operador Turístico Registrado Licencia #1793215264001"),
        ("Portal de Asesores & Afiliados", "Comisión Neta 15% Garantizada & Conserjería VIP 24/7")
    ]
    bw = 540
    bx_start = (WIDTH - (bw * 3 + 40 * 2)) // 2
    by = 825
    for i, (b_title, b_desc) in enumerate(badges):
        bx = bx_start + i * (bw + 40)
        draw.rounded_rectangle([bx, by, bx + bw, by + 100], radius=18, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.text((bx + 25, by + 20), b_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((bx + 25, by + 56), b_desc, fill=COLOR_WHITE, font=FONT_SANS_REG)

    ft = "vermilionroutes.com · Quito · Galápagos · Soporte Directo: info@vermilionroutes.com"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1000), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def render_scene_2(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "CUATRO MUNDOS INCOMPARABLES · UN DESTINO EXTRAORDINARIO"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 45, WIDTH//2 + tw//2 + 24, 82], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 53), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Experiencias Curadas para Viajeros Exigentes"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 98), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Guías Naturalistas Privados · Haciendas Históricas · Cruceros Boutique"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 162), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    cards = [
        ("ISLAS GALÁPAGOS", "CRUCEROS PRIVADOS", PHOTO_BOOBY, [
            "• Yates y Catamaranes de Primera Clase",
            "• Snorkel íntimo con fauna marina única",
            "• Naturalistas Bilingües Nivel III"
        ]),
        ("SELVA AMAZÓNICA", "LODGES DE ALTA GAMA", PHOTO_AMAZON, [
            "• Lodges premier en Yasuní y Cuyabeno",
            "• Pasarelas sobre el dosel selvático",
            "• Inmersión cultural y safaris nocturnos"
        ]),
        ("ANDES & VOLCANES", "HACIENDAS HISTÓRICAS", PHOTO_ANDES, [
            "• Haciendas coloniales del siglo XVII",
            "• Ruta VIP Avenida de los Volcanes",
            "• Cabalgatas y senderos de alta montaña"
        ]),
        ("COSTA & CIUDADES", "PATRIMONIO & SABOR", PHOTO_CUENCA, [
            "• Quito y Cuenca Patrimonio UNESCO",
            "• Haciendas de cacao fino de aroma",
            "• Conserjería VIP en aeropuerto y hoteles"
        ]),
    ]

    card_w = 410
    card_h = 630
    start_x = (WIDTH - (card_w * 4 + 30 * 3)) // 2
    cy = 220

    for i, (name, badge_tag, img_asset, bullets) in enumerate(cards):
        cx = start_x + i * (card_w + 30)
        draw.rounded_rectangle([cx-3, cy-3, cx+card_w+3, cy+card_h+3], radius=20, fill=(16, 22, 25), outline=COLOR_GOLD, width=1)
        draw.rounded_rectangle([cx, cy, cx+card_w, cy+card_h], radius=18, fill=(18, 25, 28))
        thumb_h = 240
        round_thumb = rounded_image(img_asset, (card_w, thumb_h), radius=16)
        frame.paste(round_thumb, (cx, cy), round_thumb)
        draw.rounded_rectangle([cx + 16, cy + thumb_h - 40, cx + 16 + 210, cy + thumb_h - 12], radius=10, fill=(10, 14, 16), outline=COLOR_GOLD, width=1)
        draw.text((cx + 26, cy + thumb_h - 34), badge_tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

        draw.text((cx + 20, cy + thumb_h + 18), name, fill=COLOR_WHITE, font=FONT_SERIF_H3)
        draw.line([cx + 20, cy + thumb_h + 58, cx + card_w - 20, cy + thumb_h + 58], fill=(212, 160, 86, 80), width=1)

        by = cy + thumb_h + 75
        for b in bullets:
            draw.text((cx + 20, by), b, fill=COLOR_MUTED, font=FONT_SANS_REG)
            by += 44

        draw.rounded_rectangle([cx + 20, cy + card_h - 60, cx + card_w - 20, cy + card_h - 18], radius=12, fill=(24, 34, 38), outline=COLOR_GOLD, width=1)
        draw.text((cx + 65, cy + card_h - 47), "Explorar Itinerarios →", fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)

    nt = "Todos los viajes son 100% personalizables con operaciones terrestres y aviación privada."
    bbox_nt = draw.textbbox((0, 0), nt, font=FONT_SANS_REG)
    draw.text((WIDTH//2 - (bbox_nt[2]-bbox_nt[0])//2, 940), nt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_REG)

    return frame

def render_scene_3(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "TECNOLOGÍA DE RESERVAS & HERRAMIENTAS PARA ASESORES"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 45, WIDTH//2 + tw//2 + 24, 82], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 53), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Plataforma Oficial de Reservas & Portal B2B"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 98), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Tarifas Netas Instantáneas · Comisiones Protegidas · Itinerarios Personalizados"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 162), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    mock_w, mock_h = 920, 580
    draw_browser_mockup(frame, UI_TOURS_CARDS, 80, 220, mock_w, mock_h, "vermilionroutes.com/es/tours")

    benefits = [
        ("Comisión 15% Garantizada", "TARIFAS NETAS FIDUCIARIAS", (16, 185, 129),
         "Estructura protegida de comisión para agencias y asesores con seguimiento transparente y liquidaciones bancarias puntuales."),
        ("Propuestas Marca Blanca", "MARKETING CO-BRANDED", (212, 160, 86),
         "Genera en 1 clic itinerarios PDF de alta gama listos para presentar a tu cliente, con tu logo, contacto y precios retail."),
        ("Conserjería Operativa 24/7", "OPERACIONES DIRECTAS", (59, 130, 246),
         "Equipo local en Ecuador y enlace en Norteamérica garantizando una ejecución VIP perfecta desde la llegada hasta el regreso.")
    ]

    bx = 1040
    by = 220
    bw = 800
    bh = 175
    for title, pill, col, desc in benefits:
        draw.rounded_rectangle([bx-3, by-3, bx+bw+3, by+bh+3], radius=18, fill=(16, 22, 25), outline=COLOR_GOLD, width=1)
        draw.rounded_rectangle([bx, by, bx+bw, by+bh], radius=16, fill=(18, 25, 28))
        draw.rounded_rectangle([bx + 25, by + 18, bx + 25 + 230, by + 46], radius=10, fill=(col[0], col[1], col[2]), outline=col, width=1)
        draw.text((bx + 35, by + 24), pill, fill=(10, 15, 18), font=FONT_MONO_BOLD)
        draw.text((bx + 25, by + 56), title, fill=COLOR_WHITE, font=FONT_SERIF_H3)
        draw.text((bx + 25, by + 102), desc[:78], fill=COLOR_MUTED, font=FONT_SANS_REG)
        draw.text((bx + 25, by + 128), desc[78:], fill=COLOR_MUTED, font=FONT_SANS_REG)
        by += bh + 25

    nt = "Consulta tarifas netas confidenciales y material promocional en vermilionroutes.com/travel-advisors"
    bbox_nt = draw.textbbox((0, 0), nt, font=FONT_SANS_REG)
    draw.text((WIDTH//2 - (bbox_nt[2]-bbox_nt[0])//2, 860), nt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_REG)

    return frame

def render_scene_4(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    logo_w, logo_h = 240, 100
    logo_resized = LOGO_IMG.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    frame.paste(logo_resized, (WIDTH//2 - logo_w//2, 50), logo_resized)

    tag = "ALIANZA DIRECTA CON EL OPERADOR BOUTIQUE LÍDER EN ECUADOR"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 168, WIDTH//2 + tw//2 + 24, 204], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 176), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Eleva tu Portafolio de Viajes con Vermilion"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 220), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Afiliación y Soporte Directo para Agencias de Viajes y Creadores"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 285), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    cards = [
        ("PLATAFORMA OFICIAL", "vermilionroutes.com", "Expediciones a Medida & Catálogo", [
            "• Catálogo interactivo de viajes multi-día",
            "• Reseñas 5.0 verificadas en TripAdvisor",
            "• Disponibilidad y cotizaciones en vivo"
        ]),
        ("ATENCIÓN A ASESORES", "info@vermilionroutes.com", "Operaciones & Soporte Personalizado", [
            "• WhatsApp VIP Directo: (+593) 96 003 9156",
            "• Mesa de soporte comercial y ejecutivos dedicados",
            "• Respuesta en menos de 2 horas para cotizaciones"
        ]),
        ("REGISTRO INMEDIATO", "vermilionroutes.com", "Afiliación Rápida en 60 Segundos", [
            "• Tarifarios netos y folletos descargables",
            "• Banco de fotografías sin marca de alta resolución",
            "• Comisión fiduciaria 100% protegida"
        ])
    ]

    cw = 540
    ch = 340
    start_x = (WIDTH - (cw * 3 + 40 * 2)) // 2
    cy = 360

    for i, (tag_top, val_main, sub_title, bullets) in enumerate(cards):
        cx = start_x + i * (cw + 40)
        draw.rounded_rectangle([cx-3, cy-3, cx+cw+3, cy+ch+3], radius=20, fill=(16, 22, 25), outline=COLOR_GOLD, width=1)
        draw.rounded_rectangle([cx, cy, cx+cw, cy+ch], radius=18, fill=(18, 25, 28))
        
        draw.rounded_rectangle([cx + 25, cy + 22, cx + 25 + 240, cy + 50], radius=10, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
        draw.text((cx + 35, cy + 28), tag_top, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

        draw.text((cx + 25, cy + 68), val_main, fill=COLOR_WHITE, font=FONT_SERIF_H3)
        draw.text((cx + 25, cy + 108), sub_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.line([cx + 25, cy + 142, cx + cw - 25, cy + 142], fill=(212, 160, 86, 80), width=1)

        by = cy + 160
        for b in bullets:
            draw.text((cx + 25, by), b, fill=COLOR_MUTED, font=FONT_SANS_REG)
            by += 44

    draw.rounded_rectangle([WIDTH//2 - 520, 750, WIDTH//2 + 520, 830], radius=16, fill=(18, 25, 28), outline=COLOR_GOLD, width=2)
    cta = "VERMILION ROUTES · OPERADOR TURÍSTICO BOUTIQUE · LICENCIA MINTUR #1793215264001"
    bbox_cta = draw.textbbox((0, 0), cta, font=FONT_SANS_BOLD)
    draw.text((WIDTH//2 - (bbox_cta[2]-bbox_cta[0])//2, 782), cta, fill=COLOR_WHITE, font=FONT_SANS_BOLD)

    ft = "© 2026 Vermilion Routes LLC / Cía. Ltda. · Quito · Guayaquil · Cuenca · Islas Galápagos"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 920), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def get_frame(frame_num):
    scene_idx = frame_num // 300
    local_frame = frame_num % 300
    progress = local_frame / 300.0

    renderers = [render_scene_1, render_scene_2, render_scene_3, render_scene_4]
    renderer = renderers[min(scene_idx, len(renderers) - 1)]
    curr_img = renderer(progress)

    # Smooth transition cross-fade in the first 15 frames of scenes 1, 2, 3
    if local_frame < 15 and scene_idx > 0:
        prev_renderer = renderers[scene_idx - 1]
        prev_img = prev_renderer(1.0)
        alpha = local_frame / 15.0
        return Image.blend(prev_img, curr_img, alpha)

    return curr_img

def main():
    print(f"Rendering 16:9 Vermilion Presentation Video ES: {TOTAL_FRAMES} frames ({WIDTH}x{HEIGHT} @ {FPS}fps)...")
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
            print(f"Render progress 16:9 ES: {i}/{TOTAL_FRAMES} frames ({int(i/TOTAL_FRAMES*100)}%)...")

    proc.stdin.close()
    proc.wait()
    print(f"16:9 Presentation Video ES rendered successfully to: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
