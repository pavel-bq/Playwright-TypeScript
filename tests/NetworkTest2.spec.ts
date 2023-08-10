import {test, request} from '@playwright/test';
import {APiUtils} from '../utils/APiUtils';
import {LoginPayLoad, OrderPayLoad} from '../utils/types'

const userdata =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
const loginPayLoad: LoginPayLoad = {userEmail: userdata[0].username, userPassword: userdata[0].password}
const orderPayLoad: OrderPayLoad = {orders:[{country:"India",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};

let response;

test.beforeAll( async()=> {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
    response =  await apiUtils.createOrder(orderPayLoad);
 });

 //create order is success
test('Place the order', async ({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token );

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6226cbcec5a82af44fa48599",
        route=> route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
    )
    await page.locator("button:has-text('View')").first().click();
});