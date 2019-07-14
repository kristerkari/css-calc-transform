const CALC_REG = /\bcalc\(([\s\S]+)\)/;
const PERCENT = /[\d.]+%/;
const VIEWPORT_WIDTH = /[\d.]+vw/;
const VIEWPORT_HEIGHT = /[\d.]+vh/;
const VIEWPORT_MIN = /[\d.]+vmin/;
const VIEWPORT_MAX = /[\d.]+vmax/;
const PIXEL = /(\d+)px/g;
const REM = /[\d.]+rem/;
const MATH_EXP = /[+\-/*]?[\d.]+(px|%|rem|vw|vh|vmin|vmax)?/g;
const PLACEHOLDER = "$1";
const ONLYNUMBERS = /[\s\-0-9]/g;
const PLUS_MINUS = /[-+]/g;
const CALC_WITH_OPERATOR = /^calc\([-+]/;
const MINUS_PERCENTAGE = /\s+\-\d+%/g;
const PLUS_MINUS_WHITESPACE = /\s+(\+|\-)\s+/g;
const DIVIDE_BY_ZERO = /\/\s?0/g;
const MULTIPLY_BY_UNIT = /\d+(px|%|rem|vw|vh|vmin|vmax)\s?\*\s?\d+(px|%|rem|vw|vh|vmin|vmax)/g;
const DIVIDE_BY_UNIT = /\/\s?\d+(px|%|rem|vw|vh|vmin|vmax)/;
const UNITLESS_VALUE_LEFT = /\d+\s+(\+|\-)\s+\d+(px|%|rem|vw|vh|vmin|vmax)/g;
const UNITLESS_VALUE_RIGHT = /\d+(px|%|rem|vw|vh|vmin|vmax)\s+(\+|\-)\s+\d+(\s+|$|\))/g;
const CSS_CALC = "CSS calc(): ";

const noClamp = [
  "top",
  "left",
  "bottom",
  "right",
  "z-index",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft"
];

export const transform = ({ prop, value, win, parent, font }) => {
  const calcMatches = value.match(CALC_REG);
  if (!calcMatches) return;

  if (value.match(UNITLESS_VALUE_LEFT) || value.match(UNITLESS_VALUE_RIGHT)) {
    throw new Error(CSS_CALC + "unexpected unitless value.");
  }

  if (value.match(MULTIPLY_BY_UNIT)) {
    throw new Error(
      CSS_CALC + `cannot multiply by "${RegExp.$2}", number expected.`
    );
  }

  if (value.match(DIVIDE_BY_UNIT)) {
    throw new Error(
      CSS_CALC + `cannot divide by "${RegExp.$1}", number expected.`
    );
  }

  if (value.match(DIVIDE_BY_ZERO)) {
    throw new Error(CSS_CALC + "cannot divide by zero.");
  }

  const plusMinus = value.match(PLUS_MINUS);

  if (!value.match(CALC_WITH_OPERATOR) && plusMinus) {
    const minusPercentage = value.match(MINUS_PERCENTAGE);

    if (!minusPercentage) {
      const white = value.match(PLUS_MINUS_WHITESPACE);
      if (
        (plusMinus && !white) ||
        (plusMinus && white && plusMinus.length !== white.length)
      ) {
        throw new Error(
          CSS_CALC +
            "white space is required on both sides of the + and - operators."
        );
      }
    }
  }

  const calcPart = calcMatches[0];
  const formula = calcMatches[1].replace(/calc\(/g, "(");

  const matches = formula.match(MATH_EXP);

  let currentFormula = formula.replace(PIXEL, PLACEHOLDER);

  matches.forEach(match => {
    let refValue;
    let modifier;

    if (match.match(PERCENT)) {
      if (prop === "fontSize") {
        if (font && font.size !== undefined) {
          refValue = font.size;
        } else {
          throw new Error(CSS_CALC + "unable to calculate font-size.");
        }
      } else {
        refValue = prop === "height" ? parent.height : parent.width;
      }
      modifier = parseFloat(match) / 100;
    } else if (match.match(VIEWPORT_WIDTH)) {
      refValue = win.width;
      modifier = parseFloat(match) / 100;
    } else if (match.match(VIEWPORT_HEIGHT)) {
      refValue = win.height;
      modifier = parseFloat(match) / 100;
    } else if (match.match(VIEWPORT_MIN)) {
      refValue = Math.min(win.width, win.height);
      modifier = parseFloat(match) / 100;
    } else if (match.match(VIEWPORT_MAX)) {
      refValue = Math.max(win.width, win.height);
      modifier = parseFloat(match) / 100;
    } else if (match.match(REM)) {
      refValue = 16;
      modifier = parseFloat(match);
    }

    if (modifier !== undefined) {
      currentFormula = currentFormula.replace(match, refValue * modifier);
    }
  });

  if (currentFormula.match(ONLYNUMBERS)) {
    const result = eval("(" + currentFormula + ")");
    const resultFloat = parseFloat(value.replace(calcPart, result));

    if (noClamp.indexOf(prop) === -1 && resultFloat < 0) {
      return 0;
    }
    return resultFloat;
  }
};
