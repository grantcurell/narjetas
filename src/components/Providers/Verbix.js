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
async function nbGetVerbixExample(searchWord) {
    const example = new Example('nb');
    const uri = encodeURIComponent(`https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    const response = await fetch(`http://localhost:8081/geturl/${uri}`);
    //const response = await fetch("http://localhost:8081/");
    console.log(response);
    example.set('weblink', `https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    return null;
}

async function nbGetVerbixConjugation(searchWord) {
    const conjugation = new Conjugation('nb');
    conjugation.set('weblink', `https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    return null;
}