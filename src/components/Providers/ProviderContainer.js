import React from 'react';
import { useState, useEffect } from "react";
import '../../styles/styles.css'

export default function ProviderContainer(props) {

    const [checked, setChecked] = useState([Object.entries(props.Providers)]);

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
    let checkedItems = checked.length
    ? checked.reduce((total, item) => {
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

            <div > {
                Object.entries(props.Providers).map((Provider, index) => {
                        const Component = Provider[1];
                        return <Component key={Provider[0]+`_${props.providerType}`} onClickHandlers={props.onClickHandlers} name={Provider[0]}/>
                    }
                )
            }
            </div>
        </div>
      );
};