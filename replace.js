const fs = require("fs");
module.exports = function (htmlTemp,json) {
    let output = htmlTemp.replace(/{%IMAGE%}/g, json.image);
    output = output.replace(/{%QUANTITY%}/g, json.quantity);
    output = output.replace(/{%PRODUCTNAME%}/g, json.productName);
    output = output.replace(/{%FROM%}/g, json.from);
    output = output.replace(/{%PRICE%}/g, json.price);
    output = output.replace(/{%NUTRIENTS%}/g, json.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, json.description);
    output = output.replace(/{%PRODUCT_CARDS%}/g, json);
    if (json.organic == false) {
        output = output.replace(/{%NOT_ORGANIC%}/g, "NOT ORGANIC");
    }
    else {
        output = output.replace(/{%NOT_ORGANIC%}/g, "ORGANIC");
    }
    return output;
}


