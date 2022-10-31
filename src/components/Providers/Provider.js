import {useEffect, useState} from "react";

export function Provider(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const handlerFunc = (word) => {
        alert("hello");
        //props.providerFunc(word, setData, setError, setIsLoading);
    }

    // Register an event handler such that when someone clicks the button
    // "Lookup Word" in lookup word that this component takes action>. When
    // the component is unmounted remove the handler function from the list.
    useEffect(() => {
        console.debug(`Adding handler for ${props.name}`)
        props.addOnClickHandler(handlerFunc);
        return () => {
            console.debug(`Removing handler for ${props.name}`)
            props.removeOnClickHandler(handlerFunc);
        };
    }, []);

    // Handle the data differently based on the type of component we are rendering
    let handleData;
    if (props.providerType === "Conjugation") {
        // TODO - Need to finish conjugation parsing
        // See https://github.com/grantcurell/narjetas/issues/2
        handleData = (data) => {
            return data.get('weblink');
        };
    } else if (props.providerType === "Example") {
        // TODO - Need to finish example parsing
        handleData = (data) => {
            return data.get('weblink');
        };
    } else if (props.providerType === "Definition") {
        // TODO - Need to finish definition parsing
        handleData = (data) => {
            return data;
        };
    } else if (props.providerType === "Etymology") {
        // TODO - Need to finish etymology parsing
        // See https://github.com/grantcurell/narjetas/issues/3
        handleData = (data) => {
            return data;
        };
    }

    return(
        <div>
            { data || isLoading || error ? <h2>{props.name}</h2> : null }
            { isLoading ? <span>Loading...</span> : null }
            { data ? <span>{handleData(data)}</span> : null }
            { error ? <span>{error}</span>: error}
        </div>
    );
}