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

### Pixels

```js
import { transform } from "css-calc-transform";

transform({
  prop: "width",
  value: "calc(10px + (100px / 3.5))"
});

↓ ↓ ↓ ↓ ↓ ↓

38.57142857142857
```

### Percentages

```js
import { transform } from "css-calc-transform";

const parentElementDimensions = {
  width: 480,
  height: 100
};

transform({
  prop: "width",
  value: "calc(100% - 10px)",
  parent: parentElementDimensions
});

↓ ↓ ↓ ↓ ↓ ↓

470
```

### Viewport units

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

### rem unit

```js
import { transform } from "css-calc-transform";

transform({
  prop: "fontSize",
  value: "calc(2rem + 1px)",
});

↓ ↓ ↓ ↓ ↓ ↓

33
```

### em unit

> When em units are used on font-size, the size is relative to the font-size of the parent.
>
> When used on other properties, it’s relative to the font-size of the element itself.
>
> https://www.digitalocean.com/community/tutorials/css-rem-vs-em-units

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

## min(), max(), clamp()

```js
import { transform } from "css-calc-transform";

transform({
  prop: "height",
  value: "calc(min(2px, 3px) + clamp(100px, 150px, 200px) + max(1px, 2px))",
});

↓ ↓ ↓ ↓ ↓ ↓

154
```

### More examples

For more examples, please have a look at [the tests](__tests__/index.spec.js).

## Dependencies

- None
