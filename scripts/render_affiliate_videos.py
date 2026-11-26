import subprocess
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/Afiliados"
ORIG_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Originales"
BRAND_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Branding y Logos"

def run_cmd(cmd):
    print("Executing:", cmd)
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print("ERROR:", res.stderr)
    else:
        print("SUCCESS")
    return res.returncode

def build_video_1():
    print("--- BUILDING VIDEO 1: QUIÉNES SOMOS ---")
    # Voiceover duration: 37.75s
    # Scenes (9:16 vertical 1080x1920):
    # Clip 1: TikTok Andes / Cotopaxi (0 to 10s)
    # Clip 2: Experiencia baile / cultura (10 to 20s)
    # Clip 3: Galapagos lobo / fauna (20 to 30s)
    # Clip 4: Galapagos paisaje / carretera (30 to 38s)
    
    # We create a 38s video with ffmpeg using concat filter + drawtext / overlays + voiceover
    audio = f"{OUT_DIR}/01_quienes_somos_locucion.mp3"
    out = f"{OUT_DIR}/01_quienes_somos_vermilion_afiliados.mp4"
    
    c1 = f"{ORIG_DIR}/TikTok/9-16_tiktok_cotopaxi_volcan_paramo_01.mp4"
    c2 = f"{ORIG_DIR}/Experiencia y Cultura/9-16_ecuador_turistas_salsa_dance.mp4"
    c3 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_lobo_marino_nadando_01.mp4"
    c4 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_carretera_rural_paisaje_01.mp4"
    
    # Filter complex to scale, pad to 1080x1920, trim, concat, overlay texts and mix audio
    filter_complex = (
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:10,setpts=PTS-STARTPTS[v0];"
        "[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:10,setpts=PTS-STARTPTS[v1];"
        "[2:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:10,setpts=PTS-STARTPTS[v2];"
        "[3:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:8,setpts=PTS-STARTPTS[v3];"
        "[v0][v1][v2][v3]concat=n=4:v=1:a=0[base];"
        "[base]drawtext=text='VERMILION ROUTES':fontcolor=white:fontsize=52:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,0,10)',"
        "drawtext=text='BOUTIQUE DMC EN ECUADOR & GALAPAGOS':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=260:enable='between(t,0,10)',"
        "drawtext=text='LICENCIA OFICIAL MINTUR #1793215456001':fontcolor=white:fontsize=36:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,0,10)',"
        "drawtext=text='EXPEDICIONES PRIVADAS A MEDIDA':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,10,20)',"
        "drawtext=text='NATURALISTAS CERTIFICADOS & CONCIERGE 24/7':fontcolor=0xE07A5F:fontsize=34:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=255:enable='between(t,10,20)',"
        "drawtext=text='5.0 ESTRELLAS TRIPADVISOR | CLIENTES PROTEGIDOS':fontcolor=white:fontsize=34:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,10,20)',"
        "drawtext=text='RED DE AFILIADOS Y ASESORES':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,20,38)',"
        "drawtext=text='HASTA 15% COMISION NETA GARANTIZADA':fontcolor=0xE07A5F:fontsize=38:box=1:boxcolor=black@0.6:boxborderw=18:x=(w-text_w)/2:y=255:enable='between(t,20,38)',"
        "drawtext=text='ITINERARIOS MARCA BLANCA & CONTRATO FIDUCIARIO':fontcolor=white:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,20,38)'[vout]"
    )
    
    cmd = (
        f'ffmpeg -y -i "{c1}" -i "{c2}" -i "{c3}" -i "{c4}" -i "{audio}" '
        f'-filter_complex "{filter_complex}" '
        f'-map "[vout]" -map 4:a -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "{out}"'
    )
    run_cmd(cmd)

def build_video_2():
    print("--- BUILDING VIDEO 2: SERVICIOS VERMILION ---")
    # Voiceover duration: 32.16s
    # Scenes (9:16 vertical 1080x1920):
    # Clip 1: Galapagos fauna / snorkel (0 to 8s)
    # Clip 2: Cotopaxi / Andes aventura (8 to 16s)
    # Clip 3: Baños cascadas / aventura (16 to 24s)
    # Clip 4: Papallacta / relajación termas (24 to 33s)
    
    audio = f"{OUT_DIR}/02_servicios_locucion.mp3"
    out = f"{OUT_DIR}/02_servicios_vermilion_afiliados.mp4"
    
    c1 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_some_animals.mp4"
    c2 = f"{ORIG_DIR}/TikTok/9-16_tiktok_cotopaxi_volcan_turismo_02.mp4"
    c3 = f"{ORIG_DIR}/TikTok/9-16_tiktok_banos_cascadas_aventura_01.mp4"
    c4 = f"{ORIG_DIR}/TikTok/9-16_tiktok_papallacta_termas_cascadas_01.mp4"
    
    filter_complex = (
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:8,setpts=PTS-STARTPTS[v0];"
        "[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:8,setpts=PTS-STARTPTS[v1];"
        "[2:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:8,setpts=PTS-STARTPTS[v2];"
        "[3:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:9,setpts=PTS-STARTPTS[v3];"
        "[v0][v1][v2][v3]concat=n=4:v=1:a=0[base];"
        "[base]drawtext=text='PORTAFOLIO DE EXPEDICIONES':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,0,8)',"
        "drawtext=text='4 MUNDOS EN UN SOLO DESTINO':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=255:enable='between(t,0,8)',"
        "drawtext=text='YATES PRIVADOS BOUTIQUE & HACIENDAS HISTORICAS':fontcolor=white:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,0,8)',"
        "drawtext=text='AVENIDA DE LOS VOLCANES Y ANDES':fontcolor=white:fontsize=44:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,8,16)',"
        "drawtext=text='COTOPAXI, QUILOTOA & CULTURA VIVA':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=250:enable='between(t,8,16)',"
        "drawtext=text='TRASLADOS VIP PRIVADOS CON CONDUCTOR EXPERTO':fontcolor=white:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,8,16)',"
        "drawtext=text='AMAZONIA & ECO-LODGES DE LUJO':fontcolor=white:fontsize=46:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,16,24)',"
        "drawtext=text='LOGISTICA DE GUANTE BLANCO 100%':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=255:enable='between(t,16,24)',"
        "drawtext=text='PERMISOS, VUELOS INTERNOS Y TASAS INCLUIDAS':fontcolor=white:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,16,24)',"
        "drawtext=text='TODO INCLUIDO SIN COSTES OCULTOS':fontcolor=white:fontsize=44:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,24,33)',"
        "drawtext=text='COTIZA Y COBRA COMISIONES DIRECTAS':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=250:enable='between(t,24,33)',"
        "drawtext=text='SOPORTE B2B DEDICADO PARA ASESORES':fontcolor=white:fontsize=34:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,24,33)'[vout]"
    )
    
    cmd = (
        f'ffmpeg -y -i "{c1}" -i "{c2}" -i "{c3}" -i "{c4}" -i "{audio}" '
        f'-filter_complex "{filter_complex}" '
        f'-map "[vout]" -map 4:a -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "{out}"'
    )
    run_cmd(cmd)

