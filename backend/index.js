const express = require('express');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');
const cors = require('cors');
const {urlencoded} = require("express");
const { elementIsVisible } = require('selenium-webdriver/lib/until');
const Ordbokene = require('./GetOrdbokene')

const screen = {
    width: 640,
    height: 480
};

let corsOptions = {
    origin : ['http://localhost:3000', 'http://127.0.0.1:3000'],
}

async function getUrl(url, driver){

    //To fetch http://google.com from the browser with our code.
    console.log(`url is ${url}`)
    await driver.get(url);

    //Verify the page title and print it
    const title = await driver.getTitle();
    console.log('Title is:',title);

    //It is always a safe practice to quit the browser after execution
    // TODO - need to figure out how to quit driver https://github.com/grantcurell/narjetas/issues/9
    // await driver.quit();

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

    let driver = new Builder()
    .forBrowser('chrome')
    //.setChromeOptions(new chrome.Options().headless().windowSize(screen))
    //.setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    console.log(req.params)
    console.log(req.params.url);
    getUrl(req.params.url, driver).then(html => {
        //console.log(`Source is ${html}`)
        res.send(`${html}`);
        driver.quit();
    });

})

app.get('/getordbokene/:searchWord', function(req, res) {

    let driver = new Builder()
    .forBrowser('chrome')
    //.setChromeOptions(new chrome.Options().headless().windowSize(screen))
    //.setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    Ordbokene.getOrdbokeneConjugation(driver, req.params.searchWord).then(html => {
        res.send(html);
        driver.quit();
    });

})

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.info("INFO: Example app listening at http://%s:%s", host, port)
});
