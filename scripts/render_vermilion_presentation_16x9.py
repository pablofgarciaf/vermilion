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
AUDIO_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\English_B2B_Partners\vermilion_b2b_luxury_audio_mixed.mp3"
OUTPUT_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\English_B2B_Partners\Vermilion_B2B_Presentation_16x9.mp4"

# Fonts
FONT_SERIF_XL = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 52)
FONT_SERIF_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 40)
FONT_SERIF_H3 = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 26)
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

def draw_browser_mockup(frame, img_content, x, y, w, h, title="vermilionroutes.com/en"):
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

    tag = "VERMILION ROUTES · BESPOKE EXPEDITIONS & LUXURY DMC"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 45, WIDTH//2 + tw//2 + 24, 82], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 53), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Ecuador & Galapagos Luxury Journeys"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 98), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Handcrafted Itineraries · Private Charters · Handpicked Naturalist Guides"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 162), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    mock_w, mock_h = 860, 560
    draw_browser_mockup(frame, UI_HOME_DESK, 80, 220, mock_w, mock_h, "vermilionroutes.com/en")

    px, py, pw, ph = 1000, 220, 840, 560
    draw.rounded_rectangle([px-4, py-4, px+pw+4, py+ph+4], radius=20, fill=(16, 22, 25), outline=COLOR_GOLD, width=1)
    photo_round = rounded_image(PHOTO_TORTOISE, (pw, ph), radius=16)
    frame.paste(photo_round, (px, py), photo_round)
    draw.rounded_rectangle([px + 30, py + ph - 80, px + pw - 30, py + ph - 25], radius=14, fill=(10, 15, 18), outline=COLOR_GOLD, width=1)
    draw.text((px + 50, py + ph - 68), "GALAPAGOS WILDLIFE EXPEDITIONS · SANTA CRUZ & ISABELA", fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    badges = [
        ("TripAdvisor 5.0 Rating", "100% 5-Star Reviews & Travelers' Choice 2026"),
        ("MINTUR Certified", "Official Registered Boutique Tour Operator"),
        ("B2B Travel Advisors", "15% Protected Agent Commission & VIP Concierge")
    ]
    bw = 540
    bx_start = (WIDTH - (bw * 3 + 40 * 2)) // 2
    by = 825
    for i, (b_title, b_desc) in enumerate(badges):
        bx = bx_start + i * (bw + 40)
        draw.rounded_rectangle([bx, by, bx + bw, by + 100], radius=18, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.text((bx + 25, by + 20), b_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((bx + 25, by + 56), b_desc, fill=COLOR_WHITE, font=FONT_SANS_REG)

    ft = "vermilionroutes.com · Quito · Galapagos · Direct Partner Desk: info@vermilionroutes.com"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1000), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def render_scene_2(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "FOUR UNRIVALED WORLDS · ONE EXTRAORDINARY DESTINATION"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 45, WIDTH//2 + tw//2 + 24, 82], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 53), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Curated Expeditions for Discerning Travelers"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 98), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Private Naturalist Guides · Boutique Haciendas · Expedition Yachts"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 162), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    cards = [
        ("GALAPAGOS ISLANDS", "EXCLUSIVE CHARTERS", PHOTO_BOOBY, [
            "• First-Class & Luxury Yacht Charters",
            "• Private Island Hopping & Snorkeling",
            "• Level-III Bilingual Naturalists"
        ]),
        ("AMAZON RAINFOREST", "DEEP JUNGLE LODGES", PHOTO_AMAZON, [
            "• Yasuní & Cuyabeno Premier Lodges",
            "• Private Canopy Walks & Night Safaris",
            "• Indigenous Community Immersion"
        ]),
        ("ANDES & VOLCANOES", "HISTORIC HACIENDAS", PHOTO_ANDES, [
            "• 17th-Century Colonial Haciendas",
            "• Avenue of the Volcanoes VIP Route",
            "• High-Altitude Horseback Treks"
        ]),
        ("PACIFIC COAST & CITIES", "HERITAGE & GASTRONOMY", PHOTO_CUENCA, [
            "• Quito & Cuenca UNESCO World Heritage",
            "• Fine Organic Cocoa & Coffee Estates",
            "• VIP Airport Meet & Greet Concierge"
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
        draw.text((cx + 55, cy + card_h - 47), "Explore Custom Itineraries →", fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)

    nt = "All journeys 100% tailor-made with private aviation options and dedicated ground operations."
    bbox_nt = draw.textbbox((0, 0), nt, font=FONT_SANS_REG)
    draw.text((WIDTH//2 - (bbox_nt[2]-bbox_nt[0])//2, 940), nt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_REG)

    return frame

def render_scene_3(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "TECHNOLOGY FOR LUXURY TRAVEL ADVISORS"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 45, WIDTH//2 + tw//2 + 24, 82], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 53), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "The B2B Luxury Partner Portal"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 98), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Instant Net Rates · Protected Commissions · Co-Branded Proposals"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 162), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    mock_w, mock_h = 920, 580
    draw_browser_mockup(frame, UI_TOURS_CARDS, 80, 220, mock_w, mock_h, "vermilionroutes.com/en/tours")

    benefits = [
        ("15% Protected Commission", "GUARANTEED NET RATES", (16, 185, 129),
         "Protected commission structure for Virtuoso, Signature & ASTA advisors with transparent automated tracking and prompt ACH payouts."),
        ("Instant White-Label Proposals", "CO-BRANDED MARKETING", (212, 160, 86),
         "Generate presentation-ready client PDF itineraries in 1-click featuring your agency's logo, branding, and customized retail pricing."),
        ("24/7 Operations Concierge", "GROUND LIAISON", (59, 130, 246),
         "Dedicated operations team in Ecuador and North American liaison ensuring flawless VIP execution from arrival to departure.")
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

    nt = "Access confidential net rates and downloadable marketing assets at vermilionroutes.com/en/travel-advisors"
    bbox_nt = draw.textbbox((0, 0), nt, font=FONT_SANS_REG)
    draw.text((WIDTH//2 - (bbox_nt[2]-bbox_nt[0])//2, 860), nt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_REG)

    return frame

def render_scene_4(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    logo_w, logo_h = 240, 100
    logo_resized = LOGO_IMG.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    frame.paste(logo_resized, (WIDTH//2 - logo_w//2, 50), logo_resized)

    tag = "PARTNER WITH ECUADOR'S PREMIER LUXURY DMC"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 24, 168, WIDTH//2 + tw//2 + 24, 204], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 176), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Elevate Your Luxury Travel Portfolio"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_SERIF_XL)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 220), t1, fill=COLOR_WHITE, font=FONT_SERIF_XL)

    sub = "Direct Partnership for Top Global Advisors & Travel Designers"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_SERIF_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 285), sub, fill=COLOR_GOLD_LIGHT, font=FONT_SERIF_SUBTITLE)

    cards = [
        ("OFFICIAL WEB PLATFORM", "vermilionroutes.com", "Bespoke Journeys & Live Catalog", [
            "• Interactive multi-day expedition catalog",
            "• Verified TripAdvisor 5.0 traveler reviews",
            "• Real-time availability & bespoke booking"
        ]),
        ("B2B ADVISOR DESK", "info@vermilionroutes.com", "Dedicated Operations & Support", [
            "• WhatsApp VIP: (+593) 96 003 9156",
            "• North American advisor liaison desk",
            "• Guaranteed 2-hour response for custom RFPs"
        ]),
        ("INSTANT ONBOARDING", "vermilionroutes.com", "Fast Registration in 60 Seconds", [
            "• Direct access to net rate sheets & brochures",
            "• Unbranded high-resolution photo bank",
            "• Protected commissions & zero competition"
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
    cta = "VERMILION ROUTES · CERTIFIED BOUTIQUE TOUR OPERATOR · MINTUR #1793215264001"
    bbox_cta = draw.textbbox((0, 0), cta, font=FONT_SANS_BOLD)
    draw.text((WIDTH//2 - (bbox_cta[2]-bbox_cta[0])//2, 782), cta, fill=COLOR_WHITE, font=FONT_SANS_BOLD)

    ft = "© 2026 Vermilion Routes LLC / Cía. Ltda. · Quito · Guayaquil · Cuenca · Galapagos Islands"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 920), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def get_frame(frame_num):
    # 4 scenes, 300 frames each (10.0s each)
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
    print(f"Rendering 16:9 Vermilion Video: {TOTAL_FRAMES} frames ({WIDTH}x{HEIGHT} @ {FPS}fps)...")
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
            print(f"Render progress 16:9: {i}/{TOTAL_FRAMES} frames ({int(i/TOTAL_FRAMES*100)}%)...")

    proc.stdin.close()
    proc.wait()
    print(f"16:9 Presentation Video rendered successfully to: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
