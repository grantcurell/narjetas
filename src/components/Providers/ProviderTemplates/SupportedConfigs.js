import * as Conjugations from "./Conjugations/Conjugations";
import * as Definitions from "./Definitions/Definitions";
import * as Examples from "./Examples/Examples";


export function getSupportedConfigs() {

    // Get a list of all supported configurations
    const conjugations = Object.keys(Conjugations);
    {conjugations.map(conjugation => {
        // TODO need to use this
        if ( typeof conjugation === 'function' ) {  
        }

        
    })}

    return("balls");

};