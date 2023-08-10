import {APIRequestContext} from '@playwright/test';
import {LoginPayLoad} from '../utils/types'

export class APiUtils 
{
    private readonly apiContext: APIRequestContext;
    private readonly loginPayLoad: LoginPayLoad;

    constructor(apiContext: APIRequestContext, loginPayLoad: LoginPayLoad)
    {
        this.apiContext = apiContext; 
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse =  await  this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        } )//200,201,

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;

        return token;
    }

    async createOrder(orderPayLoad) {
        let response = {token: '', orderId: ''};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data : orderPayLoad,
            headers:{
                'Authorization' : response.token,
                'Content-Type'  : 'application/json'
            },
        })

        const orderResponseJson = await orderResponse.json();
        console.log('orderResponseJson', orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}