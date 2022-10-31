
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
}