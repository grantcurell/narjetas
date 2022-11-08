import ReactHtmlParser from 'react-html-parser';

export const Ordbokene = {
    definitionProviders: {
        //nb: nbGetOrdbokeneExample
    },
    exampleProviders: {
        //nb: nbGetOrdbokeneExample
    },
    conjugationProviders: {
        nb: nbGetOrdbokeneConjugation
    },
    etymologyProviders: {
        nb: nbGetOrdbokeneEtymology
    },
    otherInfoProvider: {},
    capabilities: {},
    options: {},
    name: "Ordbokene"
}

// Norwegian providers

/**
 * Used to get examples from Ordbokene website
 * @param {string} searchWord The word you want to search for
 * @returns {Promise} A promise which when resolved will contain a string with
 * the output from the website.
 */
async function nbGetOrdbokeneExample(searchWord) {

    console.info(`INFO: nbGetOrdbokeneExample: Processing word ${searchWord}`);

    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/getordbokene/${searchWord}/example`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("definitions");
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }
    
                    if (htmlString === "") {
                        resolve(<span>No results found!</span>)
                    } else {
                        resolve(ReactHtmlParser (htmlString));
                    }
                });
            } else {
                // TODO - need to handle this better
                // https://github.com/grantcurell/narjetas/issues/8
                reject("There was an error.");
            }
        });
    });

    return responsePromise;
}

/**
 * Used to get conjugations from Ordbokene website
 * @param {string} searchWord The word you want to search for
 * @returns {Promise} A promise which when resolved will contain a string with
 * the output from the website.
 */
async function nbGetOrdbokeneConjugation(searchWord) {

    console.info(`INFO: nbGetOrdbokeneConjugation: Processing word ${searchWord}`);

    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/getordbokene/${searchWord}/conjugation`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("inflection-wrapper");

                    // Remove extraneous buttons
                    Object.entries(dummyDOM.getElementsByClassName("show-inflection")).forEach((button) => {
                        button[1].remove();
                    })
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }
    
                    if (htmlString === "") {
                        resolve(<span>No results found!</span>)
                    } else {
                        resolve(ReactHtmlParser (htmlString.replace(/\n/g, '<br>').replace(/\\n/g, '<br>')));
                    }
                });
            } else {
                // TODO - need to handle this better
                // https://github.com/grantcurell/narjetas/issues/8
                reject("There was an error.");
            }
        });
    });

    return responsePromise;
}

/**
 * Used to get etymologies from Ordbokene website
 * @param {string} searchWord The word you want to search for
 * @returns {Promise} A promise which when resolved will contain a string with
 * the output from the website.
 */
async function nbGetOrdbokeneEtymology(searchWord) {

    console.info(`INFO: nbGetOrdbokeneEtymology: Processing word ${searchWord}`);

    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/getordbokene/${searchWord}/etymology`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("etymology");
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }
    
                    if (htmlString === "") {
                        resolve(<span>No results found!</span>)
                    } else {
                        resolve(ReactHtmlParser (htmlString));
                    }
                });
            } else {
                // TODO - need to handle this better
                // https://github.com/grantcurell/narjetas/issues/8
                reject("There was an error.");
            }
        });
    });

    return responsePromise;
}