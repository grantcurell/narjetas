# Conjugations

To add support for a new language's conjugations create a new file with the schema: `<ISO 639-1 code>Provider.js`. Ex: `enConjugation.js` for English.

The conjugations expect the following format:

```javascript
export const Conjugations = 
{
    twoLetterLanguageId: {
        mood1: {
            verbTense1: {
                /*
                    Expects an object of "subject: verb" objects. This will be populated by the conjugation provider
                    itself. For example:

                    {
                        I: have
                        you: have
                        she/he/it: has
                        we: have
                        they: have
                    }

                    Leave empty if you do not want to define this.
                */
            },
            verbTense2: {
                /*
                    Expects an object of "subject: verb" objects. This will be populated by the conjugation provider
                    itself. For example:

                    {
                        I: have had
                        you: have had
                        she/he/it: has had
                        we: have had
                        they: have had
                    }

                    Leave empty if you do not want to define this.
                */
            },
            verbTense3: {
                /*
                    Expects an object of "subject: verb" objects. This will be populated by the conjugation provider
                    itself. For example:

                    {
                        I: have had
                        you: have had
                        she/he/it: has had
                        we: have had
                        they: have had
                    }

                    Leave empty if you do not want to define this.
                */
            }
        },
        mood2: {
            verbTense1: {},
            verbTense2: {}
        }
    }
}
```