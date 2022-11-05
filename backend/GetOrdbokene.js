const {Builder, By, Key, until} = require('selenium-webdriver');

/**
 * TODO
 * @param {import("selenium-webdriver").ThenableWebDriver} driver 
 * @param {string} searchWord
 * @returns 
 */
 async function getOrdbokeneConjugation(driver, searchWord){

    await driver.get(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);

    let responsePromise = new Promise((resolve, reject) => {

        driver.wait(until.elementLocated(By.className("show-inflection"))).then(() => {

            driver.findElement(By.className("show-inflection")).click();

            driver.getPageSource().then((source) => {

                resolve(source);

            });
        })

    });

    return responsePromise;

}

module.exports.getOrdbokeneConjugation = getOrdbokeneConjugation;