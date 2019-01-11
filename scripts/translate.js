const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');

//const Translator = require('./lib/translator').default;
const globSync = glob.sync;
const mkdirpSync = mkdirp.sync;

const MESSAGES_PATTERN = './build/messages/**/*.json';
const LANG_DIR = './src/languages/';

const ESCAPED_CHARS = {
    '\\': '\\\\',
    '\\#': '\\#',
    '{': '\\{',
    '}': '\\}'
};

const ESAPE_CHARS_REGEXP = /\\#|[{}\\]/g;

function print(ast) {
    return ast
        .elements
        .reduce((message, el) => {
            let {format, id, type, value} = el;

            if (type === 'messageTextElement') {
                return message + value.replace(ESAPE_CHARS_REGEXP, (char) => {
                    return ESCAPED_CHARS[char];
                });
            }

            if (!format) {
                return message + `{${id}}`;
            }

            let formatType = format
                .type
                .replace(/Format$/, '');

            let style,
                offset,
                options;

            switch (formatType) {
                case 'number':
                case 'date':
                case 'time':
                    style = format.style
                        ? `, ${format.style}`
                        : '';
                    return message + `{${id}, ${formatType}${style}}`;

                case 'plural':
                case 'selectOrdinal':
                case 'select':
                    offset = format.offset
                        ? `, offset:${format.offset}`
                        : '';
                    options = format
                        .options
                        .reduce((str, option) => {
                            let optionValue = print(option.value);
                            return str + ` ${option.selector} {${optionValue}}`;
                        }, '');
                    return message + `{${id}, ${formatType}${offset},${options}}`;
            }
        }, '');
}

const {parse} = require('intl-messageformat-parser');

class Translator {
    constructor(translateText) {
        this.translateText = translateText;
    }

    translate(message) {
        let ast = parse(message);
        let translated = this.transform(ast);
        return print(translated);
    }

    transform(ast) {
        ast
            .elements
            .forEach((el) => {
                if (el.type === 'messageTextElement') {
                    el.value = this.translateText(el.value);
                } else {
                    let options = el.format && el.format.options;
                    if (options) {
                        options.forEach((option) => this.transform(option.value));
                    }
                }
            });

        return ast;
    }
}

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The
// result is a flat collection of `id: message` pairs for the app's default
// locale.
let defaultMessages = globSync(MESSAGES_PATTERN).map((filename) => fs.readFileSync(filename, 'utf8')).map((file) => JSON.parse(file)).reduce((collection, descriptors) => {
    descriptors.forEach(({id, defaultMessage}) => {
        if (collection.hasOwnProperty(id)) {
            throw new Error(`Duplicate message id: ${id}`);
        }

        collection[id] = defaultMessage;
    });

    return collection;
}, {});

// For the purpose of this example app a fake locale: `en-UPPER` is created and
// the app's default messages are "translated" into this new "locale" by simply
// UPPERCASING all of the message text. In a real app this would be through
// some offline process to get the app's messages translated by machine or
// professional translators.
let uppercaseTranslator = new Translator((text) => text.toUpperCase());
let uppercaseMessages = Object
    .keys(defaultMessages)
    .map((id) => [id, defaultMessages[id]])
    .reduce((collection, [id, defaultMessage]) => {
        collection[id] = uppercaseTranslator.translate(defaultMessage);
        return collection;
    }, {});

mkdirpSync(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'en.json', JSON.stringify(defaultMessages, null, 2));
//fs.writeFileSync(LANG_DIR + 'es.json', JSON.stringify(defaultMessages, null, 2));
