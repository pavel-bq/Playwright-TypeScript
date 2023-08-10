import {Page, Locator, expect} from '@playwright/test';

export class OrdersReviewPage
{
    private readonly page: Page;
    private readonly country: Locator;
    private readonly dropdown: Locator;
    private readonly emailId: Locator;
    private readonly submit: Locator;
    private readonly orderConfirmationText: Locator;
    private readonly orderId: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit =  page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode, countryName)
    {
        await this.country.type(countryCode,{delay:100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();

        for(let i =0;i< optionsCount; ++i)
        {
            const text =  await this.dropdown.locator("button").nth(i).textContent();
            if(text.trim() === countryName)
            {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async VerifyEmailId(username)
    {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId()
    {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}