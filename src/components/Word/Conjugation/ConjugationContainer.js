
import React from 'react';
import Conjugation from "./Conjugation"; // required to use JSX

export default function ConjugationContainer(props) {

    // render the component collection
    return(
        <div>
            <Conjugation ConjugationProviders={props.ConjugationProviders}/>
        </div>
    );
};