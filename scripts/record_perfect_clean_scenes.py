import asyncio
from playwright.async_api import async_playwright
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/UI_Recordings"
os.makedirs(OUT_DIR, exist_ok=True)

async def record_perfect_scenes():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # -------------------------------------------------------------
        # 1. DESKTOP 16:9 RECORDING (1920x1080)
        # -------------------------------------------------------------
        print("\n--- RECORDING DESKTOP 16:9 WALKTHROUGH ---")
        ctx_desktop = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            record_video_dir=OUT_DIR,
            record_video_size={'width': 1920, 'height': 1080}
        )
        page_d = await ctx_desktop.new_page()
        
        # Page 1: Homepage Hero
        print("Navigating to Homepage Hero...")
        await page_d.goto("https://vermilionroutes.com/en", wait_until="networkidle", timeout=60000)
        await page_d.wait_for_timeout(2000)
        try:
            btn = page_d.locator('button:has-text("Accept cookies")').first
            if await btn.is_visible():
                await btn.click()
                await page_d.wait_for_timeout(1000)
        except Exception:
            pass
            
        # Smooth scroll hero down
        for y in range(0, 800, 15):
            await page_d.evaluate(f"window.scrollTo(0, {y})")
            await page_d.wait_for_timeout(30)
        await page_d.wait_for_timeout(1500)
        
        # Page 2: Tours Catalog
        print("Navigating to Tours Catalog...")
        await page_d.goto("https://vermilionroutes.com/en/tours", wait_until="networkidle", timeout=60000)
        await page_d.wait_for_timeout(2000)
        for y in range(0, 1100, 20):
            await page_d.evaluate(f"window.scrollTo(0, {y})")
            await page_d.wait_for_timeout(30)
        await page_d.wait_for_timeout(1500)
        
        # Page 3: B2B Affiliates Portal
        print("Navigating to Affiliates Portal...")
        await page_d.goto("https://vermilionroutes.com/en/affiliates", wait_until="networkidle", timeout=60000)
        await page_d.wait_for_timeout(2000)
        for y in range(0, 900, 20):
            await page_d.evaluate(f"window.scrollTo(0, {y})")
            await page_d.wait_for_timeout(30)
        await page_d.wait_for_timeout(1500)
        
        await ctx_desktop.close()
        print("Desktop 16:9 walkthrough completed!")
        
        # -------------------------------------------------------------
        # 2. MOBILE 9:16 RECORDING (1080x1920)
        # -------------------------------------------------------------
        print("\n--- RECORDING MOBILE 9:16 WALKTHROUGH ---")
        ctx_mobile = await browser.new_context(
            viewport={'width': 540, 'height': 960}, # 9:16 exact aspect ratio
            device_scale_factor=2, # Exactly 1080x1920 render
            is_mobile=True,
            has_touch=True,
            record_video_dir=OUT_DIR,
            record_video_size={'width': 1080, 'height': 1920}
        )
        page_m = await ctx_mobile.new_page()
        
        # Mobile Page 1: Homepage
        print("Navigating to Mobile Homepage...")
        await page_m.goto("https://vermilionroutes.com/en", wait_until="networkidle", timeout=60000)
        await page_m.wait_for_timeout(2000)
        try:
            btn = page_m.locator('button:has-text("Accept cookies")').first
            if await btn.is_visible():
                await btn.click()
                await page_m.wait_for_timeout(1000)
        except Exception:
            pass
            
        for y in range(0, 1200, 15):
            await page_m.evaluate(f"window.scrollTo(0, {y})")
            await page_m.wait_for_timeout(30)
        await page_m.wait_for_timeout(1500)
        
        # Mobile Page 2: Tours
        print("Navigating to Mobile Tours...")
        await page_m.goto("https://vermilionroutes.com/en/tours", wait_until="networkidle", timeout=60000)
        await page_m.wait_for_timeout(2000)
        for y in range(0, 1300, 18):
            await page_m.evaluate(f"window.scrollTo(0, {y})")
            await page_m.wait_for_timeout(30)
        await page_m.wait_for_timeout(1500)
        
        # Mobile Page 3: Affiliates
        print("Navigating to Mobile Affiliates...")
        await page_m.goto("https://vermilionroutes.com/en/affiliates", wait_until="networkidle", timeout=60000)
        await page_m.wait_for_timeout(2000)
        for y in range(0, 1000, 18):
            await page_m.evaluate(f"window.scrollTo(0, {y})")
            await page_m.wait_for_timeout(30)
        await page_m.wait_for_timeout(1500)
        
        await ctx_mobile.close()
        print("Mobile 9:16 walkthrough completed!")
        
        await browser.close()
        print("\nALL CLEAN RECORDINGS COMPLETED!")

if __name__ == "__main__":
    asyncio.run(record_perfect_scenes())
