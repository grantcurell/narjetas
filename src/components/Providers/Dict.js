import ReactHtmlParser from 'react-html-parser';

export const Dict = {
    definitionProviders: {
        nb: nbGetDictDefinition
    },
    exampleProviders: {
        nb: nbGetDictExample
    },
    conjugationProviders: {},
    etymologyProviders: {},
    otherInfoProvider: {},
    capabilities: {},
    options: {},
    name: "Dict"
}

// Function to generate random number in an interval
function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 

// Norwegian providers
async function nbGetDictDefinition(searchWord) {

    console.info(`INFO: nbGetDictDefinition: Processing word ${searchWord}`);

    const uri = encodeURIComponent(`https://www.dict.com/norwegian-english/${searchWord}`);
    let responsePromise = new Promise((resolve, reject) => {
    
        setTimeout(() => fetch(`http://localhost:8081/geturlwithid/${uri}/entry-wrapper`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    // This is a hack workaround. I don't have a clean way to
                    // get an ID in the dummyDOM so I'm effectively creating a
                    // class here by replacing a target ID
                    text = text.replace('class="mcard mcardnone"', 
                    'class="imrighthere mcard mcardnone"');

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("lex_ful_tran");

                    /*
                    // Remove Google ads
                    Object.entries(dummyDOM.getElementsByClassName("adsbygoogle")).forEach((adbygoogle) => {
                        adbygoogle[1].remove();
                    })

                    Object.entries(dummyDOM.getElementsByClassName("head")).forEach((head) => {
                        head[1].remove();
                    })

                    Object.entries(dummyDOM.getElementsByClassName("lex_ful_samp2")).forEach((lex_ful_samp2) => {
                        lex_ful_samp2[1].remove();
                    })

                    Object.entries(dummyDOM.getElementsByClassName("lex_ful_coll2")).forEach((lex_ful_coll2) => {
                        lex_ful_coll2[1].remove();
                    })*/
    
                    let htmlString = "";   
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML + '<br />';
                    }

                    if (htmlString === "") {
                        resolve('');
                        console.info(`INFO: Dict definition: no results found for ${searchWord}`);
                    } else {
                        /*
                        if (htmlString.includes(searchWord)) {
                            // break the textblock into an array of lines
                            const lines = htmlString.split('\n');
                            // remove one line, starting at the first position
                            lines.filter((line) => {
                                if (line.includes(searchWord)) {
                                    return false;
                                }
                                return true;
                            })
                            // join the array back into a single string
                            htmlString = lines.join('\n');
                        }*/
                        htmlString.replace(searchWord, "");
                        resolve(ReactHtmlParser (htmlString));
                    }

                });
            } else {
                // TODO - need to handle this better
                // https://github.com/grantcurell/narjetas/issues/8
                reject("There was an error.");
            }
        }), randomNumber(2000, 5000));
    });

    return responsePromise;
}

async function nbGetDictExample(searchWord) {

    console.info(`INFO: nbGetDictExample: Processing word ${searchWord}`);

    const uri = encodeURIComponent(`https://www.dict.com/norwegian-english/${searchWord}`);
    let responsePromise = new Promise((resolve, reject) => {
    
        setTimeout(() => fetch(`http://localhost:8081/geturlwithid/${uri}/entry-wrapper`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    text = text.replace('lex_ful_coll2', 'imrighthere')
                               .replace('lex_ful_samp2', 'imrighthere');

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("imrighthere");
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML + '<br />';
                    }
    
                    if (htmlString === "") {
                        resolve('')
                        console.info(`INFO: Dict example: no results found for ${searchWord}`);
                    } else {
                        resolve(ReactHtmlParser (htmlString));
                    }
                });
            } else {
                // TODO - need to handle this better
                // https://github.com/grantcurell/narjetas/issues/8
                reject("There was an error.");
            }
        }), randomNumber(2000, 5000));
    });

    return responsePromise;
}
