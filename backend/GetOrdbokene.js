const {Builder, By, Key, until} = require('selenium-webdriver');

const LOOKUP_TIMEOUT = 5000;

/**
 * TODO
 * TODO https://github.com/grantcurell/narjetas/issues/12
 * @param {import("selenium-webdriver").ThenableWebDriver} driver 
 * @param {string} searchWord
 * @returns 
 */
 async function getOrdbokeneConjugation(driver, searchWord){

    await driver.get(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);

    let responsePromise = new Promise((resolve, reject) => {

        driver.wait(until.elementLocated(By.className("show-inflection")), LOOKUP_TIMEOUT).then(() => {

            driver.findElement(By.className("show-inflection")).click();

            driver.findElement(By.className("inflection-wrapper")).getAttribute('outerHTML').then((source) => {

                resolve(source);

            });
        }).catch((error => {
            resolve("No results found!");
            console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);
        }))

    });

    return responsePromise;    

}

/**
 * TODO
 * TODO https://github.com/grantcurell/narjetas/issues/12
 * @param {import("selenium-webdriver").ThenableWebDriver} driver 
 * @param {string} searchWord
 * @returns 
 */
 async function getOrdbokeneDefs(driver, searchWord){

    await driver.get(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);

    let responsePromise = new Promise((resolve, reject) => {

        driver.wait(until.elementLocated(By.className("show-inflection")), LOOKUP_TIMEOUT).then(() => {

            driver.findElement(By.className("show-inflection")).click();

            driver.findElement(By.className("definitions")).getAttribute('outerHTML').then((source) => {

                resolve(source);

            });
        }).catch((error => {
            resolve("No results found!");
            console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);
        }))

    });

    return responsePromise;    

}

/**
 * TODO
 * TODO https://github.com/grantcurell/narjetas/issues/12
 * @param {import("selenium-webdriver").ThenableWebDriver} driver 
 * @param {string} searchWord
 * @returns 
 */
 async function getOrdbokeneEtymology(driver, searchWord){

    await driver.get(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);

    let responsePromise = new Promise((resolve, reject) => {

        driver.wait(until.elementLocated(By.className("show-inflection")), LOOKUP_TIMEOUT).then(() => {

            driver.findElement(By.className("show-inflection")).click();

            driver.findElement(By.className("etymology")).getAttribute('outerHTML').then((source) => {

                resolve(source);

            });
        }).catch((error => {
            resolve("No results found!");
            console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);
        }))

    });

    return responsePromise;    

}

module.exports.getOrdbokeneConjugation = getOrdbokeneConjugation;
module.exports.getOrdbokeneDefs = getOrdbokeneDefs;
module.exports.getOrdbokeneEtymology = getOrdbokeneEtymology;