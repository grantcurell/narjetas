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
    const conjugationCompletionStatus = {};
    const definitionCompletionStatus = {};
    const exampleCompletionStatus = {};
    const etymologyCompletionStatus = {};

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
            definitionCompletionStatus[providerName] = {isComplete: false, html: null};
        } else if (providerType === "Conjugation") {
            conjugationCompletionStatus[providerName] = {isComplete: false, html: null};
        } else if (providerType === "Example") {
            exampleCompletionStatus[providerName] = {isComplete: false, html: null};
        } else if (providerType === "Etymology") {
            etymologyCompletionStatus[providerName] = {isComplete: false, html: null};
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
            delete definitionCompletionStatus[providerName];
        } else if (providerType === "Conjugation") {
            delete conjugationCompletionStatus[providerName];
        } else if (providerType === "Example") {
            delete exampleCompletionStatus[providerName];
        } else if (providerType === "Etymology") {
            delete etymologyCompletionStatus[providerName];
        }
     };

     /**
      * This is here for flashcard mode to alert the upper level that all providers
      * have completed
      * @param {string} providerName The name of the provider Verbix etc
      * @param {string} providerType This will be Conjugation, Definition, Example, or Etymology
      * @param {string} html The html that we will output to the flashcard
      */
     function completionHandler(providerName, providerType, html) {

        
        if (props.flashcardMode) {
            // Add the completion handler for flashcards
            if (providerType === "Definition") {
                definitionCompletionStatus[providerName]['isComplete'] = true;
                definitionCompletionStatus[providerName]['html'] = html;
            } else if (providerType === "Conjugation") {
                conjugationCompletionStatus[providerName]['isComplete'] = true;
                conjugationCompletionStatus[providerName]['html'] = html;
            } else if (providerType === "Example") {
                exampleCompletionStatus[providerName]['isComplete'] = true;
                exampleCompletionStatus[providerName]['html'] = html;
            } else if (providerType === "Etymology") {
                etymologyCompletionStatus[providerName]['isComplete'] = true;
                etymologyCompletionStatus[providerName]['html'] = html;
            }

            console.debug(`DEBUG: conjugationCompletionStatus: ${conjugationCompletionStatus}`);

            // This tests to see if all the conjugations are complete
            const conjugationsFinished = Object.entries(conjugationCompletionStatus).filter(conjugation => {
                return !conjugation[1].isComplete
            }).length === 0;

            // This tests to see if all the definitions are complete
            const definitionsFinished = Object.entries(definitionCompletionStatus).filter(definition => {
                return !definition[1].isComplete
            }).length === 0;

            // This tests to see if all the examples are complete
            const examplesFinished = Object.entries(exampleCompletionStatus).filter(example => {
                return !example[1].isComplete
            }).length === 0;

            // This tests to see if all the etymologies are complete
            const etymologiesFinished = Object.entries(exampleCompletionStatus).filter(etymology => {
                return !etymology[1].isComplete
            }).length === 0;

            // TODO https://github.com/grantcurell/narjetas/issues/18
            setTimeout(() => {
                if (conjugationsFinished && examplesFinished && definitionsFinished && etymologiesFinished) {
                    console.info(`INFO: Processing for ${props.word} complete. Returning`);
                    props.handleFlashcardComplete({
                        Conjugation: conjugationCompletionStatus,
                        Definition: definitionCompletionStatus,
                        Example: exampleCompletionStatus,
                        Etymology: etymologyCompletionStatus
                    }, props.word)
                }
            }, 1000);
        }

     }

     // This is used mainly for creating flashcards. If LookupWord is passed
     // a prop then it will automatically begin the lookup rather than waiting
     if (props.flashcardMode && props.word) {
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
                                       completionHandler={completionHandler}
                                       flashcardMode={props.flashcardMode}/>
                    : null
            }
            {
                Object.keys(DefinitionProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={DefinitionProviders}
                                       providerType="Definition"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}
                                       completionHandler={completionHandler}
                                       flashcardMode={props.flashcardMode}/>
                    : null
            }
            {
                Object.keys(ExampleProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={ExampleProviders}
                                       providerType="Example"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}
                                       completionHandler={completionHandler}
                                       flashcardMode={props.flashcardMode}/>
                    : null
            }
            {
                Object.keys(EtymologyProviders).length > 0 ?
                    <ProviderContainer language={props.language}
                                       Providers={EtymologyProviders}
                                       providerType="Etymology"
                                       addOnClickHandler={addOnClickHandler}
                                       removeOnClickHandler={removeOnClickHandler}
                                       completionHandler={completionHandler}
                                       flashcardMode={props.flashcardMode}/>
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