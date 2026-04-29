import {Page, Locator, expect} from '@playwright/test';

export class HomePage{
    readonly page: Page;
    readonly pokedex_navbar: Locator;
    readonly cookies_banner: Locator;

    constructor(page: Page){
        this.page = page;
        this.pokedex_navbar = page.locator('//a[@href="https://www.pokemon.com/us/pokedex/"]');
        this.cookies_banner = page.locator('//button[@id="onetrust-reject-all-handler"]');
    }

    async verifyPageIsLoaded(){
        await expect(this.pokedex_navbar).toBeVisible();
    }

    async clickPokedexNavbar(){
        await this.pokedex_navbar.click();
    }

    async rejectCookies(){
        await this.cookies_banner.click();
    }
}