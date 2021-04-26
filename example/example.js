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
    },
    resolvers: [
        (source, trace) => {
            const script = fs.readFileSync(path.join(__dirname, '..', 'example', 'import', 'source.js'), 'utf8');
            return {
                script,
                scriptLocation: null,
            };
        },
    ],
})
    .then((result) => console.log(result))
    .catch((err) => console.log(err));