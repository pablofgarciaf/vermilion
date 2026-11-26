import asyncio
from playwright.async_api import async_playwright
import os

OUT_DIR = "C:/Users/pablo/OneDrive/Imágenes/Vermilion/Overlays"
os.makedirs(OUT_DIR, exist_ok=True)

# 16:9 Horizontal Overlays (1920x1080)
HTML_16x9_TEMPLATES = [
    # Scene 1: Welcome & Brand Platform
    """
    <div style="position: absolute; top: 60px; left: 80px; display: flex; flex-direction: column; gap: 14px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; background: rgba(224, 122, 95, 0.2); border: 1px solid rgba(224, 122, 95, 0.5); border-radius: 999px; backdrop-filter: blur(16px); width: fit-content;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #E07A5F; box-shadow: 0 0 12px #E07A5F;"></span>
            <span style="color: #F4A261; font-size: 14px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Vermilion Routes · Boutique DMC</span>
        </div>
        <div style="background: rgba(12, 28, 25, 0.85); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 24px 36px; box-shadow: 0 25px 60px rgba(0,0,0,0.6); max-width: 820px;">
            <h1 style="margin: 0; color: #FFFFFF; font-size: 44px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em;">
                Ecuador & Galapagos <span style="background: linear-gradient(135deg, #E07A5F, #F4A261); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Redefined</span>
            </h1>
            <p style="margin: 10px 0 0; color: #D1D5DB; font-size: 20px; font-weight: 500; line-height: 1.5;">
                Direct luxury booking platform · Handcrafted expeditions & private charters
            </p>
        </div>
    </div>
    <div style="position: absolute; bottom: 50px; left: 80px; display: flex; gap: 16px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: flex; align-items: center; gap: 10px; padding: 10px 22px; background: rgba(7, 25, 22, 0.9); border: 1px solid rgba(201, 154, 91, 0.4); border-radius: 999px; backdrop-filter: blur(20px); color: #FFFFFF; font-size: 15px; font-weight: 700;">
            <span style="color: #34D399;">★ 5.0</span>
            <span>TripAdvisor Certificate of Excellence</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; padding: 10px 22px; background: rgba(7, 25, 22, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 999px; backdrop-filter: blur(20px); color: #E5E7EB; font-size: 15px; font-weight: 600;">
            <span>Official MINTUR License #1793215456001</span>
        </div>
    </div>
    """,

    # Scene 2: Interactive Catalog & Tailor-Made Itineraries
    """
    <div style="position: absolute; top: 60px; right: 80px; display: flex; flex-direction: column; align-items: flex-end; gap: 14px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 999px; backdrop-filter: blur(16px); width: fit-content;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #34D399; box-shadow: 0 0 12px #34D399;"></span>
            <span style="color: #6EE7B7; font-size: 14px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Smart Digital Platform</span>
        </div>
        <div style="background: rgba(12, 28, 25, 0.88); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 24px 36px; box-shadow: 0 25px 60px rgba(0,0,0,0.6); max-width: 780px; text-align: right;">
            <h1 style="margin: 0; color: #FFFFFF; font-size: 42px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em;">
                Instant Quotes & <span style="color: #F4A261;">Bespoke Pricing</span>
            </h1>
            <p style="margin: 10px 0 0; color: #D1D5DB; font-size: 19px; font-weight: 500; line-height: 1.5;">
                Explore real-time itineraries, curated daily tours, and luxury yacht availability
            </p>
        </div>
    </div>
    <div style="position: absolute; bottom: 50px; right: 80px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 24px; background: rgba(7, 25, 22, 0.92); border: 1px solid rgba(224, 122, 95, 0.4); border-radius: 999px; backdrop-filter: blur(20px); color: #FFFFFF; font-size: 15px; font-weight: 700;">
            <span style="color: #F4A261;">⚡ Zero Third-Party Markups</span>
            <span style="color: rgba(255,255,255,0.3);">|</span>
            <span>Direct DMC Operator Access</span>
        </div>
    </div>
    """,

    # Scene 3: B2B Travel Advisor Network & Partner Benefits
    """
    <div style="position: absolute; top: 60px; left: 80px; display: flex; flex-direction: column; gap: 14px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; background: rgba(201, 154, 91, 0.2); border: 1px solid rgba(201, 154, 91, 0.5); border-radius: 999px; backdrop-filter: blur(16px); width: fit-content;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #E7C78D; box-shadow: 0 0 12px #E7C78D;"></span>
            <span style="color: #E7C78D; font-size: 14px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Global Advisor & Corporate Network</span>
        </div>
        <div style="background: rgba(12, 28, 25, 0.88); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 24px 36px; box-shadow: 0 25px 60px rgba(0,0,0,0.6); max-width: 820px;">
            <h1 style="margin: 0; color: #FFFFFF; font-size: 42px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em;">
                Up to <span style="color: #34D399;">15% Net Commission</span> & White-Label Trust
            </h1>
            <p style="margin: 10px 0 0; color: #D1D5DB; font-size: 19px; font-weight: 500; line-height: 1.5;">
                Client protection guarantees · FDIC-insured escrow · Instant wire/ACH payouts
            </p>
        </div>
    </div>
    <div style="position: absolute; bottom: 50px; left: 80px; display: flex; gap: 16px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: flex; align-items: center; gap: 10px; padding: 12px 26px; background: linear-gradient(135deg, rgba(224, 122, 95, 0.95), rgba(180, 83, 9, 0.9)); border-radius: 999px; box-shadow: 0 12px 30px rgba(224, 122, 95, 0.35); color: #FFFFFF; font-size: 16px; font-weight: 800;">
            <span>US Phone: +1 (302) 204-1881</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; padding: 12px 24px; background: rgba(7, 25, 22, 0.9); border: 1px solid rgba(255,255,255,0.25); border-radius: 999px; backdrop-filter: blur(20px); color: #F3F4F6; font-size: 16px; font-weight: 700;">
            <span>VermilionRoutes.com/affiliates</span>
        </div>
    </div>
    """,

    # Scene 4: Call to Action / Grand Finale
    """
    <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-align: center;">
        <div style="background: rgba(8, 24, 21, 0.92); backdrop-filter: blur(30px); border: 1.5px solid rgba(224, 122, 95, 0.45); border-radius: 32px; padding: 48px 64px; box-shadow: 0 30px 80px rgba(0,0,0,0.7); max-width: 900px; display: flex; flex-direction: column; align-items: center; gap: 18px;">
            <div style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 24px; background: rgba(224, 122, 95, 0.2); border: 1px solid rgba(224, 122, 95, 0.5); border-radius: 999px;">
                <span style="color: #F4A261; font-size: 14px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;">Partner With The Best</span>
            </div>
            <h1 style="margin: 0; color: #FFFFFF; font-size: 54px; font-weight: 900; line-height: 1.1; letter-spacing: -0.02em;">
                Elevate Your Luxury Travel Portfolio
            </h1>
            <p style="margin: 0; color: #D1D5DB; font-size: 22px; font-weight: 500; max-width: 720px; line-height: 1.5;">
                Bespoke Galapagos Charters · Andean Haciendas · Deep Amazon Lodges
            </p>
            <div style="margin-top: 10px; display: flex; align-items: center; gap: 20px;">
                <div style="padding: 16px 36px; background: linear-gradient(135deg, #E07A5F, #C85A3D); border-radius: 999px; color: #FFFFFF; font-size: 20px; font-weight: 800; box-shadow: 0 15px 40px rgba(224, 122, 95, 0.45);">
                    VermilionRoutes.com
                </div>
            </div>
        </div>
    </div>
    """
]

