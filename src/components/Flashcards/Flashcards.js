import React from 'react';
import ProviderContainer from "../Providers/ProviderContainer";
import {useState} from "react";
import LookupWord from '../LookupWord/LookupWord';

export default function Flashcards(props) {

    const [wordList, setWordList] = useState('');
    const [flashcards, setFlashcards] = useState({});

    function handleChange(event) {
        //handler   
    }
    
    return (
        <div>
            <textarea name="body"
                onChange={(event) => {
                    setWordList(event.target.value);
                }}
                value={wordList}/>
                <LookupWord language={props.language} 
                supportedConfigs={props.supportedConfigs} 
                flashcardMode={true} 
                word="elske"/>
        </div>
    )
};