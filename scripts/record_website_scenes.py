import asyncio
from playwright.async_api import async_playwright
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/UI_Recordings"
os.makedirs(OUT_DIR, exist_ok=True)

async def record_scenes():
    async with async_playwright() as p:
        # Launch Chromium
        browser = await p.chromium.launch(headless=True)
        
        # 1. Desktop 16:9 Context (1920x1080)
        context_desktop = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            device_scale_factor=1,
            record_video_dir=OUT_DIR,
            record_video_size={'width': 1920, 'height': 1080}
        )
        
        page = await context_desktop.new_page()
        
        # Scene A: Homepage Hero & 4 Worlds
        print("Recording Desktop Scene 1: Homepage Hero...")
        await page.goto("https://vermilionroutes.com/en", wait_until="networkidle", timeout=45000)
        await page.wait_for_timeout(2500)
        # Scroll gently down
        for y in range(0, 1600, 20):
            await page.evaluate(f"window.scrollTo(0, {y})")
            await page.wait_for_timeout(35)
        await page.wait_for_timeout(1500)
        
        # Scene B: Tours catalog
        print("Recording Desktop Scene 2: Tours Catalog...")
        await page.goto("https://vermilionroutes.com/en/tours", wait_until="networkidle", timeout=45000)
        await page.wait_for_timeout(2000)
        for y in range(0, 1400, 25):
            await page.evaluate(f"window.scrollTo(0, {y})")
            await page.wait_for_timeout(35)
        await page.wait_for_timeout(1500)
        
        # Scene C: B2B Affiliates Portal
        print("Recording Desktop Scene 3: B2B Affiliates...")
        await page.goto("https://vermilionroutes.com/en/affiliates", wait_until="networkidle", timeout=45000)
        await page.wait_for_timeout(2000)
        for y in range(0, 1200, 25):
            await page.evaluate(f"window.scrollTo(0, {y})")
            await page.wait_for_timeout(35)
        await page.wait_for_timeout(1500)
        
        await context_desktop.close()
        print("Desktop recording closed.")
        
        # 2. Mobile 9:16 Context (1080x1920 with high-res mobile viewport)
        context_mobile = await browser.new_context(
            viewport={'width': 430, 'height': 932}, # iPhone 15 Pro Max
            device_scale_factor=2.5,
            is_mobile=True,
            has_touch=True,
            record_video_dir=OUT_DIR,
            record_video_size={'width': 1080, 'height': 1920}
        )
        page_m = await context_mobile.new_page()
        
        print("Recording Mobile Scene 1: Homepage...")
        await page_m.goto("https://vermilionroutes.com/en", wait_until="networkidle", timeout=45000)
        await page_m.wait_for_timeout(2500)
        for y in range(0, 1800, 20):
            await page_m.evaluate(f"window.scrollTo(0, {y})")
            await page_m.wait_for_timeout(35)
        await page_m.wait_for_timeout(1500)
        
        print("Recording Mobile Scene 2: Tours...")
        await page_m.goto("https://vermilionroutes.com/en/tours", wait_until="networkidle", timeout=45000)
        await page_m.wait_for_timeout(2000)
        for y in range(0, 1600, 25):
            await page_m.evaluate(f"window.scrollTo(0, {y})")
            await page_m.wait_for_timeout(35)
        await page_m.wait_for_timeout(1500)
        
        print("Recording Mobile Scene 3: Affiliates...")
        await page_m.goto("https://vermilionroutes.com/en/affiliates", wait_until="networkidle", timeout=45000)
        await page_m.wait_for_timeout(2000)
        for y in range(0, 1400, 25):
            await page_m.evaluate(f"window.scrollTo(0, {y})")
            await page_m.wait_for_timeout(35)
        await page_m.wait_for_timeout(1500)
        
        await context_mobile.close()
        print("Mobile recording closed.")
        
        await browser.close()
        print("ALL RECORDINGS COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(record_scenes())
