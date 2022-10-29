import * as Conjugations from "./ProviderTemplates/Conjugations/Conjugations";
import * as Definitions from "./ProviderTemplates/Definitions/Definitions";
import * as Examples from "./ProviderTemplates/Examples/Examples";
import { Verbix } from "./Verbix";

const providers = [
    Verbix
];

export function getSupportedConfigs() {

    providers.forEach(provider => {
        provider.definitionProviders.forEach(definitionProvider => {
            console.log(definitionProvider);
        })

        provider.conjugationProviders.forEach(conjugationProvider => {
            console.log(conjugationProvider);
        });

        
    });

    return({
        Conjugations: Conjugations,
        Definitions: Definitions,
        Examples: Examples
    });
};