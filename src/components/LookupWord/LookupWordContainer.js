import React from 'react';
import ConjugationContainer from "../Word/Conjugation/ConjugationContainer"; 

export default function LookupWordContainer(props) {



    // render the component collection
    return(
        <div>
            <ConjugationContainer language={props.language} />
        </div>
    );
};