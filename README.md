# CSS calc() to pixels transform

[![NPM version](http://img.shields.io/npm/v/css-calc-transform.svg)](https://www.npmjs.org/package/css-calc-transform)
[![Build Status](https://github.com/kristerkari/css-calc-transform/workflows/Tests/badge.svg)](https://github.com/kristerkari/css-calc-transform/actions?workflow=Tests)
![Size](https://img.shields.io/bundlephobia/minzip/css-calc-transform.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

Tiny Javascript library to transform CSS properties with [CSS calc() function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) values to pixels based on window and element dimensions.

## Install

```sh
yarn add --save css-calc-transform
```

or

```sh
npm install --save css-calc-transform
```

## Usage

When you want to transform CSS `calc()` value containing pixels into a number:

```js
import { transform } from "css-calc-transform";

transform({
  prop: "width",
  value: "calc(10px + (100px / 3.5))"
});

↓ ↓ ↓ ↓ ↓ ↓

38.57142857142857
```

When you want to transform CSS `calc()` value containing percentages into a number:

```js
import { transform } from "css-calc-transform";

const elementDimensions = {
  width: 480,
  height: 100
};

transform({
  prop: "width",
  value: "calc(100% - 10px)",
  parent: elementDimensions
});

↓ ↓ ↓ ↓ ↓ ↓

470
```

When you want to transform CSS `calc()` value containing viewport units into a number:

```js
import { transform } from "css-calc-transform";

const windowDimensions = {
  width: 480,
  height: 640
};

transform({
  prop: "height",
  value: "calc(50vh + 10px)",
  win: windowDimensions
});

↓ ↓ ↓ ↓ ↓ ↓

330
```

When you want to transform CSS `calc()` value containing `em` unit into a number:

```js
import { transform } from "css-calc-transform";

transform({
  prop: "fontSize",
  value: "calc(2em + 1px)",
  parent: {
    font: {
      size: 16
    }
  }
});

↓ ↓ ↓ ↓ ↓ ↓

33
```

```js
import { transform } from "css-calc-transform";

transform({
  prop: "height",
  value: "calc(10px + 2em)",
  font: {
    size: 16
  }
});

↓ ↓ ↓ ↓ ↓ ↓

42
```

For more examples, please have a look at [the tests](__tests__/index.spec.js).
