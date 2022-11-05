import ReactHtmlParser from 'react-html-parser';

export const Ordbokene = {
    definitionProviders: {
        nb: nbGetOrdbokeneExample
    },
    exampleProviders: {
        nb: nbGetOrdbokeneExample
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
async function nbGetOrdbokeneExample(searchWord) {

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
    
                    resolve(ReactHtmlParser (htmlString));
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

async function nbGetOrdbokeneConjugation(searchWord) {
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/getordbokene/${searchWord}/conjugation`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("inflection-wrapper");
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }
    
                    resolve(ReactHtmlParser (htmlString));
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

async function nbGetOrdbokeneEtymology(searchWord) {
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
    
                    resolve(ReactHtmlParser (htmlString));
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