def build_video_3():
    print("--- BUILDING VIDEO 3: GALÁPAGOS EXPERIENCIA ---")
    # Voiceover duration: 35.40s
    # Scenes (9:16 vertical 1080x1920):
    # Clip 1: Galapagos lobo nadando (0 to 9s)
    # Clip 2: Galapagos fauna salvaje (9 to 18s)
    # Clip 3: Galapagos carretera y costa (18 to 27s)
    # Clip 4: Galapagos la loberia (27 to 36s)
    
    audio = f"{OUT_DIR}/03_galapagos_locucion.mp3"
    out = f"{OUT_DIR}/03_galapagos_experiencia_afiliados.mp4"
    
    c1 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_lobo_marino_nadando_01.mp4"
    c2 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_some_animals.mp4"
    c3 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_way_la_loberia.mp4"
    c4 = f"{ORIG_DIR}/Galapagos/9-16_galapagos_la_loberia.mp4"
    
    filter_complex = (
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:9,setpts=PTS-STARTPTS[v0];"
        "[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:9,setpts=PTS-STARTPTS[v1];"
        "[2:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:9,setpts=PTS-STARTPTS[v2];"
        "[3:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,trim=0:9,setpts=PTS-STARTPTS[v3];"
        "[v0][v1][v2][v3]concat=n=4:v=1:a=0[base];"
        "[base]drawtext=text='GALAPAGOS PRIVADO & EXCLUSIVO':fontcolor=white:fontsize=46:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,0,9)',"
        "drawtext=text='EXPERIENCIA BOUTIQUE SIN MULTITUDES':fontcolor=0xE07A5F:fontsize=34:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=255:enable='between(t,0,9)',"
        "drawtext=text='FONDEADERO EXCLUSIVO Y SNORKEL CON FAUNA SALVAJE':fontcolor=white:fontsize=30:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,0,9)',"
        "drawtext=text='ENCUENTROS INTIMOS CON LA FAUNA':fontcolor=white:fontsize=44:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,9,18)',"
        "drawtext=text='TORTUGAS GIGANTES & PIQUEROS PATAS AZULES':fontcolor=0xE07A5F:fontsize=32:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=250:enable='between(t,9,18)',"
        "drawtext=text='GUIAS NATURALISTAS BILINGUES NIVEL III':fontcolor=white:fontsize=34:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,9,18)',"
        "drawtext=text='TARIFAS TRANSPARENTES DESDE $1,050':fontcolor=white:fontsize=42:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,18,27)',"
        "drawtext=text='VUELOS A BALTRA & TASAS INCLUIDAS':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=250:enable='between(t,18,27)',"
        "drawtext=text='PAGO SEGURO CON PROTECCION CONTRA FRAUDE':fontcolor=white:fontsize=32:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,18,27)',"
        "drawtext=text='CONVIERTETE EN ASESOR VERMILION':fontcolor=white:fontsize=44:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=180:enable='between(t,27,36)',"
        "drawtext=text='10% A 15% COMISION POR CADA RESERVA':fontcolor=0xE07A5F:fontsize=36:box=1:boxcolor=black@0.6:boxborderw=15:x=(w-text_w)/2:y=250:enable='between(t,27,36)',"
        "drawtext=text='LINEA DIRECTA ASESORES - +1 (302) 204-1881':fontcolor=white:fontsize=34:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=1550:enable='between(t,27,36)'[vout]"
    )
    
    cmd = (
        f'ffmpeg -y -i "{c1}" -i "{c2}" -i "{c3}" -i "{c4}" -i "{audio}" '
        f'-filter_complex "{filter_complex}" '
        f'-map "[vout]" -map 4:a -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest "{out}"'
    )
    run_cmd(cmd)

if __name__ == "__main__":
    build_video_1()


