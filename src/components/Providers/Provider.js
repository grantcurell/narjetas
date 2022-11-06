import {useEffect, useState} from "react";
import * as ReactDOMServer from 'react-dom/server';

export function Provider(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    /**
     * This handler function is called when someone clicks search for word or
     * produces some output. It also takes the following arguments:
     * setData: Set the displayed data for the component
     * setError: If there is a failure, set the error message for the component
     * setIsLoading: Write leading while the function is loading the data
     * @param word The word for which we are going to search.
     */
    const handlerFunc = (word) => {
        try {
            setIsLoading(true);
            props.providerFunc(word, setData, setIsLoading).then(data => {
                setData(data);
                setIsLoading(false);
                props.completionHandler(props.name, props.providerType, ReactDOMServer.renderToStaticMarkup(data));
            });
        } catch (e) {
            setError(e);
            setIsLoading(false);
            throw e;
        }
    }

    // Register an event handler such that when someone clicks the button
    // "Lookup Word" in lookup word that this component takes action>. When
    // the component is unmounted remove the handler function from the list.
    useEffect(() => {
        console.debug(`DEBUG: Adding handler for ${props.name}`)
        props.addOnClickHandler(handlerFunc, props.name, props.providerType);
        return () => {
            console.debug(`DEBUG: Removing handler for ${props.name}`)
            props.removeOnClickHandler(handlerFunc, props.name, props.providerType);
        };
    }, []);

    return(
        <div>
            { data || isLoading || error ? <h2>{props.name}</h2> : null }
            { isLoading ? <span>Loading...</span> : null }
            { data ? <div>{data}</div> : null }
            { error ? <span>{error}</span>: error}
        </div>
    );
}