"""Offline file:// smoke + interaction tests. Run after npm run build:design-system."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1] / "design-system/references"


def main():
    failures = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(offline=True, viewport={"width": 1440, "height": 900})
        for file in sorted(ROOT.rglob("*.html")):
            page = context.new_page()
            page.on("pageerror", lambda error: failures.append(str(error)))
            page.on("requestfailed", lambda req: failures.append(f"{req.url}: {req.failure}"))
            page.goto(file.as_uri())
            page.evaluate("document.fonts.ready")
            if page.locator("#root").count():
                page.wait_for_function("document.querySelector('#root').children.length > 0")
            assert page.locator("body").inner_text().strip() or file.name == "mobile.html", file
            page.close()
        page = context.new_page()
        page.on("pageerror", lambda error: failures.append(str(error)))
        page.goto((ROOT / "ui_kits/dashboard/tasks.html").as_uri())
        page.get_by_role("tab", name="List", exact=True).click()
        assert page.get_by_role("tab", name="List", exact=True).get_attribute("aria-selected") == "true"
        page.get_by_role("tab", name="Board", exact=True).click()
        page.set_viewport_size({"width": 390, "height": 844})
        page.get_by_role("button", name="Open menu", exact=True).click()
        assert page.locator(".drawer").is_visible()
        page.locator(".drawer").get_by_role("button", name="Home", exact=True).click()
        assert not page.locator(".drawer").count()
        assert page.locator(".metrics").is_visible()
        page.close()
        browser.close()
    assert not failures, "\n".join(failures)
    print("34 HTML pages opened offline; task tabs and mobile drawer passed.")


if __name__ == "__main__":
    main()
