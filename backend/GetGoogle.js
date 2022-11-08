const {By, until} = require('selenium-webdriver');

const LOOKUP_TIMEOUT = 5000;

/**
 * Used to grab conjugations for Google specifically
 * TODO https://github.com/grantcurell/narjetas/issues/12
 * @param {import("selenium-webdriver").ThenableWebDriver} driver A pointer to
 * the selenium driver you want to use
 * @param {string} searchWord The word for which we are searching
 * @returns {Promise} A promise which when resolved will have the source HTML
 */
 async function getGoogleDefinition(driver, searchWord){

    console.info(`INFO: Running getGoogleDefinition for word ${searchWord}`);

    await driver.get(`https://translate.google.com/`);

    let responsePromise = new Promise((resolve, reject) => {

        // Wait for the translation box to appear
        driver.wait(until.elementLocated(By.className("er8xn")), LOOKUP_TIMEOUT)
        .then(() => {

            // Type the word inte Google
            driver.findElement(By.className("er8xn")).sendKeys(searchWord);

            // Wait until the translation appears
            driver.wait(until.elementLocated(By.className("FqSPb")), LOOKUP_TIMEOUT)
            .then(() => {

                // Get the translation
                driver.findElement(By.className("FqSPb")).getAttribute('outerHTML')
                .then((source) => {

                    resolve(source);

                }).catch((error) => {
                    resolve("No results found!");
                    console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);                
                });
            }).catch(error => {
                resolve("No results found!");
                console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);;
            })
        }).catch((error => {
            resolve("No results found!");
            console.debug(`Got no results for search word ${searchWord}. Error: ${error}`);
        }))
    });

    return responsePromise;    
}

module.exports.getGoogleDefinition = getGoogleDefinition;