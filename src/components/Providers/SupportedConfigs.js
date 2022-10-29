import { Conjugations } from "./ProviderTemplates/Conjugations/Conjugations"
import { Definitions } from "./ProviderTemplates/Definitions/Definitions";
import { Examples } from "./ProviderTemplates/Examples/Examples";
import { Verbix } from "./Verbix";

const providers = [
    Verbix
];

/**
 * getSupportedConfigs - getSupportedConfigs scans the ProviderTemplates folder
 * and looks for all supported combinations of languages, conjugations,
 * definitions, examples, and etymologies.
 * @returns {Object} Returns an Object containing all provider definitions. See
 * the function's inline documentation for a specification of the return Object.
 */
export function getSupportedConfigs() {

    /* 
        All providers follow the following format:
        {
            twoLetterLanguageCode: {
                provider1: functionPointerToProvider,
                provider2: functionPointerToProvider
            },
            language2TwoLetterLanguageCode: {
                provider1: functionPointerToProvider,
                provider2: functionPointerToProvider
            }
        }
    */
    const ConjugationProviders = {};
    const DefinitionProviders = {};
    const ExampleProviders = {};
    const EtymologyProviders = {};

    const languageNames = new Intl.DisplayNames(['en'], {type: 'language'});

    providers.forEach(provider => {
        console.info(`INFO: Registering provider: ${provider.name}.`)
        Object.entries(provider.definitionProviders).forEach(definitionProvider => {
            // TODO
        });

        // Add conjugation providers
        Object.entries(provider.conjugationProviders).forEach(conjugationProvider => {

            // Check to see if the language, ex: nb, has a matching conjugation
            // template. If it doesn't, that shouldn't happen and is a warning
            if (conjugationProvider[0] in Conjugations) {
                console.info(`Registered conjugation provider ${provider.name} for ${languageNames.of(conjugationProvider[0])}`);
                
                // Add the conjugation provider to our list of providers
                if (typeof ConjugationProviders[conjugationProvider[0]] == 'undefined') {
                    ConjugationProviders[conjugationProvider[0]] = {};
                }
                ConjugationProviders[conjugationProvider[0]][provider.name] = conjugationProvider[1];
            } else {
                console.warn(`WARNING: Conjugation provider ${provider.name} has a provider for language ${conjugationProvider[0]} (${languageNames.of(conjugationProvider[0])}) but there was no template configuration. We are ignoring this provider. This should be investigated.`);
            }
        });

        // Add example providers
        Object.entries(provider.exampleProviders).forEach(exampleProvider => {
            // Check to see if the language, ex: nb, has a matching example
            // template. If it doesn't, that shouldn't happen and is a warning
            if (exampleProvider[0] in Examples) {
                console.info(`Registered example provider ${provider.name} for ${languageNames.of(exampleProvider[0])}`);
                
                // Add the conjugation provider to our list of providers
                if (typeof ExampleProviders[exampleProvider[0]] == 'undefined') {
                    ExampleProviders[exampleProvider[0]] = {};
                }
                ExampleProviders[exampleProvider[0]][provider.name] = exampleProvider[1];
            } else {
                console.warn(`WARNING: Example provider ${provider.name} has a provider for language ${exampleProvider[0]} (${languageNames.of(exampleProvider[0])}) but there was no template configuration. We are ignoring this provider. This should be investigated.`);
            }
        });

        Object.entries(provider.etymologyProviders).forEach(etymologyProvider => {
            // TODO
        });
    });

    return({
        ConjugationProviders: ConjugationProviders,
        DefinitionProviders: DefinitionProviders,
        ExampleProviders: ExampleProviders,
        EtymologyProviders: EtymologyProviders
    });
};