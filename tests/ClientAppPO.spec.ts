import {test, expect, request} from '@playwright/test';
import {APiUtils} from '../utils/APiUtils';
import {LoginPayLoad, OrderPayLoad} from '../utils/types'
const userdata =  JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

const loginPayLoad: LoginPayLoad = {userEmail: userdata[0].username, userPassword: userdata[0].passwoed}
const fakePayLoadOrders = {data:[], message:"No Orders"};

// TODO....