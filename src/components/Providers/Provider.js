import React from 'react';
import { useState, useEffect } from "react";
import '../../styles/styles.css'

export default function Provider(props) {

    const [checked, setChecked] = useState([Object.entries(props.Providers)]);
    const [toggled, setToggle] = useState();

    // Register an event handler such that when someone clicks the button
    // "Lookup Word" in lookup word that this component takes action
    // TODO - we need to untoggle for the next word
    useEffect(() => {
        props.onClickHandlers.push(() => {
            setToggle(true); // TODO INVESTIGATE THIS WARNING
            /*
            TODO
            1. Check which providers are checked
            2. Render them based on what is checked
            */
            //Object.entries(props.Providers).forEach(

            //);
        });
        return () => {
          //alert("component is being removed from the DOM");
        };
    }, []); 

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    // If there are any checked items then print them
    var checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
        })
    : "";

    const addItem = (item) => {

        // setCart is the state setter
        // and it will tell the component to update its state.
        // Via the magic that is the totality of Javascript, it
        // will magically receive the previous state to this function
        // We then use spread syntax to expand the previous array
        // and add it with the item.
        setCart((prev) => {
            return [item, ...prev];
        });
    };

    // This removes the item at some set index.
    const removeItem = (targetIndex) => {
        setCart((prev) => {
            return prev.filter((item, index) => index !== targetIndex);
        });
    };

    // TODO change the checkbox keys
    return (
        <div>
            <div className="checkList">
                <div className="title">{props.providerType} Providers:</div>
                <div className="list-container">
                    {Object.entries(props.Providers).map((item, index) => (
                        <div key={index}>
                            <input value={item} type="checkbox" onChange={handleCheck} defaultChecked={true}/>
                            <span className={isChecked(item)}>{item[0]}</span>
                        </div>
                    ))}
                </div>
                <div>
                    {`Items checked are: ${checkedItems}`}
                </div>
            </div>
            {Object.entries(props.Providers).map((item, index) => (
                <li onClick={() => removeItem(index)} key={index}>
                    {item}
                </li>
            ))}
        </div>
      );
};