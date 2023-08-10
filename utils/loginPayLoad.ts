import {LoginPayLoad, OrderPayLoad} from '../utils/types'

const userdata =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
export const loginUser: LoginPayLoad = {userEmail: userdata[0].username, userPassword: userdata[0].password, productName: userdata[0].productName}