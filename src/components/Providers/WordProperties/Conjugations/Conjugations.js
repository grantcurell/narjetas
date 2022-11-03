import React from 'react';

export const conjugations =
{
    nb: {
        weblink: "",
        indicative: {
            present: {},
            presentPerfect: {},
            past: {},
            pastPerfect: {},
            future: {},
            futurePerfect: {},
        },
        conditional: {
            present: {},
            perfect: {}
        },
        imperative: {}
    }
}

export class Conjugation {
    conjugation;

    constructor(language) {
        // Make the conjugation a copy of conjugation for the specified language
        this.conjugation = {...conjugations[language]}
    }

    set(key, value) {
        this.conjugation[key] = value;
    }

    get(key = null) {

        if (key) {
            return this.conjugation[key];
        } 

        return this.conjugation;
    }

    render () {
        // TODO - this is not currently complete
        // TODO - See https://github.com/grantcurell/narjetas/issues/4
        return <span>{this.conjugation.weblink !== "" ? <a
            target="_blank"
            rel="noopener"
            href={this.conjugation.weblink}>Click here for the conjugation!</a>
            : null}</span>;
    }
}