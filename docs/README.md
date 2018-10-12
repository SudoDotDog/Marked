# Marked

[![Build Status](https://travis-ci.org/SudoDotDog/Marked.svg?branch=master)](https://travis-ci.org/SudoDotDog/Marked)
[![codecov](https://codecov.io/gh/SudoDotDog/Marked/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Marked)

:tennis: JavaScript code runner in marked territory, synchronized.

## Install

```bash
npm install @sudoo/marked --save
```

## Usage

### High level client

```js
import { Marked } from '@sudoo/marked'

Marked(`import print from 'print'; print(1)`)
    .then((result)=>/*handle result*/)
    .catch((err)=>/*handle error*/);
```

### Low level client

```js
import { Sandbox } from '@sudoo/marked'

const sandbox = new Sandbox();

// use evaluator
// provide internal function

sandbox.evaluate(`import print from 'print'; print(1)`)
    .then((result)=>/*handle result*/)
    .catch((err)=>/*handle error*/);
```
