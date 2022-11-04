import {Conjugation} from "./WordProperties/Conjugations/Conjugations";
import {Example} from "./WordProperties/Examples/Examples";

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
async function nbGetVerbixExample(searchWord, setData, setIsLoading) {
    const example = new Example('nb');
    const uri = encodeURIComponent(`https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    fetch(`http://localhost:8081/geturl/${uri}`).then(response => {
        response.text().then(text => {

            let dummyDOM = document.createElement( 'html' );
            dummyDOM.innerHTML = text;
            const html = dummyDOM.getElementsByClassName("verbtable");

            /*
            // Get HTML as text
            const htmlArray = [...html].map(item => {
                return item.textContent || item.innerText || "";
            }).join("");
             */

            let htmlString = "";
            for (let i = 0; i < html.length ; i++) {
                htmlString += html[i].outerHTML;
            }

            setData(htmlString);
            setIsLoading(false);
        });
    });
}

async function nbGetVerbixConjugation(searchWord, setData, setIsLoading) {
    const conjugation = new Conjugation('nb');
    conjugation.set('weblink', `https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    setData("balls");
}