import asyncio
from playwright.async_api import async_playwright
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/UI_Recordings"

async def record_scenes():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # Helper to record a single clean scene
        async def record_single(url, out_name, scroll_max, wait_sel=None):
            ctx = await browser.new_context(
                viewport={'width': 1080, 'height': 1920},
                device_scale_factor=1,
                record_video_dir=OUT_DIR,
                record_video_size={'width': 1080, 'height': 1920}
            )
            await ctx.add_init_script("""
                try {
                    localStorage.setItem('vr_privacy_consent_v1', 'accepted');
                } catch(e) {}
            """)
            page = await ctx.new_page()
            print(f"Loading {url}...")
            await page.goto(url, wait_until="networkidle", timeout=60000)
            if wait_sel:
                await page.wait_for_selector(wait_sel, timeout=15000)
            await page.wait_for_timeout(1000)
            
            # Smooth scroll over 9 seconds
            steps = 300
            step_y = scroll_max / steps
            for i in range(steps):
                await page.evaluate(f"window.scrollTo(0, {int(i * step_y)})")
                await page.wait_for_timeout(30)
            await page.wait_for_timeout(500)
            
            video_path = await page.video.path()
            await ctx.close()
            
            target = os.path.join(OUT_DIR, out_name)
            if os.path.exists(target):
                os.remove(target)
            os.rename(video_path, target)
            print(f"Saved clean scene to: {target}")

        # Scene 1: Homepage (10s)
        await record_single("https://vermilionroutes.com/en", "mobile_s1_home.mp4", 1800)
        
        # Scene 2: Tours (10s)
        await record_single("https://vermilionroutes.com/en/tours", "mobile_s2_tours.mp4", 2200)
        
        # Scene 3: Affiliates (10s)
        await record_single("https://vermilionroutes.com/en/affiliates", "mobile_s3_affiliates.mp4", 800)
        
        await browser.close()
        print("ALL 3 MOBILE SCENES RECORDED PERFECTLY!")

if __name__ == "__main__":
    asyncio.run(record_scenes())
