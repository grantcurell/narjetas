import React from 'react';
import {useState} from "react";
import LookupWord from '../LookupWord/LookupWord';
import { Mutex } from 'async-mutex';

export default function Flashcards(props) {

    //let wordListArray = []; // Used for processing the words - this is wordList
                            // convert to an array
    const [wordToProcess, setWordToProcess] = useState();
    const [wordList, setWordList] = useState('');
    const [toggle, setToggle] = useState(false);
    const mutex = new Mutex();
    let flashcardData = {};

    function handleFlashcardComplete(newFlashcardData, word) {

        // We use a mutex here to avoid the race condition where multiple
        // providers in Lookupword could trigger a completion at the same time
        mutex
        .acquire()
        .then(function(release) {
            if (!(word in flashcardData)) {
                flashcardData[word] = newFlashcardData;
                if (props.getWordList().length === 1) {
                    setToggle(false);
                    createFile();
                }
                setWordToProcess(props.removeFromWordList(word));
            } 
            release();
        });
    }

    function handleKeys(event) {
        setWordList(event.target.value);
        props.setWordList(event.target.value.split('\n').map(word => word.trim()));
    }

    function handleToggle() {
        setWordToProcess(props.getWordList()[0]);
        setToggle(true);
    }

    /*
    function download(filename, text) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }*/
      

    function createFile() {
        /*
            logging.info("Outputting " + word["final_traditional"])
            output_file.write(word["final_traditional"] + delimiter + word["simplified"] + delimiter + word["pinyin"] +
                                delimiter + "<br>".join(word["defs"]).replace(delimiter, "") +
                                delimiter + word["hsk"].replace(" ", "") + delimiter +
                                word["history"].replace(delimiter, "") + delimiter)

            for character in word["characters"]:
                output_file.write(character.replace('\n', "").replace(delimiter, ""))

            try:
                line = examples[word["final_traditional"]].replace('\n', "") + "\n"
            except KeyError:
                logging.debug("No examples found for word_to_process: " + word["final_traditional"])
        */

        const delimiter = '\\';
        let outputString = '';

        Object.entries(flashcardData).forEach(flashcard => {
            console.log("HERE");
            Object.entries(flashcard[1]['Definition']).map(definition => {
                outputString += definition[1]['html'].replace(delimiter, '');
            })
            outputString += delimiter;
            Object.entries(flashcard[1]['Conjugation']).map(conjugation => {
                outputString += conjugation[1]['html'].replace(delimiter, '');
            })
            outputString += delimiter;
            Object.entries(flashcard[1]['Etymology']).map(etymology => {
                outputString += etymology[1]['html'].replace(delimiter, '');
            })
            outputString += delimiter;
            Object.entries(flashcard[1]['Example']).map(example => {
                outputString += example[1]['html'].replace(delimiter, '');
            })
            outputString += '\n';
        });



    }
    
    return (
        <div>
            <textarea name="body"
                onChange={handleKeys}
                value={wordList}/>
            { wordList !== '' ? // Don't render the button without the wordList being populated
            <div>
                <button onClick={handleToggle}>Create Flashcards</button>
            </div>
            : null}
            {toggle ? <h1>Currently processing {wordToProcess}</h1> : null}
            <LookupWord language={props.language} 
                supportedConfigs={props.supportedConfigs} 
                flashcardMode={true} 
                word={wordToProcess}
                key={wordToProcess}
                handleFlashcardComplete={handleFlashcardComplete}/>
        </div>
    )
};