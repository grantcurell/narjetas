import React from 'react';
import ConjugationContainer from "../Word/Conjugation/ConjugationContainer"; 

export default function LookupWord(props) {

    let ConjugationProviders = [];
    let DefinitionProviders = [];
    let ExampleProviders = [];
    let EtymologyProviders = [];

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
            <ConjugationContainer language={props.language} ConjugationProviders={ConjugationProviders}/>
        </div>
    );
};