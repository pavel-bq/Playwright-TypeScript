import {APIRequestContext} from '@playwright/test';
import {LoginPayLoad, Response} from '../utils/types'

export class APiUtils 
{
    private readonly apiContext: APIRequestContext;
    private readonly loginPayLoad: LoginPayLoad;
    private readonly response: Response;

    constructor(apiContext: APIRequestContext, loginPayLoad: LoginPayLoad)
    {
        this.apiContext = apiContext; 
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse =  await  this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data:this.loginPayLoad
        } )//200,201,

        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);

        return token;
    }

    async createOrder(orderPayLoad) {
        this.response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data : orderPayLoad,
            headers:{
                'Authorization' : this.response.token,
                'Content-Type'  : 'application/json'
            },
        })

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        this.response.orderId = orderId;

        return this.response;
    }
}