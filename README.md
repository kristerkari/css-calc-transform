# CSS calc() to Javascript

Tiny library to transform CSS properties with [CSS calc() function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) values to pixels based on window and element dimensions.

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

For more examples, please have a look at [the tests](__tests__/index.spec.js).
