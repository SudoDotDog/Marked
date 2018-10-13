const {
    Marked
} = require('../../dist/index');
const fs = require('fs');
const path = require('path');
const internals = require('../internals');

Marked(fs.readFileSync(path.join(__dirname, 'imports.js'), 'utf8'), {
        provides: {
            print: internals.internalPrint,
            internal: {
                number: 5,
                number2: 8,
            },
        },
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));