import {Page, Locator, expect} from '@playwright/test';
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {OrdersHistoryPage} from './OrdersHistoryPage';
import {OrdersReviewPage} from './OrdersReviewPage';
import {CartPage} from './CartPage';

export class POManager
{
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly dashboardPage: DashboardPage;
    private readonly ordersHistoryPage: OrdersHistoryPage;
    private readonly ordersReviewPage: OrdersReviewPage;
    private readonly cartPage: CartPage;

    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }
    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage()
    {
        return this.ordersReviewPage;
    }
}