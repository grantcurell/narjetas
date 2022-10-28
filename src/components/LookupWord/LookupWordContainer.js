import React from 'react';
import ConjugationContainer from "../Word/Conjugation/ConjugationContainer"; // required to use JSX

export default function LookupWordContainer(props) {



    // render the component collection
    return(
        <div>
            <ConjugationContainer language={props.language} />
        </div>
    );
};