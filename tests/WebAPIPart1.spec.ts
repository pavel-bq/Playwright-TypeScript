import {test, expect, request} from '@playwright/test';
import {APiUtils} from '../utils/APiUtils';
import {LoginPayLoad, OrderPayLoad} from '../utils/types'
import {loginUser} from '../utils/loginPayLoad';

const orderPayLoad: OrderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};

let response;

test.beforeAll( async()=> {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginUser);
    response =  await apiUtils.createOrder(orderPayLoad);
 });

 //create order is success
test('@API Place the order', async ({page}) => { 
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token );

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    for(let i =0; i<await rows.count(); ++i)
    {
        const rowOrderId =await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    console.log(orderIdDetails);
});