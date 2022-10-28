import React from 'react';

export default function SelectLanguage(props) {

    const setLanguage = (language) => {
        const newLanguage = language.target.value;
        props.onChange(newLanguage);
    }

    return (
        <div>
            <select
                id="languages"
                onChange={setLanguage}>

                <option value="norwegian">Norwegian</option>
                <option value="mandarin">Mandarin</option>
            </select>
        </div>
    );
}