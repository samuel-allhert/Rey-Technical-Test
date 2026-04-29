import { chromium, test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PokedexPage} from '../pages/pokedex.page';

test('Rey Technical Test', async () => {
  const context = await chromium.launchPersistentContext(
    './profiles/chrome-profile',
    {
      channel: 'chrome',
      headless: false,
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

  await context.clearCookies();

  const page = await context.newPage();
  const homePage = new HomePage(page);
  const pokedexPage = new PokedexPage(page);

  await page.goto('https://www.pokemon.com/us/');

  await homePage.verifyPageIsLoaded();

  await homePage.rejectCookies();

  await homePage.clickPokedexNavbar();

  await pokedexPage.verifyPokedexSearchFieldExists();

  await pokedexPage.fillPokedexSearchField();

  //await pokedexPage.clickSubmitButton();

  await pokedexPage.clickPikachuList();

  await pokedexPage.verifyPokedexOnPikachu();

  await pokedexPage.scrollToExploreMoreButton();

  await pokedexPage.clickExploreMorePokemonButton();

  await pokedexPage.scrollToLoadMorePokemonButton();

  await page.waitForTimeout(3000);
});