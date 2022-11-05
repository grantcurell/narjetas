import ReactHtmlParser from 'react-html-parser';

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
    capabilities: {},
    options: {
        // TODO - do I want to keep this?
        language: 25, // Defines the language that Verbix will use. I know 25 is Norwegian and 20 is English.
    },
    name: "Verbix"
}

// Norwegian providers
async function nbGetVerbixExample(searchWord) {
    const uri = encodeURIComponent(`https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`);
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/geturl/${uri}`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    // TODO - this is a hack because I couldn't get getElementById to work
                    // see https://github.com/grantcurell/narjetas/issues/7
                    text = text.replace('id="samplesentences"', 'class=samplesentencesspecial');
                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("samplesentencesspecial");
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }
    
                    if (htmlString === "") {
                        resolve("No results found!");
                    } else {
                        resolve(ReactHtmlParser (htmlString));
                    }
                    
                });
            } else {
                // TODO - need to handle this better
                // https://github.com/grantcurell/narjetas/issues/8
                reject("There was an error.");
            }
        });
    });

    return responsePromise;
}

async function nbGetVerbixConjugation(searchWord) {
    return <span>{<a
    target="_blank"
    rel="noopener"
    href={`https://www.verbix.com/webverbix/go.php?&D1=25&T1=${searchWord}`}>Click here for the conjugation!</a>
    }</span>;
}