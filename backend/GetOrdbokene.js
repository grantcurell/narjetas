const {Builder, By, Key, until} = require('selenium-webdriver');

const LOOKUP_TIMEOUT = 5000;

/**
 * Used to grab conjugations for ordbokene specifically
 * TODO https://github.com/grantcurell/narjetas/issues/12
 * @param {import("selenium-webdriver").ThenableWebDriver} driver A pointer to
 * the selenium driver you want to use
 * @param {string} searchWord The word for which we are searching
 * @returns {Promise} A promise which when resolved will have the source HTML
 */
 async function getOrdbokeneConjugation(driver, searchWord){

    console.info(`INFO: Running getOrdbokeneConjugation for word ${searchWord}`);

    await driver.get(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);

    let responsePromise = new Promise((resolve, reject) => {

        driver.wait(until.elementLocated(By.className("show-inflection")), LOOKUP_TIMEOUT)
        .then(() => {

            driver.findElement(By.className("show-inflection")).click();

            driver.findElement(By.className("inflection-wrapper")).getAttribute('outerHTML')
            .then((source) => {

                resolve(source);

            }).catch((error) => {
                resolve(`No results found for ${searchWord}!`);
                console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);                
            });
        }).catch((error => {
            resolve(`No results found for ${searchWord}!`);
            console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);
        })).finally(() => {
            console.log("HERE");
        })

    });

    return responsePromise;    

}

/**
 * Used to grab definitions for ordbokene specifically
 * TODO https://github.com/grantcurell/narjetas/issues/12
 * @param {import("selenium-webdriver").ThenableWebDriver} driver A pointer to
 * the selenium driver you want to use
 * @param {string} searchWord The word for which we are searching
 * @returns {Promise} A promise which when resolved will have the source HTML
 */
 async function getOrdbokeneDefs(driver, searchWord){

    console.info(`INFO: Running getOrdbokeneDefs for word ${searchWord}`);

    await driver.get(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);

    let responsePromise = new Promise((resolve, reject) => {

        driver.wait(until.elementLocated(By.className("show-inflection")), LOOKUP_TIMEOUT)
        .then(() => {

            driver.findElement(By.className("show-inflection")).click();

            driver.findElement(By.className("definitions")).getAttribute('outerHTML')
            .then((source) => {

                resolve(source);

            }).catch((error) => {
                resolve(`No results found for ${searchWord}!`);
                console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);                
            });
        }).catch((error => {
            resolve(`No results found for ${searchWord}!`);
            console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);
        }))

    });

    return responsePromise;    

}

/**
 * Used to grab etymologies for ordbokene specifically
 * TODO https://github.com/grantcurell/narjetas/issues/12
 * @param {import("selenium-webdriver").ThenableWebDriver} driver A pointer to
 * the selenium driver you want to use
 * @param {string} searchWord The word for which we are searching
 * @returns {Promise} A promise which when resolved will have the source HTML
 */
 async function getOrdbokeneEtymology(driver, searchWord){

    console.info(`INFO: Running getOrdbokeneEtymology for word ${searchWord}`);

    await driver.get(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);

    let responsePromise = new Promise((resolve, reject) => {

        driver.wait(until.elementLocated(By.className("show-inflection")), LOOKUP_TIMEOUT)
        .then(() => {

            driver.findElement(By.className("show-inflection")).click();

            driver.findElement(By.className("etymology")).getAttribute('outerHTML')
            .then((source) => {

                resolve(source);

            }).catch((error) => {
                resolve(`No results found for ${searchWord}!`);
                console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);                
            });
        }).catch((error => {
            resolve(`No results found for ${searchWord}!`);
            console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);
        }))

    });

    return responsePromise;    

}

module.exports.getOrdbokeneConjugation = getOrdbokeneConjugation;
module.exports.getOrdbokeneDefs = getOrdbokeneDefs;
module.exports.getOrdbokeneEtymology = getOrdbokeneEtymology;