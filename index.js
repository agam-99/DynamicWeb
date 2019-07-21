const http = require("http");
const fs = require("fs");
const path=require('path');
const url=require('url');
const replace = require("./replace");
let template_product = fs.readFileSync('product.html').toString();
let template_overview = fs.readFileSync('overview.html').toString();
let template_card = fs.readFileSync('card.html').toString();
let json = fs.readFileSync('data.json');
json = JSON.parse(json);
const server = http.createServer((req, res) => {
    var path = req.url;
    var id = url.parse(path, true).query.id;
    console.log(id);
    var path = url.parse(path, true).pathname;

    if (path == '/' || path == "/overview") {
        let cardData = '';
        json.map( (el) => {
            cardData = cardData + replace(template_card, el);
        });
        // console.log(cardData);
        let html = replace(template_overview, cardData);
        res.end(html);
    }
    else if (path == '/product') {
        let html = replace(template_product, json[id]);
        res.end(html);
    }
    else {
        res.end("404 page not found");
    }
});
const PORT = process.env.PORT||3000;
server.listen(PORT);
