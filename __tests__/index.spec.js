import { transform } from "../src/index.js";

const win = {
  width: 480,
  height: 640
};
const parent = {
  width: 480,
  height: 100
};

describe("CSS calc function", () => {
  it("should support percentages ", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(100% - 10px)",
        win,
        parent
      })
    ).toEqual(470);
  });

  it("should support px unit", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(10px + (100px / 3.5))",
        win,
        parent
      })
    ).toEqual(38.57142857142857);
  });

  it("should support vh unit", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(50vh + 10px)",
        win,
        parent
      })
    ).toEqual(330);
  });

  it("should support vw unit", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(50vw + 10px)",
        win,
        parent
      })
    ).toEqual(250);
    expect(
      transform({
        prop: "height",
        value: "calc(50vw + 15%)",
        win,
        parent
      })
    ).toEqual(255);
    expect(
      transform({
        prop: "width",
        value: "calc(50vw + 10%)",
        win,
        parent
      })
    ).toEqual(288);
  });

  it("should support rem unit", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(50% - 1rem)",
        win,
        parent
      })
    ).toEqual(34);
  });

  it("should support zero as the value", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(0)",
        win,
        parent
      })
    ).toEqual(0);
  });

  it("should support fractions without leading zero", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(2rem - .14285rem)",
        win,
        parent
      })
    ).toEqual(29.7144);
  });

  it("should support font-size with percentage", () => {
    expect(
      transform({
        prop: "fontSize",
        value: "calc(100%)",
        win,
        parent,
        font: {
          size: 16
        }
      })
    ).toEqual(16);

    expect(
      transform({
        prop: "fontSize",
        value: "calc(60%)",
        win,
        parent,
        font: {
          size: 16
        }
      })
    ).toEqual(9.6);

    expect(
      transform({
        prop: "fontSize",
        value: "calc(100%)",
        win,
        parent,
        font: {
          size: 12
        }
      })
    ).toEqual(12);

    expect(
      transform({
        prop: "fontSize",
        value: "calc(10vw)",
        win,
        parent,
        font: {
          size: 12
        }
      })
    ).toEqual(48);

    expect(() =>
      transform({
        prop: "fontSize",
        value: "calc(100%)",
        win,
        parent
      })
    ).toThrow("CSS calc(): unable to calculate font-size.");
  });

  it("should handle precision correctly", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(1/100)",
        win,
        parent
      })
    ).toEqual(0.01);
    expect(
      transform({
        prop: "width",
        value: "calc(5/1000000)",
        win,
        parent
      })
    ).toEqual(0.000005);
  });

  it("should support complex values", () => {
    expect(
      transform({
        prop: "width",
        value: "calc((100% / 2) - ((100% * 0.57735) / 2))",
        win,
        parent
      })
    ).toEqual(101.43599999999998);
  });

  it("should support mixed units", () => {
    expect(
      transform({
        prop: "width",
        value: "calc((100% / 2) - ((50vh * 0.57735) / 2))",
        win,
        parent
      })
    ).toEqual(147.624);
    expect(
      transform({
        prop: "width",
        value: "calc(100% - 100% + 1rem)",
        win,
        parent
      })
    ).toEqual(16);

    // https://github.com/MoOx/reduce-css-calc/issues/7
    expect(
      transform({
        prop: "width",
        value: "calc(100% - 200px + 0%)",
        win,
        parent
      })
    ).toEqual(280);
    expect(
      transform({
        prop: "width",
        value: "calc(100% - 200px + 0px)",
        win,
        parent
      })
    ).toEqual(280);
  });

  it("should support same value multiple times", () => {
    expect(
      transform({
        prop: "width",
        value: "calc((50vh / 2) + 50vh - ((50vh * 0.57735) / 2))",
        win,
        parent
      })
    ).toEqual(387.624);
  });

  it("should only allow multiplication if at least one of the arguments is a number", () => {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/calc#Syntax
    // Multiplication. At least one of the arguments must be a <number>.
    expect(
      transform({
        prop: "width",
        value: "calc(20px * 2)",
        win,
        parent
      })
    ).toEqual(40);

    expect(
      transform({
        prop: "width",
        value: "calc(2 * 15px)",
        win,
        parent
      })
    ).toEqual(30);

    expect(
      transform({
        prop: "width",
        value: "calc(2 * (410 - 300) * 1px)",
        win,
        parent
      })
    ).toEqual(220);

    expect(() =>
      transform({
        prop: "width",
        value: "calc(2px * 15px)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "px", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(2px*15px)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "px", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(2rem*15rem)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "rem", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(100% * 100%)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "%", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(1vw * 1vw)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "vw", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(1vh * 1vh)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "vh", number expected');
  });

  it("should only allow division if the right hand side is a number", () => {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/calc#Syntax
    // Division. The right-hand side must be a <number>.

    expect(
      transform({
        prop: "width",
        value: "calc(15px / 2)",
        win,
        parent
      })
    ).toEqual(7.5);

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px / 2px)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "px", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10 / 2px)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "px", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px / 2rem)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "rem", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px / 1vh)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "vh", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px / 1vw)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "vw", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px / 1%)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "%", number expected');
  });

  it("should clamp value depending on prop, when calc resolves to negative values", () => {
    /*
    Since widths smaller than 0px are not allowed, these three declarations are equivalent:
      width: calc(5px - 10px);
      width: calc(-5px);
      width: 0px;
    Note however that width: -5px is not equivalent to width: calc(-5px)!
    Out-of-range values outside calc() are synactically invalid,
    and cause the entire declaration to be dropped.
    */

    const noClamp = [
      "top",
      "left",
      "bottom",
      "right",
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft"
    ];

    noClamp.forEach(prop => {
      expect(
        transform({
          prop,
          value: "calc(-10px)",
          win,
          parent
        })
      ).toEqual(-10);
    });

    expect(
      transform({
        prop: "z-index",
        value: "calc(-5)",
        win,
        parent
      })
    ).toEqual(-5);

    expect(
      transform({
        prop: "width",
        value: "calc(5px - 10px)",
        win,
        parent
      })
    ).toEqual(0);

    expect(
      transform({
        prop: "height",
        value: "calc(5px - 10px)",
        win,
        parent
      })
    ).toEqual(0);
  });

  it("should throw an error when dividing by 0", () => {
    expect(() =>
      transform({
        prop: "width",
        value: "calc(500px/0)",
        win,
        parent
      })
    ).toThrow("CSS calc(): cannot divide by zero.");
    expect(() =>
      transform({
        prop: "width",
        value: "calc(500px / 0)",
        win,
        parent
      })
    ).toThrow("CSS calc(): cannot divide by zero.");
  });

  it("should throw an error for unitless length calculations", () => {
    // Because <number-token>s are always interpreted as <number>s or <integer>s,
    // "unitless 0" <length>s aren’t supported in math functions.
    // That is, width: calc(0 + 5px); is invalid,
    // because it’s trying to add a <number> to a <length>,
    // even though both width: 0; and width: 5px; are valid.
    expect(() =>
      transform({
        prop: "width",
        value: "calc(0 + 5px)",
        win,
        parent
      })
    ).toThrow("CSS calc(): unexpected unitless value.");

    expect(() =>
      transform({
        prop: "width",
        value: "calc(100% - 200px - 0)",
        win,
        parent
      })
    ).toThrow("CSS calc(): unexpected unitless value.");

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10 + 100%)",
        win,
        parent
      })
    ).toThrow("CSS calc(): unexpected unitless value.");

    expect(() =>
      transform({
        prop: "width",
        value: "calc((10 + 2px) + 100%)",
        win,
        parent
      })
    ).toThrow("CSS calc(): unexpected unitless value.");

    expect(() =>
      transform({
        prop: "width",
        value: "calc(100% + (2px + 20)",
        win,
        parent
      })
    ).toThrow("CSS calc(): unexpected unitless value.");
  });

  it("should allow / and * operators to be used without whitespace", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(20px/2)",
        win,
        parent
      })
    ).toEqual(10);
    expect(
      transform({
        prop: "width",
        value: "calc(20px*2)",
        win,
        parent
      })
    ).toEqual(40);
  });

  it("should require whitespace around - and + operators", () => {
    // https://www.w3.org/TR/css-values-3/#calc-notation
    // In addition, white space is required on both sides of the + and - operators.
    // (The * and / operaters can be used without white space around them.)

    // https://developer.mozilla.org/en-US/docs/Web/CSS/calc
    // The + and - operators must be surrounded by whitespace.
    // For instance, calc(50% -8px) will be parsed as a percentage
    // followed by a negative length — an invalid expression —
    // while calc(50% - 8px) is a percentage followed by a subtraction operator and a length.
    // Likewise, calc(8px + -50%) is treated as a length followed by an addition operator
    // and a negative percentage.

    expect(() =>
      transform({
        prop: "width",
        value: "calc(50% -8px)",
        win,
        parent
      })
    ).toThrow(
      "CSS calc(): white space is required on both sides of the + and - operators."
    );

    expect(
      transform({
        prop: "marginLeft",
        value: "calc(8px + -50%)",
        win,
        parent
      })
    ).toEqual(-232);

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px+20px)",
        win,
        parent
      })
    ).toThrow(
      "CSS calc(): white space is required on both sides of the + and - operators."
    );

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px-20px)",
        win,
        parent
      })
    ).toThrow(
      "CSS calc(): white space is required on both sides of the + and - operators."
    );

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px - 20px+20px)",
        win,
        parent
      })
    ).toThrow(
      "CSS calc(): white space is required on both sides of the + and - operators."
    );
  });

  it("should support nested calc() functions", () => {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/calc#Syntax
    // It is permitted to nest calc() functions,
    // in which case the inner ones are treated as simple parentheses.
    expect(
      transform({
        prop: "width",
        value: "calc(calc(1px) + calc(2px))",
        win,
        parent
      })
    ).toEqual(3);

    expect(
      transform({
        prop: "width",
        value: "calc( (1rem - calc( 10px + 1rem)) / 2)",
        win,
        parent
      })
    ).toEqual(0);

    expect(
      transform({
        prop: "width",
        value: "calc(calc(25px - 10px) / 4)",
        win,
        parent
      })
    ).toEqual(3.75);
  });
});
