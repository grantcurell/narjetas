import {useEffect, useState} from "react";

export function Provider(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Register an event handler such that when someone clicks the button
    // "Lookup Word" in lookup word that this component takes action
    useEffect(() => {
        props.onClickHandlers.push(() => {
            props.providerFunc("elske", setData, setError, setIsLoading);
        });
        return () => {
            //alert("component is being removed from the DOM");
            // TODO - should I do something here?
        };
    }, []);

    return(
        <div>
            { data || isLoading || error ? <h2>{props.name}</h2> : null }
            { isLoading ? <span>Loading...</span> : null }
            { data ? <span>{data}</span> : null }
            { error ? <span>{error}</span>: error}
        </div>
    );
}