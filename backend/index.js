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

async function getUrl(url, driver, elementClass = null){

    //To fetch http://google.com from the browser with our code.
    console.log(`url is ${url}`)
    await driver.get(url);

    //Verify the page title and print it
    const title = await driver.getTitle();
    console.log('Title is:',title);

    let responsePromise;

    if (elementClass) {

        responsePromise = new Promise((resolve, reject) => {
    
            driver.wait(until.elementLocated(By.className(`${elementClass}`))).then(() => {

                driver.findElement(By.className(`${elementClass}`)).click();

                driver.findElement(By.className(`${elementClass}`)).getAttribute('outerHTML').then((source) => {

                    resolve(source);

                });
            })
        });

    } else {
        responsePromise = await driver.getPageSource().then((source) => {
            return source;
        });
    }

    return responsePromise

}

const app = express();
app.use(cors(corsOptions))

app.get('/', function (req, res) {
    console.log("HERE");
    res.send('Hello World');
})

app.get('/geturl/:url', function(req, res) {

    console.log("BUILD 1");
    let driver = new Builder()
    .forBrowser('chrome')
    //.setChromeOptions(new chrome.Options().headless().windowSize(screen))
    //.setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    console.log(req.params)
    console.log(req.params.url);

    getUrl(req.params.url, driver).then(html => {
        res.send(`${html}`);
        setTimeout(() => {
            console.log("Trying to quit driver.");
            
            try {driver.quit();} catch {
                console.log("Failed to quit driver.");
            }
        }, 1000);
    });

})

app.get('/geturl/:url/:class', function(req, res) {

    console.log("BUILD 1");
    let driver = new Builder()
    .forBrowser('chrome')
    //.setChromeOptions(new chrome.Options().headless().windowSize(screen))
    //.setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    console.log(req.params)
    console.log(req.params.url);

    getUrl(req.params.url, driver, req.params.class).then(html => {
        res.send(`${html}`);
        setTimeout(() => {
            console.log("Trying to quit driver.");
            
            try {driver.quit();} catch {
                console.log("Failed to quit driver.");
            }
        }, 1000);
    });

})

app.get('/getordbokene/:searchWord/:type', function(req, res) {

    console.log("BUILD 2");
    let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    //.setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    if (req.params.type === "conjugation") {
        Ordbokene.getOrdbokeneConjugation(driver, req.params.searchWord).then(html => {
            res.send(html);
            setTimeout(() => {
                console.log("Trying to quit driver.");
            
                try {driver.quit();} catch {
                    console.log("Failed to quit driver.");
                }
            }, 1000);
        });
    } else if (req.params.type === "etymology") {
        Ordbokene.getOrdbokeneEtymology(driver, req.params.searchWord).then(html => {
            res.send(html);
            setTimeout(() => {
                console.log("Trying to quit driver.");
            
                try {driver.quit();} catch {
                    console.log("Failed to quit driver.");
                }
            }, 1000);
        });
    } else {
        Ordbokene.getOrdbokeneDefs(driver, req.params.searchWord).then(html => {
            res.send(html);
            setTimeout(() => {
                console.log("Trying to quit driver.");
            
                try {driver.quit();} catch {
                    console.log("Failed to quit driver.");
                }
            }, 1000);
        });
    }
    


})

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.info("INFO: Example app listening at http://%s:%s", host, port)
});
