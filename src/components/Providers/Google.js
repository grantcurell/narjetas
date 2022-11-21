import ReactHtmlParser from 'react-html-parser';

export const Google = {
    definitionProviders: {
        nb: nbGetGoogleDefinition
    },
    exampleProviders: {},
    conjugationProviders: {},
    etymologyProviders: {},
    otherInfoProvider: {},
    capabilities: {},
    options: {},
    name: "Google"
}

// Norwegian providers
async function nbGetGoogleDefinition(searchWord) {

    console.info(`INFO: nbGetGoogleDefinition: Processing word ${searchWord}`);

    const uri = encodeURIComponent(`https://translate.google.com/?sl=no&tl=en&text=${searchWord}&op=translate`);
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://192.168.1.15:8081/geturlwithclass/${uri}/ryNqvb`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("ryNqvb");
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }

                    htmlString = 'Google Translate: ' + htmlString + '<br />';
    
                    resolve(ReactHtmlParser (htmlString));
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
