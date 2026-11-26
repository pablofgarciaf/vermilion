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
AUDIO_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\English_B2B_Partners\vermilion_b2b_luxury_audio_mixed.mp3"
OUTPUT_PATH = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\Videos Producidos\English_B2B_Partners\Vermilion_B2B_Presentation_9x16.mp4"

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
PHOTO_AMAZON = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_rio-napo-navegacion-amazonia_01.webp").convert("RGB")
PHOTO_ANDES = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_volcan-chimborazo-coloso-andino_01.webp").convert("RGB")
PHOTO_CUENCA = Image.open(r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\⭐ LAS MAS BELLAS PARA VIDEOS\2. Horizontales 16-9 (YouTube - Web Banners)\⭐_TOP_16-9_cuenca-catedral-patrimonio_01.webp").convert("RGB")

def create_base_canvas(width, height):
    base = Image.new("RGBA", (width, height), (10, 14, 16, 255))
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for r in range(height, 0, -8):
        alpha = int(45 * (1 - r / height))
        d.ellipse([width//2 - r*1.3, -r//3, width//2 + r*1.3, r*1.2], fill=(197, 86, 38, alpha))
    for r in range(height//2, 0, -12):
        alpha = int(22 * (1 - r / (height//2)))
        d.ellipse([width - r*1.2, height - r*0.8, width + r*0.8, height + r*0.5], fill=(16, 185, 129, alpha))
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

    tag = "VERMILION ROUTES · LUXURY DMC"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 80, WIDTH//2 + tw//2 + 20, 120], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 90), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Ecuador & Galapagos"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 145), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    t2 = "Luxury Journeys"
    bbox2 = draw.textbbox((0, 0), t2, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox2[2]-bbox2[0])//2, 205), t2, fill=COLOR_GOLD_LIGHT, font=FONT_V_TITLE)

    sub = "Handcrafted Itineraries · Private Charters"
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
    draw.text((fx + 25, fy + fh - 32), "GALAPAGOS WILDLIFE", fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

    badges = [
        ("TripAdvisor 5.0 Rating", "100% 5-Star Reviews & Travelers' Choice 2026"),
        ("MINTUR Certified", "Official Registered Boutique Tour Operator"),
        ("B2B Travel Advisors", "15% Protected Agent Commission & VIP Concierge")
    ]
    by = 1320
    for b_title, b_desc in badges:
        draw.rounded_rectangle([70, by, WIDTH - 70, by + 115], radius=20, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.text((110, by + 24), b_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((110, by + 65), b_desc, fill=COLOR_WHITE, font=FONT_SANS_REG)
        by += 140

    ft = "vermilionroutes.com · Direct B2B Desk: info@vermilionroutes.com"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1780), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def render_scene_2(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "FOUR UNRIVALED WORLDS"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 80, WIDTH//2 + tw//2 + 20, 120], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 90), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Curated Expeditions"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 145), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    sub = "Galapagos · Amazon · Andes · Pacific"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_V_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 215), sub, fill=COLOR_GOLD_LIGHT, font=FONT_V_SUBTITLE)

    worlds = [
        ("GALAPAGOS EXPEDITIONS", "Private Catamarans & Snorkeling", PHOTO_BOOBY),
        ("AMAZON RAINFOREST", "Deep Jungle Lodges & Safaris", PHOTO_AMAZON),
        ("ANDES & VOLCANOES", "Historic Haciendas & VIP Routes", PHOTO_ANDES),
        ("PACIFIC & HERITAGE", "UNESCO Quito, Cuenca & Cocoa", PHOTO_CUENCA)
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
        draw.text((rx, by + 105), desc[:36], fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((rx, by + 145), desc[36:], fill=COLOR_MUTED, font=FONT_SANS_REG)
        draw.rounded_rectangle([rx, by + 210, rx + 240, by + 260], radius=12, fill=(28, 38, 42), outline=COLOR_GOLD, width=1)
        draw.text((rx + 30, by + 225), "Custom Itinerary →", fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        by += card_h + 30

    nt = "All journeys 100% tailor-made with dedicated operations support"
    bbox_nt = draw.textbbox((0, 0), nt, font=FONT_SANS_REG)
    draw.text((WIDTH//2 - (bbox_nt[2]-bbox_nt[0])//2, 1750), nt, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_REG)

    return frame

def render_scene_3(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    tag = "B2B PARTNER TECHNOLOGY"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 80, WIDTH//2 + tw//2 + 20, 120], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 90), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "B2B Advisor Portal"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 145), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    sub = "15% Protected Commission & Instant Proposals"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_V_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 215), sub, fill=COLOR_GOLD_LIGHT, font=FONT_V_SUBTITLE)

    mw, mh = 440, 900
    mx = WIDTH//2 - mw//2
    my = 290
    draw_iphone_mockup(frame, UI_MOBILE_TOURS, mx, my, mw, mh)

    benefits = [
        ("15% Protected Commission", "Automated tracking for Virtuoso, Signature & ASTA."),
        ("Instant White-Label Proposals", "Generate co-branded client PDF itineraries with your logo."),
        ("24/7 Operations Concierge", "Bilingual operations team in Ecuador & US liaison.")
    ]
    by = 1260
    for b_title, b_desc in benefits:
        draw.rounded_rectangle([70, by, WIDTH - 70, by + 125], radius=20, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.text((110, by + 26), b_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.text((110, by + 68), b_desc, fill=COLOR_WHITE, font=FONT_SANS_REG)
        by += 150

    ft = "Register at vermilionroutes.com/en/travel-advisors"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1780), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

    return frame

def render_scene_4(progress):
    frame = BASE_CANVAS.copy()
    draw = ImageDraw.Draw(frame)

    logo_w, logo_h = 280, 117
    logo_resized = LOGO_IMG.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    frame.paste(logo_resized, (WIDTH//2 - logo_w//2, 100), logo_resized)

    tag = "PARTNER WITH ECUADOR'S LUXURY DMC"
    bbox = draw.textbbox((0, 0), tag, font=FONT_MONO_BOLD)
    tw = bbox[2] - bbox[0]
    draw.rounded_rectangle([WIDTH//2 - tw//2 - 20, 240, WIDTH//2 + tw//2 + 20, 280], radius=18, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
    draw.text((WIDTH//2 - tw//2, 250), tag, fill=COLOR_GOLD_LIGHT, font=FONT_MONO_BOLD)

    t1 = "Elevate Your Portfolio"
    bbox1 = draw.textbbox((0, 0), t1, font=FONT_V_TITLE)
    draw.text((WIDTH//2 - (bbox1[2]-bbox1[0])//2, 310), t1, fill=COLOR_WHITE, font=FONT_V_TITLE)

    sub = "Direct Partnership for Global Travel Advisors"
    bbox_sub = draw.textbbox((0, 0), sub, font=FONT_V_SUBTITLE)
    draw.text((WIDTH//2 - (bbox_sub[2]-bbox_sub[0])//2, 380), sub, fill=COLOR_GOLD_LIGHT, font=FONT_V_SUBTITLE)

    cards = [
        ("OFFICIAL WEB PLATFORM", "vermilionroutes.com", "Bespoke Journeys & Live Catalog", [
            "• Interactive multi-day expedition catalog",
            "• TripAdvisor 5.0 traveler testimonials"
        ]),
        ("B2B ADVISOR DESK", "info@vermilionroutes.com", "Dedicated Operations & Support", [
            "• WhatsApp VIP: (+593) 96 003 9156",
            "• Guaranteed 2-hour response for custom RFPs"
        ]),
        ("INSTANT ONBOARDING", "vermilionroutes.com", "Fast Registration in 60 Seconds", [
            "• Instant access to net rate sheets & brochures",
            "• Unbranded high-resolution photo bank"
        ])
    ]

    by = 460
    ch = 300
    for tag_top, val_main, sub_title, bullets in cards:
        draw.rounded_rectangle([70, by, WIDTH - 70, by + ch], radius=22, fill=(18, 25, 28), outline=COLOR_GOLD, width=1)
        draw.rounded_rectangle([110, by + 22, 110 + 260, by + 56], radius=10, fill=(28, 20, 16), outline=COLOR_GOLD, width=1)
        draw.text((125, by + 30), tag_top, fill=COLOR_GOLD_LIGHT, font=FONT_MONO)

        draw.text((110, by + 75), val_main, fill=COLOR_WHITE, font=FONT_SERIF_H3)
        draw.text((110, by + 120), sub_title, fill=COLOR_GOLD_LIGHT, font=FONT_SANS_BOLD)
        draw.line([110, by + 160, WIDTH - 110, by + 160], fill=(212, 160, 86, 80), width=1)

        b_y = by + 180
        for b in bullets:
            draw.text((110, b_y), b, fill=COLOR_MUTED, font=FONT_SANS_REG)
            b_y += 45

        by += ch + 40

    draw.rounded_rectangle([80, 1540, WIDTH - 80, 1640], radius=18, fill=(18, 25, 28), outline=COLOR_GOLD, width=2)
    cta = "MINTUR REGISTERED DMC · LICENSE #1793215264001"
    bbox_cta = draw.textbbox((0, 0), cta, font=FONT_SANS_BOLD)
    draw.text((WIDTH//2 - (bbox_cta[2]-bbox_cta[0])//2, 1576), cta, fill=COLOR_WHITE, font=FONT_SANS_BOLD)

    ft = "© 2026 Vermilion Routes LLC / Cía. Ltda. · Quito · Galapagos"
    bbox_ft = draw.textbbox((0, 0), ft, font=FONT_SANS_SMALL)
    draw.text((WIDTH//2 - (bbox_ft[2]-bbox_ft[0])//2, 1780), ft, fill=COLOR_MUTED, font=FONT_SANS_SMALL)

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
    print(f"Rendering 9:16 Vermilion Video: {TOTAL_FRAMES} frames ({WIDTH}x{HEIGHT} @ {FPS}fps)...")
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
            print(f"Render progress 9:16: {i}/{TOTAL_FRAMES} frames ({int(i/TOTAL_FRAMES*100)}%)...")

    proc.stdin.close()
    proc.wait()
    print(f"9:16 Presentation Video rendered successfully to: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
