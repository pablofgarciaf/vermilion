import subprocess
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Producidos/English_B2B_Partners"
UI_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/UI_Recordings"
ORIG_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Videos Originales"
OVERLAY_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Overlays"
AUDIO_MIXED = f"{OUT_DIR}/vermilion_b2b_luxury_audio_mixed.mp3"

def run_cmd(cmd, desc):
    print(f"\n>>> RUNNING: {desc}")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("ERROR:")
        print(res.stderr[-1500:])
    else:
        print(f"SUCCESS: {desc}")
    return res.returncode

def render_horizontal_16x9():
    out_file = f"{OUT_DIR}/vermilion_luxury_b2b_presentation_16x9.mp4"
    
    # Inputs:
    # 0: desktop_ui_walkthrough.mp4 (71s)
    # 1: 16-9_youtube_ecuador_maravilloso_paisajes_01.mp4 (scenery for finale)
    # 2: overlay_16x9_scene_1.png
    # 3: overlay_16x9_scene_2.png
    # 4: overlay_16x9_scene_3.png
    # 5: overlay_16x9_scene_4.png
    # 6: audio
    
    ui_walkthrough = f"{UI_DIR}/desktop_ui_walkthrough.mp4"
    scenery_clip = f"{ORIG_DIR}/YouTube/16-9_youtube_ecuador_maravilloso_paisajes_01.mp4"
    ov1 = f"{OVERLAY_DIR}/overlay_16x9_scene_1.png"
    ov2 = f"{OVERLAY_DIR}/overlay_16x9_scene_2.png"
    ov3 = f"{OVERLAY_DIR}/overlay_16x9_scene_3.png"
    ov4 = f"{OVERLAY_DIR}/overlay_16x9_scene_4.png"
    
    filter_complex = (
        # Scene 1: Homepage UI (0 to 10s) with overlay 1
        "[0:v]trim=0:10,setpts=PTS-STARTPTS,scale=1920:1080[s1_base];"
        "[s1_base][2:v]overlay=0:0[s1];"
        
        # Scene 2: Tours Catalog UI (24 to 34s) with overlay 2
        "[0:v]trim=24:34,setpts=PTS-STARTPTS,scale=1920:1080[s2_base];"
        "[s2_base][3:v]overlay=0:0[s2];"
        
        # Scene 3: B2B Affiliates UI (48 to 58s) with overlay 3
        "[0:v]trim=48:58,setpts=PTS-STARTPTS,scale=1920:1080[s3_base];"
        "[s3_base][4:v]overlay=0:0[s3];"
        
        # Scene 4: Cinematic Scenic Drone Finale (0 to 10s) with overlay 4
        "[1:v]trim=0:10,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080[s4_base];"
        "[s4_base][5:v]overlay=0:0[s4];"
        
        # Concatenate 4 scenes (total 40s)
        "[s1][s2][s3][s4]concat=n=4:v=1:a=0[vout]"
    )
    
    cmd = [
        'ffmpeg', '-y',
        '-i', ui_walkthrough,
        '-i', scenery_clip,
        '-i', ov1,
        '-i', ov2,
        '-i', ov3,
        '-i', ov4,
        '-i', AUDIO_MIXED,
        '-filter_complex', filter_complex,
        '-map', '[vout]',
        '-map', '6:a',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        out_file
    ]
    run_cmd(cmd, "16:9 Horizontal Master Video")

def render_vertical_9x16():
    out_file = f"{OUT_DIR}/vermilion_luxury_b2b_presentation_9x16.mp4"
    
    # Inputs:
    # 0: mobile_ui_walkthrough.mp4 (71s)
    # 1: 9-16_tiktok_galapagos_islas_fauna_01.mp4 (scenery for finale)
    # 2: overlay_9x16_scene_1.png
    # 3: overlay_9x16_scene_2.png
    # 4: overlay_9x16_scene_3.png
    # 5: overlay_9x16_scene_4.png
    # 6: audio
    
    mobile_walkthrough = f"{UI_DIR}/mobile_ui_walkthrough.mp4"
    nature_clip = f"{ORIG_DIR}/TikTok/9-16_tiktok_galapagos_islas_fauna_01.mp4"
    ov1 = f"{OVERLAY_DIR}/overlay_9x16_scene_1.png"
    ov2 = f"{OVERLAY_DIR}/overlay_9x16_scene_2.png"
    ov3 = f"{OVERLAY_DIR}/overlay_9x16_scene_3.png"
    ov4 = f"{OVERLAY_DIR}/overlay_9x16_scene_4.png"
    
    filter_complex = (
        # Scene 1: Homepage Mobile UI (0 to 10s) with overlay 1
        "[0:v]trim=0:10,setpts=PTS-STARTPTS,scale=1080:1920[s1_base];"
        "[s1_base][2:v]overlay=0:0[s1];"
        
        # Scene 2: Tours Catalog Mobile UI (24 to 34s) with overlay 2
        "[0:v]trim=24:34,setpts=PTS-STARTPTS,scale=1080:1920[s2_base];"
        "[s2_base][3:v]overlay=0:0[s2];"
        
        # Scene 3: B2B Affiliates Mobile UI (48 to 58s) with overlay 3
        "[0:v]trim=48:58,setpts=PTS-STARTPTS,scale=1080:1920[s3_base];"
        "[s3_base][4:v]overlay=0:0[s3];"
        
        # Scene 4: Cinematic Galapagos Wildlife Finale (0 to 10s) with overlay 4
        "[1:v]trim=0:10,setpts=PTS-STARTPTS,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[s4_base];"
        "[s4_base][5:v]overlay=0:0[s4];"
        
        # Concatenate 4 scenes (total 40s)
        "[s1][s2][s3][s4]concat=n=4:v=1:a=0[vout]"
    )
    
    cmd = [
        'ffmpeg', '-y',
        '-i', mobile_walkthrough,
        '-i', nature_clip,
        '-i', ov1,
        '-i', ov2,
        '-i', ov3,
        '-i', ov4,
        '-i', AUDIO_MIXED,
        '-filter_complex', filter_complex,
        '-map', '[vout]',
        '-map', '6:a',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        out_file
    ]
    run_cmd(cmd, "9:16 Vertical Master Video")

if __name__ == "__main__":
    render_horizontal_16x9()
    render_vertical_9x16()
