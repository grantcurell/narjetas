import React from 'react';
import {useState} from "react";
import LookupWord from '../LookupWord/LookupWord';
import { Mutex } from 'async-mutex';
import Download from '../Download/Download'

export default function Flashcards(props) {

    //let wordListArray = []; // Used for processing the words - this is wordList
                            // convert to an array
    const [wordToProcess, setWordToProcess] = useState();
    const [wordList, setWordList] = useState('');
    const [htmlText, setHtmlText] = useState('');
    const [toggle, setToggle] = useState(true);
    const [readyToDownload, setReadyToDownload] = useState(false);
    const mutex = new Mutex();

    function handleFlashcardComplete(newFlashcardData, word) {

        // We use a mutex here to avoid the race condition where multiple
        // providers in Lookupword could trigger a completion at the same time
        mutex
        .acquire()
        .then(function(release) {
            if (!(word in props.getFlashcardData())) {
                // Deep copy the data when we add it otherwise it will get deleted
                props.addFlashcardData(word, JSON.parse(JSON.stringify(newFlashcardData)))
                if (props.getWordList().length === 1) {
                    setToggle(false);
                    createFile();
                } else {
                    setWordToProcess(props.removeFromWordList(word));
                }
            } 
            release();
        });
    }

    function handleKeys(event) {
        setWordList(event.target.value);
        props.setWordList(event.target.value.split('\n').map(word => word.trim()));
    }

    function handleToggle() {
        console.info("INFO: Beginning processing of the flashcards!")
        setWordToProcess(props.getWordList()[0]);
    }
      

    function createFile() {

        const delimiter = '\\';
        let outputString = '';

        Object.entries(props.getFlashcardData()).forEach(flashcard => {
            outputString += flashcard[0];
            outputString += delimiter;
            Object.entries(flashcard[1]['Definition']).map(definition => {
                outputString += definition[1]['html'].replace(delimiter, '').replace(/\n/g, '').replace(/\\n/g, '');
            })
            outputString += delimiter;
            Object.entries(flashcard[1]['Conjugation']).map(conjugation => {
                outputString += conjugation[1]['html'].replace(delimiter, '').replace(/\n/g, '').replace(/\\n/g, '');
            })
            outputString += delimiter;
            Object.entries(flashcard[1]['Etymology']).map(etymology => {
                outputString += etymology[1]['html'].replace(delimiter, '').replace(/\n/g, '').replace(/\\n/g, '');
            })
            outputString += delimiter;
            Object.entries(flashcard[1]['Example']).map(example => {
                outputString += example[1]['html'].replace(delimiter, '').replace(/\n/g, '').replace(/\\n/g, '');
            })
            outputString = outputString
            outputString += '\n';
        });

        setHtmlText(outputString);
        setReadyToDownload(true);

    }
    
    return (
        <div>
            {!readyToDownload && setToggle?
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
            : null}
            {readyToDownload ? <Download text={htmlText}/> : null}
        </div>
    )
};