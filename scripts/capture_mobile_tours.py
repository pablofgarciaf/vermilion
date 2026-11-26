from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        ctx = b.new_context(viewport={'width': 430, 'height': 932}, device_scale_factor=2, is_mobile=True, has_touch=True)
        pg = ctx.new_page()
        pg.goto('http://localhost:3005/en/tours', wait_until='networkidle')
        try:
            btn = pg.query_selector("button:has-text('Accept cookies')")
            if btn:
                btn.click()
                pg.wait_for_timeout(500)
        except Exception as e:
            pass
        pg.evaluate('window.scrollTo(0, 680)')
        pg.wait_for_timeout(1000)
        pg.screenshot(path=r'C:\Users\pablo\OneDrive\Imágenes\Vermilion\UI_Recordings\Retina_Captures\ui_mobile_tours_cards.png')
        b.close()
    print("Mobile tours cards captured!")

if __name__ == "__main__":
    main()
