export type LoginPayLoad = {
    userEmail: string,
    userPassword: string,
    productName: string
};

export type OrderPayLoad = {
    orders: [{ 
        country: string, 
        productOrderedId: string
    }]
};