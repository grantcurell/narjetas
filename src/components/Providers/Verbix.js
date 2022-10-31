
export const Verbix = {
    definitionProviders: {},
    exampleProviders: {
        nb: nbGetVerbixExample
    },
    conjugationProviders: {
        nb: nbGetVerbixConjugation
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
function nbGetVerbixExample() {
    return(
        <h1>Example Hello</h1>
    );
}

async function nbGetVerbixConjugation(data, setData, setError, setIsLoading, options = {}) {
    try {
        const response = await fetch('https://www.verbix.com/webverbix/go.php?&D1=25&T1=elske', options);
        const responseData = await response.json();
    
        // add transformers here if needed
    
        setData(responseData);
        setIsLoading(false);

    } catch (e) {
        setError(e);
        setIsLoading(false);
    }
};