# 9:16 Vertical Overlays (1080x1920)
HTML_9x16_TEMPLATES = [
    # Mobile Scene 1:
    """
    <div style="position: absolute; top: 120px; left: 40px; right: 40px; display: flex; flex-direction: column; gap: 14px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; background: rgba(224, 122, 95, 0.25); border: 1px solid rgba(224, 122, 95, 0.5); border-radius: 999px; backdrop-filter: blur(16px); width: fit-content;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #E07A5F; box-shadow: 0 0 12px #E07A5F;"></span>
            <span style="color: #F4A261; font-size: 15px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Vermilion Routes DMC</span>
        </div>
        <div style="background: rgba(12, 28, 25, 0.88); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.18); border-radius: 28px; padding: 28px 32px; box-shadow: 0 25px 60px rgba(0,0,0,0.65);">
            <h1 style="margin: 0; color: #FFFFFF; font-size: 46px; font-weight: 900; line-height: 1.15; letter-spacing: -0.02em;">
                Ecuador & Galapagos <span style="color: #F4A261;">Redefined</span>
            </h1>
            <p style="margin: 12px 0 0; color: #D1D5DB; font-size: 20px; font-weight: 500; line-height: 1.45;">
                Handcrafted private expeditions & boutique yacht charters.
            </p>
        </div>
    </div>
    <div style="position: absolute; bottom: 120px; left: 40px; right: 40px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="background: rgba(7, 25, 22, 0.92); border: 1px solid rgba(201, 154, 91, 0.4); border-radius: 22px; padding: 18px 24px; backdrop-filter: blur(20px); display: flex; justify-content: space-between; align-items: center; color: #FFFFFF;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 800; color: #34D399;">
                <span>★ 5.0</span>
                <span style="color: #FFFFFF; font-weight: 600;">TripAdvisor</span>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #E7C78D; border: 1px solid rgba(231,199,141,0.3); padding: 4px 12px; border-radius: 999px;">
                MINTUR OFFICIAL
            </div>
        </div>
    </div>
    """,

    # Mobile Scene 2:
    """
    <div style="position: absolute; top: 120px; left: 40px; right: 40px; display: flex; flex-direction: column; gap: 14px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.5); border-radius: 999px; backdrop-filter: blur(16px); width: fit-content;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #34D399; box-shadow: 0 0 12px #34D399;"></span>
            <span style="color: #6EE7B7; font-size: 15px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Smart Digital Booking</span>
        </div>
        <div style="background: rgba(12, 28, 25, 0.88); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.18); border-radius: 28px; padding: 28px 32px; box-shadow: 0 25px 60px rgba(0,0,0,0.65);">
            <h1 style="margin: 0; color: #FFFFFF; font-size: 44px; font-weight: 900; line-height: 1.15; letter-spacing: -0.02em;">
                Instant Quotes & <span style="color: #F4A261;">Custom Journeys</span>
            </h1>
            <p style="margin: 12px 0 0; color: #D1D5DB; font-size: 20px; font-weight: 500; line-height: 1.45;">
                Explore day-by-day plans, private charters, and 24/7 concierge support.
            </p>
        </div>
    </div>
    <div style="position: absolute; bottom: 120px; left: 40px; right: 40px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="background: rgba(7, 25, 22, 0.92); border: 1px solid rgba(224, 122, 95, 0.4); border-radius: 22px; padding: 18px 24px; backdrop-filter: blur(20px); text-align: center; color: #FFFFFF; font-size: 16px; font-weight: 800;">
            <span style="color: #F4A261;">⚡ Zero Third-Party Markups</span> · Direct DMC
        </div>
    </div>
    """,

    # Mobile Scene 3:
    """
    <div style="position: absolute; top: 120px; left: 40px; right: 40px; display: flex; flex-direction: column; gap: 14px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 20px; background: rgba(201, 154, 91, 0.25); border: 1px solid rgba(201, 154, 91, 0.5); border-radius: 999px; backdrop-filter: blur(16px); width: fit-content;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #E7C78D; box-shadow: 0 0 12px #E7C78D;"></span>
            <span style="color: #E7C78D; font-size: 15px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Advisor & Partner Network</span>
        </div>
        <div style="background: rgba(12, 28, 25, 0.88); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.18); border-radius: 28px; padding: 28px 32px; box-shadow: 0 25px 60px rgba(0,0,0,0.65);">
            <h1 style="margin: 0; color: #FFFFFF; font-size: 44px; font-weight: 900; line-height: 1.15; letter-spacing: -0.02em;">
                Up to <span style="color: #34D399;">15% Commission</span>
            </h1>
            <p style="margin: 12px 0 0; color: #D1D5DB; font-size: 20px; font-weight: 500; line-height: 1.45;">
                White-label itineraries, fiduciary peace of mind, and dedicated B2B support.
            </p>
        </div>
    </div>
    <div style="position: absolute; bottom: 120px; left: 40px; right: 40px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
        <div style="background: linear-gradient(135deg, rgba(224, 122, 95, 0.95), rgba(180, 83, 9, 0.9)); border-radius: 24px; padding: 20px 24px; text-align: center; color: #FFFFFF; font-size: 18px; font-weight: 800; box-shadow: 0 15px 40px rgba(224,122,95,0.4);">
            US Line: +1 (302) 204-1881
        </div>
    </div>
    """,

    # Mobile Scene 4:
    """
    <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; text-align: center;">
        <div style="background: rgba(8, 24, 21, 0.92); backdrop-filter: blur(30px); border: 1.5px solid rgba(224, 122, 95, 0.45); border-radius: 36px; padding: 48px 36px; box-shadow: 0 30px 80px rgba(0,0,0,0.7); display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%;">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(224, 122, 95, 0.2); border: 1px solid rgba(224, 122, 95, 0.5); border-radius: 999px;">
                <span style="color: #F4A261; font-size: 14px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;">Start Exploring</span>
            </div>
            <h1 style="margin: 0; color: #FFFFFF; font-size: 46px; font-weight: 900; line-height: 1.15; letter-spacing: -0.02em;">
                Vermilion Routes
            </h1>
            <p style="margin: 0; color: #D1D5DB; font-size: 20px; font-weight: 500; line-height: 1.45;">
                The modern standard in bespoke South American travel.
            </p>
            <div style="margin-top: 10px; width: 100%; padding: 18px 24px; background: linear-gradient(135deg, #E07A5F, #C85A3D); border-radius: 999px; color: #FFFFFF; font-size: 20px; font-weight: 800; box-shadow: 0 15px 40px rgba(224, 122, 95, 0.45);">
                VermilionRoutes.com
            </div>
        </div>
    </div>
    """
]

