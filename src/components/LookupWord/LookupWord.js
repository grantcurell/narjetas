import React from 'react';
import ProviderContainer from "../Providers/ProviderContainer";
import {useState} from "react";

export default function LookupWord(props) {

    const [word, setWord] = useState(props.word);

    // This will contain a list of all the handlers for Lookup Word click from
    // the child providers
    const [onClickHandlers, setOnClickHandlers] = useState([]);

    // This is used when making flashcards. As providers finish processing
    // data for the flashcard they use this to notify LookupWord
    const [conjugationCompletionStatus, setConjugationCompletionStatus] = useState({});
    const [definitionCompletionStatus, setDefinitionCompletionStatus] = useState({});
    const [exampleCompletionStatus, setExampleCompletionStatus] = useState({});
    const [etymologyCompletionStatus, setEtymologyCompletionStatus] = useState({});

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

    const addOnClickHandler = (handler, providerName, providerType) => {
        setOnClickHandlers((prev) => {
            return [handler, ...prev];
        });
        
        // Add the completion handler for flashcards
        if (providerType === "Definition") {
            setDefinitionCompletionStatus((prev) => {
                return {[providerName]: {isComplete: false, html: null}, ...prev};
            });
        } else if (providerType === "Conjugation") {
            setConjugationCompletionStatus((prev) => {
                return {[providerName]: {isComplete: false, html: null}, ...prev};
            });
        } else if (providerType === "Example") {
            setExampleCompletionStatus((prev) => {
                return {[providerName]: {isComplete: false, html: null}, ...prev};
            });
        } else if (providerType === "Etymology") {
            setEtymologyCompletionStatus((prev) => {
                return {[providerName]: {isComplete: false, html: null}, ...prev};
            });
        }
    };

    const removeOnClickHandler = (handler, providerName, providerType) => {
        setOnClickHandlers((prev) => {
            return prev.filter((prevHandler) => handler !== prevHandler);
       });
       //onClickHandlers.pop(handler);
       console.debug(`DEBUG: Handler list after remove is ${onClickHandlers}`);

        // Add the completion handler for flashcards
        if (providerType === "Definition") {
            setDefinitionCompletionStatus((prev) => {
                return Object.keys(prev)
                    .filter((key) => key.includes(providerName))
                    .reduce((obj, key) => {
                        return Object.assign(obj, {
                        [key]: prev[key]
                        });
                }, {});
            });
        } else if (providerType === "Conjugation") {
            setConjugationCompletionStatus((prev) => {
                return Object.keys(prev)
                    .filter((key) => key.includes(providerName))
                    .reduce((obj, key) => {
                        return Object.assign(obj, {
                        [key]: prev[key]
                        });
                }, {});
            });
        } else if (providerType === "Example") {
            setExampleCompletionStatus((prev) => {
                return Object.keys(prev)
                    .filter((key) => key.includes(providerName))
                    .reduce((obj, key) => {
                        return Object.assign(obj, {
                        [key]: prev[key]
                        });
                }, {});
            });
        } else if (providerType === "Etymology") {
            setEtymologyCompletionStatus((prev) => {
                return Object.keys(prev)
                    .filter((key) => key.includes(providerName))
                    .reduce((obj, key) => {
                        return Object.assign(obj, {
                        [key]: prev[key]
                        });
                }, {});
            });
        }
     };

     function completionHandler(providerName, providerType, html) {

        // Add the completion handler for flashcards
        if (providerType === "Definition") {
            setDefinitionCompletionStatus((prev) => {
                console.debug(definitionCompletionStatus);
                return {[providerName]: {isComplete: true, html: html}, ...prev};
            });
        } else if (providerType === "Conjugation") {
            setConjugationCompletionStatus((prev) => {
                console.debug(conjugationCompletionStatus);
                return {[providerName]: {isComplete: true, html: html}, ...prev};
            });
        } else if (providerType === "Example") {
            setExampleCompletionStatus((prev) => {
                console.debug(exampleCompletionStatus);
                return {[providerName]: {isComplete: true, html: html}, ...prev};
            });
        } else if (providerType === "Etymology") {
            setEtymologyCompletionStatus((prev) => {
                console.debug(etymologyCompletionStatus);
                return {[providerName]: {isComplete: true, html: html}, ...prev};
            });
        }

        console.log(conjugationCompletionStatus);

        Object.entries(conjugationCompletionStatus).filter(conjugation => {
            console.log("FUCK JAVASCRIPT")
            return !conjugation.isComplete
        })

        if (null) {
            console.log("Conjugations complete")
            console.log(conjugationCompletionStatus.toString());
        }
     }

     // This is used mainly for creating flashcards. If LookupWord is passed
     // a prop then it will automatically begin the lookup rather than waiting
     if (props.flashcardMode) {
        onClickHandlers.forEach((callbackFunction) => {
            callbackFunction(word);
        });
     }

    // render the component collection
    return(
        <div>
            {
                Object.keys(ConjugationProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={ConjugationProviders}
                                       providerType="Conjugation"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}
                                       completionHandler={completionHandler}/>
                    : null
            }
            {
                Object.keys(DefinitionProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={DefinitionProviders}
                                       providerType="Definition"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}
                                       completionHandler={completionHandler}/>
                    : null
            }
            {
                Object.keys(ExampleProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={ExampleProviders}
                                       providerType="Example"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}
                                       completionHandler={completionHandler}/>
                    : null
            }
            {
                Object.keys(EtymologyProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={EtymologyProviders}
                                       providerType="Etymology"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}
                                       completionHandler={completionHandler}/>
                    : null
            }
            { // Only render the lookup word button if at least one provider
              // is available and if we are not in flashcard mode
                !props.flashcardMode &&
                (Object.keys(ConjugationProviders).length > 0 ||
                Object.keys(DefinitionProviders).length > 0 ||
                Object.keys(ExampleProviders).length > 0 ||
                Object.keys(EtymologyProviders).length > 0) ?
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