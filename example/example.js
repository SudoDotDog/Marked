const {
    Marked,
    ScriptLocation,
} = require('../app/index');
const fs = require('fs');
const path = require('path');

Marked(fs.readFileSync(path.join(__dirname, '..', 'example', `${process.argv[2]}.js`), 'utf8'), {
    provides: {
        print: {
            default: (...contents) => {

                console.log('EXAMPLE/', ...contents.map((content) => typeof content === 'undefined'
                    || content === null ? 'undefined' : content.toString()));
            },
        },
        object: {
            default: {
                test: "Test-Default",
            },
            test: {
                test: "Test-Named",
            },
        },
    },
    resolvers: [
        (source, trace) => {

            switch (source) {
                case './source': {
                    const script = fs.readFileSync(path.join(__dirname, '..', 'example', 'import', 'source.js'), 'utf8');
                    return {
                        script,
                        scriptLocation: ScriptLocation.create('file', 'source'),
                    };
                }
                case './third': {
                    const script = fs.readFileSync(path.join(__dirname, '..', 'example', 'import', 'third.js'), 'utf8');
                    return {
                        script,
                        scriptLocation: ScriptLocation.create('file', 'third'),
                    };
                }
                case './cache': {
                    const script = fs.readFileSync(path.join(__dirname, '..', 'example', 'import', 'cache.js'), 'utf8');
                    return {
                        script,
                        scriptLocation: ScriptLocation.create('file', 'cache'),
                    };
                }
            }
        },
    ],
})
    .then((result) => console.log(result))
    .catch((err) => console.log(err));