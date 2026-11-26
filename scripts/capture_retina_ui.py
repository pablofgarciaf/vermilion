import os
from playwright.sync_api import sync_playwright

OUT_DIR = r"C:\Users\pablo\OneDrive\Imágenes\Vermilion\UI_Recordings\Retina_Captures"
os.makedirs(OUT_DIR, exist_ok=True)

PORT = 3005

PAGES_DESKTOP = [
    ("ui_home_desktop.png", f"http://localhost:{PORT}/en"),
    ("ui_advisors_desktop.png", f"http://localhost:{PORT}/en/travel-advisors"),
    ("ui_tours_desktop.png", f"http://localhost:{PORT}/en/tours"),
    ("ui_presentation_desktop.png", f"http://localhost:{PORT}/en/presentation"),
]

PAGES_MOBILE = [
    ("ui_home_mobile.png", f"http://localhost:{PORT}/en"),
    ("ui_advisors_mobile.png", f"http://localhost:{PORT}/en/travel-advisors"),
]

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # Desktop 1920x1080, scale 2
        desktop_context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=2
        )
        desktop_page = desktop_context.new_page()
        for filename, url in PAGES_DESKTOP:
            print(f"Capturing {url} -> {filename}...")
            desktop_page.goto(url, wait_until="networkidle", timeout=30000)
            try:
                btn = desktop_page.query_selector("button:has-text('Accept cookies')")
                if btn:
                    btn.click()
            except Exception:
                pass
            desktop_page.wait_for_timeout(1000)
            desktop_page.screenshot(path=os.path.join(OUT_DIR, filename))

        # Mobile 430x932, scale 2
        mobile_context = browser.new_context(
            viewport={"width": 430, "height": 932},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        mobile_page = mobile_context.new_page()
        for filename, url in PAGES_MOBILE:
            print(f"Capturing mobile {url} -> {filename}...")
            mobile_page.goto(url, wait_until="networkidle", timeout=30000)
            try:
                btn = mobile_page.query_selector("button:has-text('Accept cookies')")
                if btn:
                    btn.click()
            except Exception:
                pass
            mobile_page.wait_for_timeout(1000)
            mobile_page.screenshot(path=os.path.join(OUT_DIR, filename))

        browser.close()
    print("All captures from port 3005 completed successfully!")

if __name__ == "__main__":
    main()
