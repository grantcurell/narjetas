import React from 'react';
import PropTypes from 'prop-types';

function SelectLanguage(props) {

    const setLanguage = (language) => {props.onChange(language.target.value)};

    // See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes for a list of language codes
    return (
        <div>
            <select
                id="languages"
                onChange={setLanguage}>

                <option value="nb">Norwegian Bokmål</option>
                <option value="zh-tw">Chinese (Traditional)</option>
                <option value="es">Spanish</option>
            </select>
        </div>
    );
}

SelectLanguage.propTypes = {
    onChange: PropTypes.func
};

export default SelectLanguage;