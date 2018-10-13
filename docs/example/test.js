const {
    Marked
} = require('../../dist/index');
const fs = require('fs');
const path = require('path');

Marked(fs.readFileSync(path.join(__dirname, 'functions.js'), 'utf8'))
    .then((result) => console.log(result))
    .catch((err) => console.log(err));