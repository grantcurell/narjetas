import React from 'react';
import Provider from "../Providers/Provider";

export default function LookupWord(props) {

    let ConjugationProviders = {};
    let DefinitionProviders = {};
    let ExampleProviders = {};
    let EtymologyProviders = {};

    // Check to see if the language has any supported conjugation providers
    if (props.language in props.supportedConfigs.ConjugationProviders) {
        ConjugationProviders = props.supportedConfigs.ConjugationProviders[props.language]
    }

    // Check to see if the language has any supported definition providers
    if (props.language in props.supportedConfigs.DefinitionProviders) {
        DefinitionProviders = props.supportedConfigs.DefinitionProviders[props.language]
    }

    // Check to see if the language has any supported example providers
    if (props.language in props.supportedConfigs.ExampleProviders) {
        ExampleProviders = props.supportedConfigs.ExampleProviders[props.language]
    }

    // Check to see if the language has any supported etymology providers
    if (props.language in props.supportedConfigs.EtymologyProviders) {
        EtymologyProviders = props.supportedConfigs.EtymologyProviders[props.language]
    }



    // render the component collection
    return(
        <div>
            {
                Object.keys(ConjugationProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={ConjugationProviders} 
                    providerType="Conjugation"/>
                    : null
            }
            {
                Object.keys(DefinitionProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={DefinitionProviders} 
                    providerType="Definition"/>
                    : null
            }
            {
                Object.keys(ExampleProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={ExampleProviders} 
                    providerType="Example"/>
                    : null
            }
            {
                Object.keys(EtymologyProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={EtymologyProviders} 
                    providerType="Etymology"/>
                    : null
            }
        </div>
    );
};