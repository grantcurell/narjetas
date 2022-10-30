import callApi from "../../library_code/callApi";
import { useState } from "react";

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

}

function NbConjugationProvider() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    callApi(
        isLoading,
        setIsLoading,
        getVerbix,
        data,
        setData,
        error,
        setError
    );

    return(
        <h1>Hello</h1>
    );
}