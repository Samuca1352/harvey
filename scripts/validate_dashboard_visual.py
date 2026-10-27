"""Full visual validation of the Harvey Dashboard in Chromium via Playwright.
Tests all 14 tabs across Desktop (1440x900) and Mobile (390x844), in both Light and Dark modes.
Saves screenshots to the artifact directory.
"""
import os
import sys
import time
import threading
from pathlib import Path

# Add local libs to LD_LIBRARY_PATH if present
local_lib = Path(__file__).resolve().parents[1] / ".local_libs/usr/lib/x86_64-linux-gnu"
if local_lib.exists():
    os.environ["LD_LIBRARY_PATH"] = f"{local_lib}:{os.environ.get('LD_LIBRARY_PATH', '')}"

import uvicorn
from playwright.sync_api import sync_playwright
import harvey.dashboard as dash

PORT = 5588
BASE_URL = f"http://127.0.0.1:{PORT}"
ARTIFACT_DIR = Path("/home/samuelcardoso/.gemini/antigravity-ide/brain/925c2e9d-ff6a-4c2c-8115-42d486f00060/screenshots")
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

TABS = [
    "today", "signals", "discover", "companies", "prospects",
    "campaigns", "outbox", "conversations", "activity", "openers",
    "usage", "settings", "controls", "help"
]

def run_server():
    uvicorn.run(dash.app, host="127.0.0.1", port=PORT, log_level="warning")

def main():
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(1.5)

    failures = []
    console_errors = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        for vp_name, vp in [("desktop", {"width": 1440, "height": 900}), ("mobile", {"width": 390, "height": 844})]:
            for theme in ["light", "dark"]:
                context = browser.new_context(viewport=vp, color_scheme=theme)
                page = context.new_page()

                def on_console(msg):
                    if msg.type == "error":
                        console_errors.append(f"[{vp_name}][{theme}] {msg.text}")

                page.on("console", on_console)
                page.on("pageerror", lambda err: failures.append(f"[{vp_name}][{theme}] {err}"))

                page.goto(BASE_URL)
                page.evaluate(f"applyTheme('{theme}')")
                page.wait_for_timeout(300)

                for tab in TABS:
                    page.evaluate(f"showTab('{tab}')")
                    page.wait_for_timeout(800)

                    # Verify section is active and visible
                    assert page.locator(f"#{tab}").is_visible(), f"Tab #{tab} not visible"

                    # Capture screenshot for key screens
                    if tab in ["today", "signals", "discover", "openers", "usage", "companies", "outbox", "conversations"]:
                        img_path = ARTIFACT_DIR / f"{tab}_{vp_name}_{theme}.png"
                        page.screenshot(path=str(img_path))

                # Mobile drawer test
                if vp_name == "mobile":
                    page.locator("#menu-toggle").click()
                    page.wait_for_timeout(200)
                    assert page.locator("body").evaluate("el => el.classList.contains('nav-open')"), "Drawer should open"
                    # Close via backdrop
                    page.locator(".nav-backdrop").click(force=True)
                    page.wait_for_timeout(200)
                    assert not page.locator("body").evaluate("el => el.classList.contains('nav-open')"), "Drawer should close"

                context.close()

        browser.close()

    if console_errors:
        print("Console errors detected:\n" + "\n".join(console_errors))
    if failures:
        print("Page failures detected:\n" + "\n".join(failures))
        sys.exit(1)

    print(f"Validation successful! All 14 tabs verified across Desktop & Mobile, Light & Dark themes.")
    print(f"Screenshots saved to {ARTIFACT_DIR}")

if __name__ == "__main__":
    main()
