const {
    Marked
} = require('../app/index');
const fs = require('fs');
const path = require('path');

Marked(fs.readFileSync(path.join(__dirname, '..', 'example', `${process.argv[2]}.js`), 'utf8'), {
    provides: {
        print: {
            default: (...contents) => {

                console.log(...contents.map((content) => content ? content.toString() : 'undefined'));
            },
        },
        internal: {
            number: 5,
            number2: 8,
        },
    },
})
    .then((result) => console.log(result))
    .catch((err) => console.log(err));