import { chromium, test } from '@playwright/test';

test('abc', async () => {
    const context = await chromium.launchPersistentContext(
        './profiles/chrome-profile',
        {
            channel: 'chrome',
            headless: false,
            viewport: null,
            args: [
                '--disable-blink-features=AutomationControlled',
                '--disable-features=ThirdPartyCookies',
                '--disable-site-isolation-trials',
                '--start-maximized',
            ],
        }
    );

    await context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined,
        });
    });

    const page = await context.newPage();

    await page.goto('https://www.pokemon.com/', {
        waitUntil: 'domcontentloaded',
    });
    //button[@id="onetrust-reject-all-handler"]
    await page.waitForTimeout(30000);
})