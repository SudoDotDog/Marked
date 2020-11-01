# Marked

[![Build Status](https://travis-ci.com/SudoDotDog/Marked.svg?branch=master)](https://travis-ci.com/SudoDotDog/Marked)
[![codecov](https://codecov.io/gh/SudoDotDog/Marked/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Marked)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fmarked.svg)](https://badge.fury.io/js/%40sudoo%2Fmarked)
[![downloads](https://img.shields.io/npm/dm/@sudoo/marked.svg)](https://www.npmjs.com/package/@sudoo/marked)

:tennis: JavaScript code runner in marked territory, synchronized

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
    provides: // provide importable variable
})
    .then((result)=>/*handle result*/)
    .catch((err)=>/*handle error*/);
```

### Low level client

```js
import { Sandbox } from '@sudoo/marked'

const sandbox = Sandbox.create();

// use evaluator
// provide internal function

sandbox.evaluate(`import print from 'print'; print(1)`)
    .then((result)=>/*handle result*/)
    .catch((err)=>/*handle error*/);
```
