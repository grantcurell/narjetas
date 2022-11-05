import React from 'react';
import ProviderContainer from "../Providers/ProviderContainer";
import {useState} from "react";

export default function LookupWord(props) {

    const [word, setWord] = useState(props.word);

    // This will contain a list of all the handlers for Lookup Word click from
    // the child providers
    const [onClickHandlers, setOnClickHandlers] = useState([]);

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
        console.info(`INFO: Looking up the word ${word}`);
        console.info(`INFO: Top level onClickHandlers are ${onClickHandlers}`);
        onClickHandlers.forEach((callbackFunction) => {
            callbackFunction(word);
        });
    };

    const addOnClickHandler = (handler) => {
        setOnClickHandlers((prev) => {
            return [handler, ...prev];
        });
    };

    const removeOnClickHandler = (handler) => {
        setOnClickHandlers((prev) => {
            return prev.filter((prevHandler) => handler !== prevHandler);
       });
       onClickHandlers.pop(handler);
       console.debug(`DEBUG: Handler list after remove is ${onClickHandlers}`);
     };

    // render the component collection
    return(
        <div>
            {
                Object.keys(ConjugationProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={ConjugationProviders}
                                       providerType="Conjugation"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}/>
                    : null
            }
            {
                Object.keys(DefinitionProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={DefinitionProviders}
                                       providerType="Definition"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}/>
                    : null
            }
            {
                Object.keys(ExampleProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={ExampleProviders}
                                       providerType="Example"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}/>
                    : null
            }
            {
                Object.keys(EtymologyProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={EtymologyProviders}
                                       providerType="Etymology"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}/>
                    : null
            }
            { // Only render the lookup word button if at least one provider
              // is available
                Object.keys(ConjugationProviders).length > 0 ||
                Object.keys(DefinitionProviders).length > 0 ||
                Object.keys(ExampleProviders).length > 0 ||
                Object.keys(EtymologyProviders).length > 0 ?
                    <div>
                        <label htmlFor='word'>Word: </label>
                        <input id='word' 
                        value={word} 
                        onChange={(event) => {
                            setWord(event.target.value);
                            console.debug(`DEBUG: The onClickHandlers are ${onClickHandlers}`);
                            }} />
                        <button onClick={handleClick}>Lookup Word</button>
                    </div>
                    : null
            }
        </div>
    );
};