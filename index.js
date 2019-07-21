const http = require("http");
const fs = require("fs");
const slugify = require("slugify");
const replace = require("./replace");
let template_product = fs.readFileSync('product.html').toString();
let template_overview = fs.readFileSync('overview.html').toString();
let template_card = fs.readFileSync('card.html').toString();
let json = fs.readFileSync('data.json');
json = JSON.parse(json);
const server = http.createServer((req, res) => {
    var path = req.url;
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
        let html = replace(template_product, json[0]);
        res.end(html);
    }
    else {
        res.end("404 page not found");
    }
});
const PORT = process.env.PORT||80;

server.listen(PORT);
