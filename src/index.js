const CALC_REG = /\bcalc\(([\s\S]+)\)/i;
const CLAMP_REG = /\bclamp[^(]*\(([^)]*)\)/i;
const CLAMP = /clamp\((\s?\d{1,20})\s?,\s?(\d{1,20})\s?,\s?(\d{1,20}\s?)\)/i;
const MIX_MAX = /(min|max\()/gi;
const PERCENT = /[\d.]{1,20}%/;
const VIEWPORT_WIDTH = /[\d.]{1,20}vw/i;
const VIEWPORT_HEIGHT = /[\d.]{1,20}vh/i;
const VIEWPORT_MIN = /[\d.]{1,20}vmin/i;
const VIEWPORT_MAX = /[\d.]{1,20}vmax/i;
const PIXEL = /(\d{1,20})px/gi;
const EM = /[\d.]{1,20}em/i;
const REM = /[\d.]{1,20}rem/i;
const UNIT = /[\d.]{1,20}([a-z]{1,20})/i;
const MATH_EXP = /[+\-/*]?[\d.]{1,20}(px|%|em|rem|vw|vh|vmin|vmax)?/gi;
const PLACEHOLDER = "$1";
const PLUS_MINUS = /[-+]/g;
const CALC_WITH_OPERATOR = /^calc\([-+]/i;
const MINUS_PERCENTAGE = /\s{1,20}\-\d{1,20}%/g;
const PLUS_MINUS_WHITESPACE = /\s{1,20}(\+|\-)\s{1,20}/g;
const DIVIDE_BY_ZERO = /\/\s?0/g;
const MULTIPLY_BY_UNIT =
  /\d{1,20}(px|%|em|rem|vw|vh|vmin|vmax)\s?\*\s?\d{1,20}(px|%|em|rem|vw|vh|vmin|vmax)/gi;
const DIVIDE_BY_UNIT = /\/\s?\d{1,20}(px|%|em|rem|vw|vh|vmin|vmax)/i;
const UNITLESS_VALUE_LEFT =
  /\d{1,20}\s{1,20}(\+|\-)\s{1,20}\d{1,20}(px|%|em|rem|vw|vh|vmin|vmax)/gi;
const UNITLESS_VALUE_RIGHT =
  /\d{1,20}(px|%|em|rem|vw|vh|vmin|vmax)\s{1,20}(\+|\-)\s{1,20}\d{1,20}(\s{1,20}|$|\))/gi;
const FUNCTION_CALL = /[a-zA-Z]+\([^)]*\)/g;
const ALLOWED_FUNCTIONS = /min|max|clamp|calc\(/gi;
const DISALLOWED_CHARS = /[!$%^&_|~=`\\#{}\[\]:";'<>?]/;
const CSS_CALC = "CSS calc(): ";
const MIN_MAX_REPLACEMENT = "Math.$1";
const CLAMP_REPLACEMENT = "Math.max($1, Math.min($2, $3))";

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
  const calcMatches = typeof value === "string" && value.match(CALC_REG);
  if (!calcMatches) {
    return value;
  }

  const hasFunctionCalls =
    typeof calcMatches[1] === "string" && calcMatches[1].match(FUNCTION_CALL);
  if (hasFunctionCalls) {
    const functionCalls = calcMatches[1].match(FUNCTION_CALL);
    const allowedFunctions = calcMatches[1].match(ALLOWED_FUNCTIONS);
    const allFunctionsAreAllowed =
      Array.isArray(functionCalls) &&
      Array.isArray(allowedFunctions) &&
      functionCalls.length === allowedFunctions.length;
    if (allowedFunctions === null || !allFunctionsAreAllowed) {
      return value;
    }
  }

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
  const formula = calcMatches[1].replace(/calc\(/gi, "(");

  const matches = formula.match(MATH_EXP);

  let currentFormula = formula.replace(PIXEL, PLACEHOLDER);

  matches.forEach((match) => {
    let refValue;
    let modifier;

    if (match.match(PERCENT)) {
      if (prop === "fontSize") {
        if (parent && parent.font && typeof parent.font.size === "number") {
          refValue = parent.font.size;
        } else {
          throw new Error(
            CSS_CALC +
              `you have to define parent.font.size when using the "%" unit with font-size.`
          );
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
    } else if (match.match(EM)) {
      if (prop === "fontSize") {
        if (parent && parent.font && typeof parent.font.size === "number") {
          refValue = parent.font.size;
        } else {
          throw new Error(
            CSS_CALC +
              `you have to define parent.font.size when using the "em" unit with font-size.`
          );
        }
      } else if (font && typeof font.size === "number") {
        refValue = font.size;
      } else {
        throw new Error(
          CSS_CALC + `you have to define font.size when using the "em" unit.`
        );
      }
      modifier = parseFloat(match);
    } else if (match.match(REM)) {
      refValue = 16;
      modifier = parseFloat(match);
    }

    if (modifier !== undefined) {
      currentFormula = currentFormula.replace(match, refValue * modifier);
    }
  });

  if (DISALLOWED_CHARS.test(currentFormula)) {
    return value;
  }

  const unitMatch = currentFormula.match(UNIT);
  if (unitMatch) {
    const unit = unitMatch[1];
    throw new Error(CSS_CALC + `unsupported unit ${unit}.`);
  }

  const clampMatch = currentFormula.match(CLAMP_REG);
  const isClampWithArgs =
    clampMatch != null &&
    typeof clampMatch[0] === "string" &&
    typeof clampMatch[1] === "string";
  if (isClampWithArgs) {
    const args = clampMatch[1].split(",");
    if (args.length !== 3) {
      throw new Error(
        CSS_CALC + `clamp() needs to be called with exactly three parameters.`
      );
    }
  }

  const replacedFunctionsFormula = currentFormula
    .toLocaleLowerCase()
    .replace(MIX_MAX, MIN_MAX_REPLACEMENT)
    .replace(CLAMP, CLAMP_REPLACEMENT);

  const result = eval("(" + replacedFunctionsFormula + ")");
  const resultFloat = parseFloat(value.replace(calcPart, result));

  if (noClamp.indexOf(prop) === -1 && resultFloat < 0) {
    return 0;
  }
  return resultFloat;
};
