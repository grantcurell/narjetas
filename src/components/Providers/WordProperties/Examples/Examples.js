import React from "react";

export const examples = {
    nb: {}
};

export class Example {
    example;

    constructor(language) {
        // Make the conjugation a copy of conjugation for the specified language
        this.example = {...examples[language]}
    }

    set(key, value) {
        this.example[key] = value;
    }

    get(key = null) {

        if (key) {
            return this.example[key];
        } 

        return this.example
    }

    render () {
        // TODO - this is not currently complete
        // TODO - See https://github.com/grantcurell/narjetas/issues/5
        return <span>{this.example.weblink !== "" ? <a
            target="_blank"
            rel="noopener"
            href={this.example.weblink}>Click here for the example!</a> :
            null}</span>;
    }
}