const express = require('express');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');
const cors = require('cors');
const {urlencoded} = require("express");
const { elementIsVisible } = require('selenium-webdriver/lib/until');

const screen = {
    width: 640,
    height: 480
};

let corsOptions = {
    origin : ['http://localhost:3000', 'http://127.0.0.1:3000'],
}

async function getUrl(url){

    const searchString = "Automation testing with Selenium";

    //let builder = new Builder().forBrowser('chrome')
    //builder = builder.setChromeOptions(new chrome.Options().headless())

    let driver = new Builder()
        .forBrowser('chrome')
        //.setChromeOptions(new chrome.Options().headless().windowSize(screen))
        //.setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        .build();

    //To wait for browser to build and launch properly
    //let driver = await builder.forBrowser("chrome").build();

    //To fetch http://google.com from the browser with our code.
    console.log(`url is ${url}`)
    await driver.get(url);
    //driver.findElement(By.xpath("@class=verbtable"));
    //await driver.findElement(By.xpath("@class=verbtable"));

    //To send a search query by passing the value in searchString.
    //await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);

    //Verify the page title and print it
    const title = await driver.getTitle();
    console.log('Title is:',title);

    //It is always a safe practice to quit the browser after execution
    //await driver.quit();

    const source = await driver.getPageSource().then((source) => {
        return source;
    });

    return source
}

const app = express();
app.use(cors(corsOptions))

app.get('/', function (req, res) {
    console.log("HERE");
    res.send('Hello World');
})

app.get('/geturl/:url', function(req, res) {
    console.log(req.params)
    console.log(req.params.url);
    getUrl(req.params.url).then(html => {
        console.log(`Source is ${html}`)
        res.send(`${html}`);
    });
})

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.info("INFO: Example app listening at http://%s:%s", host, port)
});