async def generate_overlays():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 16:9 overlays
        page_16 = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        for idx, template in enumerate(HTML_16x9_TEMPLATES, 1):
            html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap" rel="stylesheet">
                <style>
                    body {{ margin: 0; padding: 0; width: 1920px; height: 1080px; overflow: hidden; background: transparent; }}
                </style>
            </head>
            <body>
                {template}
            </body>
            </html>
            """
            await page_16.set_content(html)
            await page_16.wait_for_timeout(1000)
            out_path = f"{OUT_DIR}/overlay_16x9_scene_{idx}.png"
            await page_16.screenshot(path=out_path, omit_background=True)
            print(f"Generated 16:9 overlay: {out_path}")
            
        # 9:16 overlays
        page_9 = await browser.new_page(viewport={'width': 1080, 'height': 1920})
        for idx, template in enumerate(HTML_9x16_TEMPLATES, 1):
            html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&display=swap" rel="stylesheet">
                <style>
                    body {{ margin: 0; padding: 0; width: 1080px; height: 1920px; overflow: hidden; background: transparent; }}
                </style>
            </head>
            <body>
                {template}
            </body>
            </html>
            """
            await page_9.set_content(html)
            await page_9.wait_for_timeout(1000)
            out_path = f"{OUT_DIR}/overlay_9x16_scene_{idx}.png"
            await page_9.screenshot(path=out_path, omit_background=True)
            print(f"Generated 9:16 overlay: {out_path}")
            
        await browser.close()
        print("ALL OVERLAYS GENERATED WITH 100% VECTOR PRECISION!")

if __name__ == "__main__":
    asyncio.run(generate_overlays())
