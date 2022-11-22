const express = require('express');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const {Builder, By, Key, until} = require('selenium-webdriver');
const cors = require('cors');
const Ordbokene = require('./GetOrdbokene')

const screen = {
    width: 640,
    height: 480
};

let corsOptions = {
    origin : ['http://localhost:3000', 'http://127.0.0.1:3000'],
}

const LOOKUP_TIMEOUT = 5000;

/**
 * Gets a url and returns its html
 * @param {string} url The URL you want to get
 * @param {import("selenium-webdriver").ThenableWebDriver} driver A pointer to 
 * the selenium driver to us
 * @param {string} elementClass (optional) You may optionally provide a classname
 * as an argument and it will return the HTML for the element and children of the
 * element with that specific classname
 * @param {string} elementId (optional) You may optionally provide an id as
 * an argument and it will return the HTML for the element and children of the
 * element with that specific id
 * @returns {Promise} A promise which when resolves has the HTML for the URL
 */
async function getUrl(url, driver, elementClass = null, elementId = null){

    //To fetch http://google.com from the browser with our code.
    console.info(`INFO: Running getURL for url ${url}`)
    await driver.get(url);

    let responsePromise;

    if (elementClass) {

        responsePromise = new Promise((resolve, reject) => {
    
            driver.wait(until.elementLocated(By.className(`${elementClass}`)), LOOKUP_TIMEOUT).then(() => {

                driver.findElement(By.className(`${elementClass}`)).getAttribute('outerHTML')
                .then((source) => {

                    resolve(source);

                }).catch((error => {
                    resolve("No results found!");
                    console.info(`INFO: Got no results for search url ${url}. Error: ${error}`);
                }));
            }).catch((error => {
                resolve(`No results found for class ${elementClass} in url ${url}`);
                console.info(`INFO: Got no results for search url ${url}. Error: ${error}`);
            }))
        });

    } else if (elementId) {

        responsePromise = new Promise((resolve, reject) => {
    
            driver.wait(until.elementLocated(By.id(`${elementId}`)), LOOKUP_TIMEOUT).then(() => {

                driver.findElement(By.id(`${elementId}`)).getAttribute('outerHTML')
                .then((source) => {

                    resolve(source);

                }).catch((error => {
                    resolve(`No results found for ${searchWord}!`);
                    console.info(`INFO: Got no results for search url ${url}. Error: ${error}`);
                }));
            }).catch((error => {
                resolve(`No results found for ID ${elementId} in url ${url}`);
                console.info(`INFO: Got no results for search url ${url}. Error: ${error}`);
            }))
        });

    } else {
        responsePromise = await driver.getPageSource().then((source) => {
            return source;
        }).catch((error => {
            resolve("No results found!");
            console.info(`INFO: Got no results for search url ${url}. Error: ${error}`);
        }));
    }

    return responsePromise

}

const app = express();
app.use(cors(corsOptions))

app.get('/', function (req, res) {
    console.warn("Received request for / which is not in use.");
})

app.get('/geturl/:url', function(req, res) {

    console.info(`INFO: Processing a request for a URL for ${req.params.url}`);
    let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    getUrl(req.params.url, driver).then(html => {
        res.send(`${html}`);
        setTimeout(() => {
            console.info("INFO: Exiting driver.");
            
            driver.quit().catch(() => {
                console.error("ERROR: Failed to quit driver.");
            })
        }, 1000);
    }).catch((error) => {
        console.error(`A critical error was thrown while processing 
        ${req.params.url}. Error was ${error}`);
        res.send('');
    });;

})

app.get('/geturlwithclass/:url/:class', function(req, res) {

    console.info(`INFO: Processing a request for a URL for ${req.params.url} 
    looking for class ${req.params.class}`);
    let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    getUrl(req.params.url, driver, req.params.class, null).then(html => {
        res.send(`${html}`);
        setTimeout(() => {
            console.debug("DEBUG: Trying to quit driver.");
            
            driver.quit().catch(() => {
                console.error("ERROR: Failed to quit driver.");
            })
        }, 1000);
    }).catch((error) => {
        console.error(`A critical error was thrown while processing 
        ${req.params.url}. Error was ${error}`);
        res.send('');
    });;

})

app.get('/geturlwithid/:url/:id', function(req, res) {

    console.info(`INFO: Processing a request for a URL for ${req.params.url} 
    looking for ID ${req.params.id}`);

    let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    getUrl(req.params.url, driver, null, req.params.id).then(html => {
        res.send(`${html}`);
        setTimeout(() => {
            console.debug("DEBUG: Trying to quit driver.");
            
            driver.quit().catch(() => {
                console.error("ERROR: Failed to quit driver.");
            })
        }, 1000);
    }).catch((error) => {
        console.error(`A critical error was thrown while processing 
        ${req.params.url}. Error was ${error}`);
        res.send('');
    });;

})

app.get('/getordbokene/:searchWord/:type', function(req, res) {

    console.info(`INFO: Processing a request for ordbokene for word ${req.params.searchWord}`)
    let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

    if (req.params.type === "conjugation") {
        Ordbokene.getOrdbokeneConjugation(driver, req.params.searchWord).then(html => {
            res.send(html);
            setTimeout(() => {
                console.debug("DEBUG: Trying to quit driver.");
            
                driver.quit().catch(() => {
                    console.error("ERROR: Failed to quit driver.");
                })
            }, 1000);
        }).catch((error) => {
            console.error(`A critical error was thrown while processing 
            ${req.params.searchWord}. Error was ${error}`);
            res.send('');
        });
    } else if (req.params.type === "etymology") {
        Ordbokene.getOrdbokeneEtymology(driver, req.params.searchWord).then(html => {
            res.send(html);
            setTimeout(() => {
                console.debug("DEBUG: Trying to quit driver.");
            
                try {driver.quit();} catch {
                    console.error("ERROR: Failed to quit driver.");
                }
            }, 1000);
        }).catch((error) => {
            console.error(`A critical error was thrown while processing 
            ${req.params.searchWord}. Error was ${error}`);
            res.send('');
        });;
    } else {
        Ordbokene.getOrdbokeneDefs(driver, req.params.searchWord).then(html => {
            res.send(html);
            setTimeout(() => {
                console.debug("DEBUG: Trying to quit driver.");
            
                driver.quit().catch(() => {
                    console.error("ERROR: Failed to quit driver.");
                })
            }, 1000);
        }).catch((error) => {
            console.error(`A critical error was thrown while processing 
            ${req.params.searchWord}. Error was ${error}`);
            res.send('');
        });;
    }
    


})

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.info("INFO: Example app listening at http://%s:%s", host, port)
});
