import {Page, Locator, expect} from '@playwright/test';

export class OrdersHistoryPage
{
    private readonly page: Page;
    private readonly ordersTable: Locator;
    private readonly rows: Locator;
    private readonly orderdIdDetails: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails =page.locator(".col-text");
    } 
    
    async searchOrderAndSelect(orderId)
    {
        await this.ordersTable.waitFor();
        for(let i =0; i<await this.rows.count(); ++i)
        {
            const rowOrderId =await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId))
            {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId()
    {
        return await this.orderdIdDetails.textContent();
    }
}