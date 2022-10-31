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
async function nbGetVerbixExample(searchWord, setData, setError, setIsLoading) {
    setIsLoading(false);
    setError(null);
    const example = new Example('nb');
    example.set('weblink', `https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    setData(example);
}

async function nbGetVerbixConjugation(searchWord, setData, setError, setIsLoading) {
    setIsLoading(false);
    setError(null);
    const conjugation = new Conjugation('nb');
    conjugation.set('weblink', `https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    setData(conjugation);
}