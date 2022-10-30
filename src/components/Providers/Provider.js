

import React from 'react'; // required to use JSX
import { useState } from "react";
import '../../styles/styles.css'
  
const postTodo = async (data, options) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        ...options,
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();

    // add transformers here if needed

    return responseData;
};
  
export const usePostTodo = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = async (data, options = {}) => {
        try {
        setIsLoading(true);
        const todo = await postTodo(data, options);
        setData(todo);
        return todo;
        } catch (e) {
        setError(e);
        setIsLoading(false);
        throw e;
        }
    };

    return {
        isLoading,
        error,
        data,
        execute,
    };
};

export default function Provider(props) {

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
    var checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
        })
    : "";

    return (
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
      );
};