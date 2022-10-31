import React from 'react';
import { useState } from "react";
import '../../styles/styles.css'
import {Provider} from "./Provider";

export default function ProviderContainer(props) {

    const [checked, setChecked] = useState(Object.keys(props.Providers).map((key) => {
        return `${key}_${props.providerType}`
    }));

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    /**
     * Used to style checkboxes based on whether they are checked or not
     * @param {string} item The name of the provider
     * @returns {string} Returns a string of 'checked-item' if it is checked
     * otherwise it returns 'not-checked-item'
     */
    const drawIsChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    /**
     * Used to maintain a list of all the checked items
     * @returns {string} The reduce array function takes an array and reduces it
     * to a single value. In this case it takes the array of checked items,
     * checked, and then reduces it to a comma separated string of all the
     * checked items
     */
    let checkedItems = checked.length ? checked.reduce((total, item) => {
        return total + ", " + item;
        })
    : "";

    // TODO change the checkbox keys
    return (
        <div>
            <div className="checkList">
                <div className="title">{props.providerType} Providers:</div>
                <div className="list-container">
                    {Object.entries(props.Providers).map((item, index) => (
                        <div>
                            <input 
                                key={`${item[0]}_${props.providerType}_${index}`} 
                                value={`${item[0]}_${props.providerType}`} 
                                type="checkbox" 
                                onChange={handleCheck} 
                                defaultChecked={true}
                            />
                            <span className={drawIsChecked(`${item[0]}_${props.providerType}`)}>{item[0]}</span>
                        </div>
                    ))}
                </div>
                <div>
                    {`Items checked are: ${checkedItems}`}
                </div>
            </div>

            <div > {
                Object.entries(props.Providers).map((provider, index) => {
                        if (checked.includes(`${provider[0]}_${props.providerType}`)) {
                            return <Provider
                            key={provider[0]+`_${props.providerType}`}
                            setOnClickHandlers={props.setOnClickHandlers}
                            name={provider[0]}
                            providerType={props.providerType}
                            providerFunc={provider[1]}/>
                        }
                        return null;
                    }
                )
            }
            </div>
        </div>
      );
};