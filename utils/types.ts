export type LoginPayLoad = {
    userEmail: string,
    userPassword: string
};

export type OrderPayLoad = {
    orders: [{ 
        country: string, 
        productOrderedId: string
    }]
};