import {Conjugation} from "./WordProperties/Conjugations/Conjugations";
import {Example} from "./WordProperties/Examples/Examples";
import ReactHtmlParser from 'react-html-parser';

export const Verbix = {
    definitionProviders: {},
    exampleProviders: {
        nb: nbGetVerbixExample
    },
    conjugationProviders: {
        nb: nbGetVerbixConjugation
    },
    etymologyProviders: {},
    otherInfoProvider: {},
    capabilities: {},
    options: {
        // TODO - do I want to keep this?
        language: 25, // Defines the language that Verbix will use. I know 25 is Norwegian and 20 is English.
    },
    name: "Verbix"
}

// Norwegian providers
async function nbGetVerbixExample(searchWord) {
    const example = new Example('nb');
    const uri = encodeURIComponent(`https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/geturl/${uri}`).then(response => {
            if (response.status === 200) {
                responsePromise = response.text().then(text => {

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("verbtable");
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }
    
                    resolve(ReactHtmlParser (htmlString));
                });
            } else {
                reject("TITS");
            }

        });

    });

    return responsePromise;
}

async function nbGetVerbixConjugation(searchWord) {

    return <span>{<a
    target="_blank"
    rel="noopener"
    href={`https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`}>Click here for the conjugation!</a>
    }</span>;
}