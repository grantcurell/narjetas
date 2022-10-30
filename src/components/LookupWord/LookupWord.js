import React from 'react';
import Provider from "../Providers/Provider";

export default function LookupWord(props) {

    // This will contain a list of all the handlers for Lookup Word click from
    // the child providers
    const onClickHandlers = [];

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

    const handleClick = (event) => {
        onClickHandlers.forEach((callbackFunction) => {
            callbackFunction();
        });
    }

    // render the component collection
    return(
        <div>
            {
                Object.keys(ConjugationProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={ConjugationProviders} 
                    providerType="Conjugation"
                    onClickHandlers={onClickHandlers}/>
                    : null
            }
            {
                Object.keys(DefinitionProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={DefinitionProviders} 
                    providerType="Definition"
                    onClickHandlers={onClickHandlers}/>
                    : null
            }
            {
                Object.keys(ExampleProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={ExampleProviders} 
                    providerType="Example"
                    onClickHandlers={onClickHandlers}/>
                    : null
            }
            {
                Object.keys(EtymologyProviders).length > 0 ? 
                    <Provider language={props.language} 
                    Providers={EtymologyProviders} 
                    providerType="Etymology"
                    onClickHandlers={onClickHandlers}/>
                    : null
            }
            { // Only render the lookup word button if at least one provider
              // is available
                Object.keys(ConjugationProviders).length > 0 ||
                Object.keys(DefinitionProviders).length > 0 ||
                Object.keys(ExampleProviders).length > 0 ||
                Object.keys(EtymologyProviders).length > 0 ?
                    <button onClick={handleClick}>Lookup Word</button>
                    : null
            }
        </div>
    );
};