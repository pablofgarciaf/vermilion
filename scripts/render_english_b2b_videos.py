import subprocess
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/English_B2B_Partners"
ORIG_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Originales"
AUDIO_MIXED = f"{OUT_DIR}/vermilion_b2b_english_audio_mixed.mp3"

def run_cmd(cmd):
    print("Executing FFmpeg...")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print("ERROR:")
        print(res.stderr[-1500:])
    else:
        print("SUCCESS! Output generated.")
    return res.returncode

def render_horizontal_16x9():
    print("\n=======================================================")
    print(" RENDERING 16:9 HORIZONTAL (1920x1080) B2B PRESENTATION ")
    print("=======================================================\n")
    
    out_file = f"{OUT_DIR}/vermilion_b2b_english_presentation_16x9.mp4"
    
    c1 = f"{ORIG_DIR}/Galapagos/16-9_galapagos_tortuga_gigante_comiendo_01.mp4"
    c2 = f"{ORIG_DIR}/YouTube/16-9_youtube_quilotoa_laguna_crater_esmeralda_01.mp4"
    c3 = f"{ORIG_DIR}/YouTube/16-9_youtube_amazonia_oriente_selva_expedicion_01.mp4"
    c4 = f"{ORIG_DIR}/YouTube/16-9_youtube_galapagos_aves_piqueros_albatros_01.mp4"
    c5 = f"{ORIG_DIR}/YouTube/16-9_youtube_ecuador_maravilloso_paisajes_01.mp4"
    
    # 5 scenes, total duration ~49.4s:
    filter_complex = (
        "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,trim=0:10,setpts=PTS-STARTPTS[v0];"
        "[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,trim=0:10,setpts=PTS-STARTPTS[v1];"
        "[2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,trim=0:10,setpts=PTS-STARTPTS[v2];"
        "[3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,trim=0:10,setpts=PTS-STARTPTS[v3];"
        "[4:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,trim=0:9.4,setpts=PTS-STARTPTS[v4];"
        "[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[base];"
        
        # Scene 1 Overlays (0-10s)
        "[base]drawtext=text='VERMILION ROUTES  --  BOUTIQUE DMC':fontcolor=0xE07A5F:fontsize=28:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=70:enable='between(t,0,10)',"
        "drawtext=text='HANDCRAFTED LUXURY EXPEDITIONS':fontcolor=white:fontsize=52:box=1:boxcolor=black@0.7:boxborderw=18:x=(w-text_w)/2:y=135:enable='between(t,0,10)',"
        "drawtext=text='ECUADOR AND THE GALAPAGOS ISLANDS':fontcolor=0xF7EDE2:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=215:enable='between(t,0,10)',"
        "drawtext=text='OFFICIAL MINTUR LICENSE 1793215456001  --  5.0 TRIPADVISOR RATING':fontcolor=white:fontsize=26:box=1:boxcolor=black@0.8:boxborderw=14:x=(w-text_w)/2:y=960:enable='between(t,0,10)',"
        
        # Scene 2 Overlays (10-20s)
        "drawtext=text='AVENUE OF THE VOLCANOES  --  ANDES':fontcolor=0xE07A5F:fontsize=28:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=70:enable='between(t,10,20)',"
        "drawtext=text='HISTORIC HACIENDAS AND PRIVATE RETREATS':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.7:boxborderw=18:x=(w-text_w)/2:y=135:enable='between(t,10,20)',"
        "drawtext=text='CERTIFIED BILINGUAL NATURALISTS  --  24-7 WHITE-GLOVE CONCIERGE':fontcolor=0xF7EDE2:fontsize=30:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=215:enable='between(t,10,20)',"
        "drawtext=text='SEAMLESS VIP PRIVATE TRANSFERS  --  ZERO THIRD-PARTY INTERMEDIARIES':fontcolor=white:fontsize=26:box=1:boxcolor=black@0.8:boxborderw=14:x=(w-text_w)/2:y=960:enable='between(t,10,20)',"
        
        # Scene 3 Overlays (20-30s)
        "drawtext=text='PRISTINE AMAZON BASIN  --  BIODIVERSITY':fontcolor=0xE07A5F:fontsize=28:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=70:enable='between(t,20,30)',"
        "drawtext=text='LUXURY CANOPY LODGES AND RIVER CHARTERS':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.7:boxborderw=18:x=(w-text_w)/2:y=135:enable='between(t,20,30)',"
        "drawtext=text='100% BESPOKE ITINERARIES  --  FLAWLESS GUEST REVIEWS':fontcolor=0xF7EDE2:fontsize=30:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=215:enable='between(t,20,30)',"
        "drawtext=text='GUARANTEED PARK PERMITS  --  FULL ESCROW FIDUCIARY BUYER PROTECTION':fontcolor=white:fontsize=26:box=1:boxcolor=black@0.8:boxborderw=14:x=(w-text_w)/2:y=960:enable='between(t,20,30)',"
        
        # Scene 4 Overlays (30-40s)
        "drawtext=text='GLOBAL TRAVEL ADVISORS AND CORPORATE PARTNERS':fontcolor=0xE07A5F:fontsize=28:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=70:enable='between(t,30,40)',"
        "drawtext=text='WHITE-LABEL ITINERARIES AND FIDUCIARY PEACE':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.7:boxborderw=18:x=(w-text_w)/2:y=135:enable='between(t,30,40)',"
        "drawtext=text='UP TO 15% GUARANTEED NET COMMISSION  --  INSTANT B2B QUOTES':fontcolor=0xF7EDE2:fontsize=30:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=215:enable='between(t,30,40)',"
        "drawtext=text='US TOLL-FREE AND DIRECT LINE +1 302 204 1881':fontcolor=white:fontsize=26:box=1:boxcolor=black@0.8:boxborderw=14:x=(w-text_w)/2:y=960:enable='between(t,30,40)',"
        
        # Scene 5 Overlays (40-49.4s)
        "drawtext=text='PARTNER WITH VERMILION ROUTES':fontcolor=0xE07A5F:fontsize=30:box=1:boxcolor=black@0.7:boxborderw=14:x=(w-text_w)/2:y=70:enable='between(t,40,50)',"
        "drawtext=text='ELEVATE YOUR CLIENTS EXPERIENCE':fontcolor=white:fontsize=52:box=1:boxcolor=black@0.7:boxborderw=18:x=(w-text_w)/2:y=135:enable='between(t,40,50)',"
        "drawtext=text='VERMILIONROUTES.COM/TRAVEL-ADVISORS':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.8:boxborderw=16:x=(w-text_w)/2:y=220:enable='between(t,40,50)',"
        "drawtext=text='BOUTIQUE DMC  --  ECUADOR AND GALAPAGOS  --  B2B ADVISOR NETWORK':fontcolor=white:fontsize=26:box=1:boxcolor=black@0.8:boxborderw=14:x=(w-text_w)/2:y=960:enable='between(t,40,50)'[vout]"
    )
    
    cmd = [
        'ffmpeg', '-y',
        '-i', c1,
        '-i', c2,
        '-i', c3,
        '-i', c4,
        '-i', c5,
        '-i', AUDIO_MIXED,
        '-filter_complex', filter_complex,
        '-map', '[vout]',
        '-map', '5:a',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '19',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        out_file
    ]
    print("Launching FFmpeg for 16:9...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("ERROR 16:9:")
        print(res.stderr[-1200:])
    else:
        print("SUCCESS 16:9:", out_file)

def render_vertical_9x16():
    print("\n=======================================================")
    print(" RENDERING 9:16 VERTICAL (1080x1920) MOBILE/REELS VIDEO ")
    print("=======================================================\n")
    
    out_file = f"{OUT_DIR}/vermilion_b2b_english_presentation_9x16.mp4"
    
    c1 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_lobo_marino_nadando_01.mp4"
    c2 = f"{ORIG_DIR}/TikTok/9-16_tiktok_galapagos_islas_fauna_01.mp4"
    c3 = f"{ORIG_DIR}/TikTok/9-16_tiktok_cotopaxi_volcan_paramo_01.mp4"
    c4 = f"{ORIG_DIR}/TikTok/9-16_tiktok_quilotoa_crater_laguna_01.mp4"
    c5 = f"{ORIG_DIR}/TikTok/9-16_tiktok_banos_cascadas_aventura_01.mp4"
    
    filter_complex = (
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:10,setpts=PTS-STARTPTS[v0];"
        "[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:10,setpts=PTS-STARTPTS[v1];"
        "[2:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:10,setpts=PTS-STARTPTS[v2];"
        "[3:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:10,setpts=PTS-STARTPTS[v3];"
        "[4:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:9.4,setpts=PTS-STARTPTS[v4];"
        "[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[base];"
        
        # Scene 1 Overlays (0-10s)
        "[base]drawtext=text='VERMILION ROUTES':fontcolor=white:fontsize=52:box=1:boxcolor=black@0.65:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,0,10)',"
        "drawtext=text='BOUTIQUE DMC  --  ECUADOR AND GALAPAGOS':fontcolor=0xE07A5F:fontsize=32:box=1:boxcolor=black@0.65:boxborderw=15:x=(w-text_w)/2:y=265:enable='between(t,0,10)',"
        "drawtext=text='HANDCRAFTED PRIVATE CHARTERS -- 5.0 TRIPADVISOR':fontcolor=white:fontsize=28:box=1:boxcolor=black@0.75:boxborderw=16:x=(w-text_w)/2:y=1600:enable='between(t,0,10)',"
        
        # Scene 2 Overlays (10-20s)
        "drawtext=text='UNTOUCHED WILDLIFE':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.65:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,10,20)',"
        "drawtext=text='CERTIFIED BILINGUAL NATURALISTS':fontcolor=0xE07A5F:fontsize=34:box=1:boxcolor=black@0.65:boxborderw=15:x=(w-text_w)/2:y=265:enable='between(t,10,20)',"
        "drawtext=text='24-7 WHITE-GLOVE VIP CONCIERGE':fontcolor=white:fontsize=32:box=1:boxcolor=black@0.75:boxborderw=16:x=(w-text_w)/2:y=1600:enable='between(t,10,20)',"
        
        # Scene 3 Overlays (20-30s)
        "drawtext=text='ANDES AND VOLCANOES':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.65:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,20,30)',"
        "drawtext=text='HISTORIC HACIENDAS AND ALPINE LODGES':fontcolor=0xE07A5F:fontsize=32:box=1:boxcolor=black@0.65:boxborderw=15:x=(w-text_w)/2:y=265:enable='between(t,20,30)',"
        "drawtext=text='OFFICIAL MINTUR LICENSE 1793215456001':fontcolor=white:fontsize=30:box=1:boxcolor=black@0.75:boxborderw=16:x=(w-text_w)/2:y=1600:enable='between(t,20,30)',"
        
        # Scene 4 Overlays (30-40s)
        "drawtext=text='GLOBAL B2B PARTNERS':fontcolor=white:fontsize=50:box=1:boxcolor=black@0.65:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,30,40)',"
        "drawtext=text='WHITE-LABEL ITINERARIES  --  15% COMMISSION':fontcolor=0xE07A5F:fontsize=32:box=1:boxcolor=black@0.65:boxborderw=15:x=(w-text_w)/2:y=265:enable='between(t,30,40)',"
        "drawtext=text='DIRECT US PHONE +1 302 204 1881':fontcolor=white:fontsize=32:box=1:boxcolor=black@0.75:boxborderw=16:x=(w-text_w)/2:y=1600:enable='between(t,30,40)',"
        
        # Scene 5 Overlays (40-49.4s)
        "drawtext=text='PARTNER WITH US':fontcolor=white:fontsize=54:box=1:boxcolor=black@0.65:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,40,50)',"
        "drawtext=text='VERMILIONROUTES.COM/TRAVEL-ADVISORS':fontcolor=0xE07A5F:fontsize=34:box=1:boxcolor=black@0.65:boxborderw=15:x=(w-text_w)/2:y=265:enable='between(t,40,50)',"
        "drawtext=text='DISCOVER ECUADOR AND THE GALAPAGOS':fontcolor=white:fontsize=30:box=1:boxcolor=black@0.75:boxborderw=16:x=(w-text_w)/2:y=1600:enable='between(t,40,50)'[vout]"
    )
    
    cmd = [
        'ffmpeg', '-y',
        '-i', c1,
        '-i', c2,
        '-i', c3,
        '-i', c4,
        '-i', c5,
        '-i', AUDIO_MIXED,
        '-filter_complex', filter_complex,
        '-map', '[vout]',
        '-map', '5:a',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '19',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        out_file
    ]
    print("Launching FFmpeg for 9:16...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("ERROR 9:16:")
        print(res.stderr[-1200:])
    else:
        print("SUCCESS 9:16:", out_file)

if __name__ == "__main__":
    render_horizontal_16x9()
    render_vertical_9x16()
