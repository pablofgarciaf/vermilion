import subprocess
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/English_B2B_Partners"
UI_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/UI_Recordings"
ORIG_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Originales"
OVERLAY_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Overlays"
AUDIO_MIXED = f"{OUT_DIR}/vermilion_b2b_luxury_audio_mixed.mp3"

def render_9x16():
    out_file = f"{OUT_DIR}/vermilion_b2b_english_master_9x16.mp4"
    
    s1_clip = f"{UI_DIR}/mobile_s1_home.mp4"
    s2_clip = f"{UI_DIR}/mobile_s2_tours.mp4"
    s3_clip = f"{UI_DIR}/mobile_s3_affiliates.mp4"
    scenery_clip = f"{ORIG_DIR}/YouTube/16-9_youtube_ecuador_maravilloso_paisajes_01.mp4"
    
    ov1 = f"{OVERLAY_DIR}/overlay_9x16_scene_1.png"
    ov2 = f"{OVERLAY_DIR}/overlay_9x16_scene_2.png"
    ov3 = f"{OVERLAY_DIR}/overlay_9x16_scene_3.png"
    ov4 = f"{OVERLAY_DIR}/overlay_9x16_scene_4.png"
    
    filter_complex = (
        # Scene 1: Homepage Mobile Hero & 4 Worlds (2s to 12s)
        "[0:v]trim=2:12,setpts=PTS-STARTPTS,scale=1080:1920,setsar=1,fps=30[s1_base];"
        "[s1_base][4:v]overlay=0:0[s1];"
        
        # Scene 2: Tours Catalog Mobile View (2s to 12s)
        "[1:v]trim=2:12,setpts=PTS-STARTPTS,scale=1080:1920,setsar=1,fps=30[s2_base];"
        "[s2_base][5:v]overlay=0:0[s2];"
        
        # Scene 3: B2B Affiliates Portal Mobile (2s to 12s)
        "[2:v]trim=2:12,setpts=PTS-STARTPTS,scale=1080:1920,setsar=1,fps=30[s3_base];"
        "[s3_base][6:v]overlay=0:0[s3];"
        
        # Scene 4: Cinematic Scenic Drone Sunset Finale (0s to 10s)
        "[3:v]trim=0:10,setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30[s4_base];"
        "[s4_base][7:v]overlay=0:0[s4];"
        
        # Concatenate 4 scenes (total 40s)
        "[s1][s2][s3][s4]concat=n=4:v=1:a=0[vout]"
    )
    
    cmd = [
        'ffmpeg', '-y',
        '-i', s1_clip,
        '-i', s2_clip,
        '-i', s3_clip,
        '-i', scenery_clip,
        '-i', ov1,
        '-i', ov2,
        '-i', ov3,
        '-i', ov4,
        '-i', AUDIO_MIXED,
        '-filter_complex', filter_complex,
        '-map', '[vout]',
        '-map', '8:a',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '17',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        out_file
    ]
    print("Rendering 9:16 Vertical Master Video from isolated clean scenes...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("ERROR 9:16:", res.stderr[-1000:])
    else:
        print("SUCCESS: 9:16 Master Video Rendered at:", out_file)

if __name__ == "__main__":
    render_9x16()
