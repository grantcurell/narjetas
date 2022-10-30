import callApi from "../../library_code/callApi";
import { useState, useEffect } from "react";

const getVerbix = async (data, options) => {
    const response = await fetch('https://www.verbix.com/webverbix/go.php?&D1=25&T1=elske', {
        ...options,
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();

    // add transformers here if needed

    return responseData;
};
  
export const Verbix = {
    definitionProviders: {},
    exampleProviders: {
        nb: NbExampleProvider
    },
    conjugationProviders: {
        nb: NbConjugationProvider
    },
    etymologyProviders: {},
    otherInfoProvider: {},
    capabilities: {
        canReturnHtml: true
    },
    options: {
        language: 25, // Defines the language that Verbix will use. I know 25 is Norwegian and 20 is English.
    },
    name: "Verbix"
}

// Norwegian providers
function NbExampleProvider() {
    return(
        <h1>Example Hello</h1>
    );
}

function NbConjugationProvider(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Register an event handler such that when someone clicks the button
    // "Lookup Word" in lookup word that this component takes action
    // TODO - we need to untoggle for the next word
    useEffect(() => {
        props.onClickHandlers.push(() => {
            setData("Balls");
        });
        return () => {
          //alert("component is being removed from the DOM");
        };
    }, []); 

    /*
    callApi(
        isLoading,
        setIsLoading,
        getVerbix,
        data,
        setData,
        error,
        setError
    );*/

    return(
        <div>
            { data || isLoading ? <h2>{props.name}</h2> : null }
            { isLoading ? <span>Loading...</span> : null }
            { data ? <span>{data}</span> : null }
        </div>
    );
}