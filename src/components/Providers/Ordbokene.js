import {Conjugation} from "./WordProperties/Conjugations/Conjugations";
import {Example} from "./WordProperties/Examples/Examples";
import ReactHtmlParser from 'react-html-parser';

export const Ordbokene = {
    definitionProviders: {},
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
    const example = new Example('nb');
    const uri = encodeURIComponent(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/getordbokene/${searchWord}`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("article_content");
    
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
    const uri = encodeURIComponent(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/getordbokene/${searchWord}`).then(response => {
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
    const Etymology = new Etymology('nb');
    const uri = encodeURIComponent(`https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/getordbokene/${searchWord}`).then(response => {
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