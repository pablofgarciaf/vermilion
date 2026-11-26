import asyncio
from playwright.async_api import async_playwright
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/UI_Recordings"

async def record_full_mobile():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Exact 1080x1920 viewport so it fills 100% of the canvas
        context = await browser.new_context(
            viewport={'width': 1080, 'height': 1920},
            device_scale_factor=1,
            record_video_dir=OUT_DIR,
            record_video_size={'width': 1080, 'height': 1920}
        )
        
        # Inject exact consent key so the banner never renders
        await context.add_init_script("""
            try {
                localStorage.setItem('vr_privacy_consent_v1', 'accepted');
            } catch (e) {}
        """)
        
        page = await context.new_page()
        
        # Scene 1: Homepage (10 seconds)
        print("1/3 Loading Vermilion Mobile Homepage...")
        await page.goto("https://vermilionroutes.com/en", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(1000)
        # Smooth scroll
        for y in range(0, 1800, 15):
            await page.evaluate(f"window.scrollTo(0, {y})")
            await page.wait_for_timeout(25)
        await page.wait_for_timeout(1000)
        
        # Scene 2: Tours (10 seconds)
        print("2/3 Loading Vermilion Mobile Tours Catalog...")
        await page.goto("https://vermilionroutes.com/en/tours", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(1000)
        for y in range(0, 2200, 15):
            await page.evaluate(f"window.scrollTo(0, {y})")
            await page.wait_for_timeout(25)
        await page.wait_for_timeout(1000)
        
        # Scene 3: Affiliates / Partners (10 seconds)
        print("3/3 Loading Vermilion Mobile Affiliates Portal...")
        await page.goto("https://vermilionroutes.com/en/affiliates", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(1000)
        for y in range(0, 1600, 15):
            await page.evaluate(f"window.scrollTo(0, {y})")
            await page.wait_for_timeout(25)
        await page.wait_for_timeout(1500)
        
        video_path = await page.video.path()
        await context.close()
        await browser.close()
        
        # Rename to mobile_full_clean.mp4
        target_path = os.path.join(OUT_DIR, "mobile_full_clean.mp4")
        if os.path.exists(target_path):
            os.remove(target_path)
        os.rename(video_path, target_path)
        print("Recorded 100% Full Canvas 9:16 Mobile UI at:", target_path)

if __name__ == "__main__":
    asyncio.run(record_full_mobile())
