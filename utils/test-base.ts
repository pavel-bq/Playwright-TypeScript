const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder :    {
        username : "paveldon@web.de",
        password : "paveL#123",
        productName:"adidas original"
    }
});