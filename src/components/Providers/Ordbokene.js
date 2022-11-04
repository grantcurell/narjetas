import {Conjugation} from "./WordProperties/Conjugations/Conjugations";
import {Example} from "./WordProperties/Examples/Examples";

export const Ordbokene = {
    definitionProviders: {},
    exampleProviders: {
        nb: nbGetOrdbokeneExample
    },
    conjugationProviders: {
        nb: nbGetOrdbokeneConjugation
    },
    etymologyProviders: {},
    otherInfoProvider: {},
    capabilities: {},
    options: {},
    name: "Ordbokene"
}

// Norwegian providers
async function nbGetOrdbokeneExample(searchWord, setData, setError, setIsLoading) {
    setIsLoading(false);
    setError(null);
    const example = new Example('nb');
    example.set('weblink', `https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);
    setData(example);
}

async function nbGetOrdbokeneConjugation(searchWord, setData, setError, setIsLoading) {
    setIsLoading(false);
    setError(null);
    const conjugation = new Conjugation('nb');
    conjugation.set('weblink', `https://ordbokene.no/bm/search?q=${searchWord}&scope=ei`);
    setData(conjugation);
}