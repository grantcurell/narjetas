import React from 'react';
import { useState } from "react";
import '../../styles/styles.css'
import {Provider} from "./Provider";

export default function ProviderContainer(props) {

    const [checked, setChecked] = useState([Object.keys(props.Providers)]);

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

    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    // If there are any checked items then print them
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
                            <input key={index} value={`${item[0]}_${props.providerType}`} type="checkbox" onChange={handleCheck} defaultChecked={true}/>
                            <span className={isChecked(`${item[0]}_${props.providerType}`)}>{item[0]}</span>
                        </div>
                    ))}
                </div>
                <div>
                    {`Items checked are: ${checkedItems}`}
                </div>
            </div>

            <div > {
                Object.entries(props.Providers).map((provider, index) => {
                        if (isChecked(`${provider}_${props.providerType}`)) {
                            return <Provider
                            key={provider[0]+`_${props.providerType}`}
                            onClickHandlers={props.onClickHandlers}
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