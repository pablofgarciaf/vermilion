import asyncio
import edge_tts
import os
import subprocess

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/Presentacion_Espanol"
GAL_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/Galapagos_Exclusivo"
MUSIC_BG = "C:/Users/pablo/hermes/repos/_sin-git/finix-academy-brag/video-15s/composition/assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3"
FFMPEG = r"C:\Users\pablo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
FFPROBE = r"C:\Users\pablo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffprobe.exe"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(GAL_DIR, exist_ok=True)

scripts = {
    "vermilion_web_espanol": {
        "text": (
            "Vermilion Routes: Operador Boutique DMC líder en Ecuador y Galápagos. "
            "Diseñamos expediciones privadas de lujo con licencia MINTUR y calificación cinco estrellas en TripAdvisor. "
            "Descubre cuatro mundos incomparables: cruceros exclusivos en Galápagos, haciendas en los Andes, "
            "lodges en la Amazonía profunda y patrimonio en Quito y Cuenca. "
            "Nuestra plataforma oficial te permite cotizar al instante itinerarios a medida, "
            "con tarifas netas fiduciarias y comisiones protegidas para asesores de viajes. "
            "Visita vermilionroutes.com. Comparte el catálogo en tus redes y comienza a vender lo extraordinario hoy mismo."
        ),
        "voice_out": f"{OUT_DIR}/voice_presentation_es.mp3",
        "mixed_out": f"{OUT_DIR}/audio_presentation_es_mixed.mp3"
    },
    "galapagos_exclusivo": {
        "text": (
            "Bienvenido a las Islas Galápagos con Vermilion Routes: "
            "la experiencia definitiva en el santuario natural más extraordinario del mundo. "
            "Encuentros íntimos con tortugas gigantes centenarias, colonias de lobos marinos, "
            "piqueros de patas azules e iguanas marinas en paisajes volcánicos únicos. "
            "Navega en yates y catamaranes boutique de primera clase, con snorkel en aguas cristalinas "
            "y la guía de naturalistas bilingües certificados de élite. "
            "Expediciones a medida desde mil setecientos noventa dólares, con depósito fiduciario protegido "
            "y conserjería veinticuatro siete. Reserva en vermilionroutes.com barra galápagos."
        ),
        "voice_out": f"{GAL_DIR}/voice_galapagos_es.mp3",
        "mixed_out": f"{GAL_DIR}/audio_galapagos_es_mixed.mp3"
    }
}

async def generate():
    voice = "es-MX-JorgeNeural"
    for name, item in scripts.items():
        print(f"Generating voiceover for {name} with {voice}...")
        comm = edge_tts.Communicate(item["text"], voice=voice)
        await comm.save(item["voice_out"])
        
        # Check duration
        res = subprocess.run([FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", item["voice_out"]], capture_output=True, text=True)
        dur = float(res.stdout.strip())
        print(f"Voice duration for {name}: {dur:.2f}s")
        
        # Mix with background music (fadeout ending at 40s)
        cmd = [
            FFMPEG, "-y",
            "-i", item["voice_out"],
            "-stream_loop", "-1", "-i", MUSIC_BG,
            "-filter_complex",
            "[0:a]volume=1.0[a0];[1:a]volume=0.12,afade=t=out:st=38:d=2.0[a1];[a0][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]",
            "-map", "[aout]",
            "-b:a", "192k",
            "-t", "40",
            item["mixed_out"]
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            print(f"Mixed audio generated successfully: {item['mixed_out']}")
        else:
            print(f"FFmpeg audio mix error for {name}: {res.stderr}")

if __name__ == "__main__":
    asyncio.run(generate())
