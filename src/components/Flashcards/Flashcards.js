import React from 'react';
import {useState} from "react";
import LookupWord from '../LookupWord/LookupWord';
import { Mutex } from 'async-mutex';

export default function Flashcards(props) {

    //let wordListArray = []; // Used for processing the words - this is wordList
                            // convert to an array
    const [wordToProcess, setWordToProcess] = useState();
    const [wordList, setWordList] = useState('');
    const [wordListArray, setWordListArray] = useState([]);
    const [toggle, handleToggle] = useState(false);
    const mutex = new Mutex();
    let flashcardData = {};

    function handleFlashcardComplete(newFlashcardData) {

        // We use a mutex here to avoid the race condition where multiple
        // providers in Lookupword could trigger a completion at the same time
        mutex
        .acquire()
        .then(function(release) {      
            setWordListArray(prev => {
                if (!(prev[0] in flashcardData)) {
                    flashcardData[prev[0]] = newFlashcardData;
                    if (prev.length === 1) {
                        handleToggle(false);
                    }
                    return prev.filter(word => word !== prev[0]);
                } else {
                    return prev;
                }
            });
            release();
        });
    }

    function handleKeys(event) {
        const newWordList = event.target.value;
        setWordList(newWordList);
        setWordListArray(prev => {
            return [...newWordList.split('\n').map(word => word.trim())];
        }) 
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
            {toggle ? <h1>Currently processing {wordListArray[0]}</h1> : null}
            {toggle ? <LookupWord language={props.language} 
                supportedConfigs={props.supportedConfigs} 
                flashcardMode={true} 
                word={wordListArray[0]}
                handleFlashcardComplete={handleFlashcardComplete}/>
            : null }
        </div>
    )
};