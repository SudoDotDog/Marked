# Marked

[![Continuous Integration](https://github.com/SudoDotDog/Marked/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Marked/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Marked/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Marked)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fmarked.svg)](https://badge.fury.io/js/%40sudoo%2Fmarked)
[![downloads](https://img.shields.io/npm/dm/@sudoo/marked.svg)](https://www.npmjs.com/package/@sudoo/marked)

JavaScript code runner in JavaScript, safe with marked territory, asynchronous

## Install

```sh
yarn add @sudoo/marked
# Or
npm install @sudoo/marked --save
```

## Usage

For more examples, see JavaScript files under `docs` folder.

### High level client

```js
import { Marked } from '@sudoo/marked'

Marked(`import print from 'print'; print(1)`, {
    options: // options
    injects: // inject variable
    provides: {
        print: {
            default: (...contents) => {
                console.log(...contents.map((content) => content ? content.toString() : 'undefined'));
            },
        },
    },
})
    .then((result)=>/*handle result*/)
    .catch((err)=>/*handle error*/);
```

### Low level client

```js
import { Sandbox } from '@sudoo/marked'

const sandbox = Sandbox.fromAllEvaluators();

sandbox
    .provide('print', {
        default: (...contents) => {
            console.log(...contents.map((content) => content ? content.toString() : 'undefined'));
        },
    })
    .evaluate(`import print from 'print'; print(1)`)
    .then((result)=>/*handle result*/)
    .catch((err)=>/*handle error*/);
```
