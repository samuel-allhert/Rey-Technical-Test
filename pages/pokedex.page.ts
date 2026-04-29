import {Page, Locator, expect} from '@playwright/test';

export class PokedexPage{
    readonly page: Page;
    readonly pokedex_searchField: Locator;
    //readonly submitButton: Locator;
    readonly pikachuList: Locator;
    readonly exploreMorePokemonButton: Locator;
    readonly loadMorePokemonButton: Locator;
    readonly pikachu25Text: Locator;

    constructor(page: Page){
        this.page = page;
        this.pokedex_searchField = page.locator('//input[@id="searchInput"]');
        //this.submitButton = page.locator('//input[@id="search"]');
        this.pikachuList = page.locator('//a[@href="/us/pokedex/pikachu"]');
        this.exploreMorePokemonButton = page.locator('//a[@href="/us/pokedex"]');
        this.loadMorePokemonButton = page.locator('//span[text()="Load more Pokémon"]');
        this.pikachu25Text = page.locator('//span[text()="#0025"]');
    }

    async verifyPokedexSearchFieldExists(){
        await expect(this.pokedex_searchField).toBeVisible();
    }

    async fillPokedexSearchField(){
        await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await this.pokedex_searchField.fill('Pikachu');
        await this.pokedex_searchField.click();
        //await this.pokedex_searchField.pressSequentially('Pikachu', { delay: 500 });
        await this.pokedex_searchField.press('Enter');
        //await this.fieldDate.press('Escape');
    }

    async clickSubmitButton(){
        //await this.submitButton.click();
        //await this.pokedex_searchField.press('Enter');
    }

    async clickPikachuList(){
        await this.pikachuList.click();
    }

    async verifyPokedexOnPikachu(){
        await expect(this.pikachu25Text).toBeVisible();
    }
    async scrollToExploreMoreButton(){
        while (!(await this.exploreMorePokemonButton.isVisible())) {
        //await this.page.mouse.wheel(0, 10);
        //await this.page.waitForTimeout(10000);
            await this.exploreMorePokemonButton.scrollIntoViewIfNeeded();
        }
    }

    async clickExploreMorePokemonButton(){
        await this.exploreMorePokemonButton.click();
        //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    }

    async scrollToLoadMorePokemonButton(){
        //await this.page.locator('//body[@class="us fluid custom-form-elements nav-follow"]').click();
        while (!(await this.loadMorePokemonButton.isVisible())) {
            //await this.page.waitForTimeout(1000);
            //await this.page.mouse.wheel(0, 500);
            await this.loadMorePokemonButton.scrollIntoViewIfNeeded();
            //await this.page.evaluate(() => {
            //    window.scrollBy(0, 60);
            //});
        }
    }
}