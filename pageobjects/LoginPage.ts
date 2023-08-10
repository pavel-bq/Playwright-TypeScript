import {Page, Locator} from '@playwright/test';
export class LoginPage {

    private readonly page: Page;
    private readonly userName: Locator;
    private readonly password: Locator;
    private readonly signInbutton: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInbutton= page.locator("[value='Login']");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password)
    {
        console.log(username, password, '########');
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');

    }
}