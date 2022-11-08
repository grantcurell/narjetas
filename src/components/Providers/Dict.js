import ReactHtmlParser from 'react-html-parser';

export const Dict = {
    definitionProviders: {
        nb: nbGetDictDefinition
    },
    exampleProviders: {},
    conjugationProviders: {},
    etymologyProviders: {},
    otherInfoProvider: {},
    capabilities: {},
    options: {},
    name: "Dict"
}

// Norwegian providers
async function nbGetDictDefinition(searchWord) {

    console.info(`INFO: nbGetDictDefinition: Processing word ${searchWord}`);

    const uri = encodeURIComponent(`https://www.dict.com/norwegian-english/${searchWord}`);
    let responsePromise = new Promise((resolve, reject) => {
    
        fetch(`http://localhost:8081/geturlwithid/${uri}/mycol-center`).then(response => {
            if (response.status==200) {
                responsePromise = response.text().then(text => {

                    // This is a hack workaround. I don't have a clean way to
                    // get an ID in the dummyDOM so I'm effectively creating a
                    // class here by replacing a target ID
                    text = text.replace('class="col-md-7 col-sm-7 col-xs-10 nphi"', 
                    'class=imrighthere col-md-7 col-sm-7 col-xs-10 nphi');

                    let dummyDOM = document.createElement( 'html' );
                    dummyDOM.innerHTML = text;
                    const html = dummyDOM.getElementsByClassName("imrighthere");

                    // Remove Google ads
                    Object.entries(dummyDOM.getElementsByClassName("adsbygoogle")).forEach((adbygoogle) => {
                        adbygoogle[1].remove();
                    })
    
                    let htmlString = "";
                    for (let i = 0; i < html.length ; i++) {
                        htmlString += html[i].outerHTML;
                    }
    
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
