import os
import shutil
import subprocess

MUSIC_BG = "C:/Users/pablo/hermes/repos/_sin-git/finix-academy-brag/video-15s/composition/assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3"
FFMPEG = r"C:\Users\pablo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"

DIR_ES = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/Presentacion_Espanol"
DIR_GAL = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/Galapagos_Exclusivo"

os.makedirs(DIR_ES, exist_ok=True)
os.makedirs(DIR_GAL, exist_ok=True)

# 1. Mix Presentation Spanish
shutil.copyfile("test_full.mp3", os.path.join(DIR_ES, "voice_presentation_es.mp3"))
mixed_es = os.path.join(DIR_ES, "audio_presentation_es_mixed.mp3")

cmd_es = [
    FFMPEG, "-y",
    "-i", "test_full.mp3",
    "-stream_loop", "-1", "-i", MUSIC_BG,
    "-filter_complex",
    "[0:a]volume=1.0[a0];[1:a]volume=0.12,afade=t=out:st=38.5:d=1.5[a1];[a0][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "[aout]",
    "-b:a", "192k",
    "-t", "40",
    mixed_es
]
res1 = subprocess.run(cmd_es, capture_output=True, text=True)
print("Mixed ES returncode:", res1.returncode)

# 2. Mix Galapagos Exclusive
shutil.copyfile("test_galapagos.mp3", os.path.join(DIR_GAL, "voice_galapagos_es.mp3"))
mixed_gal = os.path.join(DIR_GAL, "audio_galapagos_es_mixed.mp3")

cmd_gal = [
    FFMPEG, "-y",
    "-i", "test_galapagos.mp3",
    "-stream_loop", "-1", "-i", MUSIC_BG,
    "-filter_complex",
    "[0:a]volume=1.0[a0];[1:a]volume=0.12,afade=t=out:st=38.5:d=1.5[a1];[a0][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "[aout]",
    "-b:a", "192k",
    "-t", "40",
    mixed_gal
]
res2 = subprocess.run(cmd_gal, capture_output=True, text=True)
print("Mixed GAL returncode:", res2.returncode)

if res1.returncode == 0 and res2.returncode == 0:
    print("Both audio tracks mixed and saved successfully!")
