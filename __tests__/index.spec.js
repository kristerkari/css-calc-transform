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
  it("should do nothing if there is no calc function", () => {
    expect(
      transform({
        prop: "width",
        value: "100%",
        win,
        parent
      })
    ).toEqual("100%");
    expect(
      transform({
        prop: "width",
        value: 0,
        win,
        parent
      })
    ).toEqual(0);
  });

  it("should support percentages ", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(100% - 10px)",
        win,
        parent
      })
    ).toEqual(470);

    expect(
      transform({
        prop: "width",
        value: "calc(  100% - 10px  )",
        win,
        parent
      })
    ).toEqual(470);

    expect(
      transform({
        prop: "width",
        value: "CALC(100% - 10PX)",
        win,
        parent
      })
    ).toEqual(470);
  });

  it("should support percentages without passing window dimensions", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(100% - 10px)",
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
    expect(
      transform({
        prop: "width",
        value: "calc(10PX + (100PX / 3.5))",
        win,
        parent
      })
    ).toEqual(38.57142857142857);
    expect(
      transform({
        prop: "width",
        value: "calc( 10px  +  ( 100px  / 3.5 ))",
        win,
        parent
      })
    ).toEqual(38.57142857142857);
  });

  it("should support px unit without passing window dimensions or parent element size", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(10px + (100px / 3.5))"
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
    expect(
      transform({
        prop: "height",
        value: "calc(50VH + 10PX)",
        win,
        parent
      })
    ).toEqual(330);
  });

  it("should support vh unit without passing parent element size", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(50vh + 10px)",
        win
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
        value: "calc(50VW + 10PX)",
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

  it("should support vmin unit", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(50vmin + 10px)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(250);
    expect(
      transform({
        prop: "height",
        value: "calc(50VMIN + 10PX)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(250);
    expect(
      transform({
        prop: "height",
        value: "calc(50vmin + 15%)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(255);
    expect(
      transform({
        prop: "width",
        value: "calc(50vmin + 10%)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(288);
    expect(
      transform({
        prop: "height",
        value: "calc(50vmin + 10px)",
        win: {
          width: 480,
          height: 240
        },
        parent
      })
    ).toEqual(130);
    expect(
      transform({
        prop: "height",
        value: "calc(50vmin + 15%)",
        win: {
          width: 480,
          height: 240
        },
        parent
      })
    ).toEqual(135);
    expect(
      transform({
        prop: "width",
        value: "calc(50vmin + 10%)",
        win: {
          width: 480,
          height: 240
        },
        parent
      })
    ).toEqual(168);
  });

  it("should support vmax unit", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(50vmax + 10px)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(330);
    expect(
      transform({
        prop: "height",
        value: "calc(50VMAX + 10PX)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(330);
    expect(
      transform({
        prop: "height",
        value: "calc(50vmax + 15%)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(335);
    expect(
      transform({
        prop: "width",
        value: "calc(50vmax + 10%)",
        win: {
          width: 480,
          height: 640
        },
        parent
      })
    ).toEqual(368);
    expect(
      transform({
        prop: "height",
        value: "calc(50vmax + 10px)",
        win: {
          width: 480,
          height: 240
        },
        parent
      })
    ).toEqual(250);
    expect(
      transform({
        prop: "height",
        value: "calc(50vmax + 15%)",
        win: {
          width: 480,
          height: 240
        },
        parent
      })
    ).toEqual(255);
    expect(
      transform({
        prop: "width",
        value: "calc(50vmax + 10%)",
        win: {
          width: 480,
          height: 240
        },
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
    expect(
      transform({
        prop: "height",
        value: "calc(50% - 1REM)",
        win,
        parent
      })
    ).toEqual(34);
  });

  it("should support em unit with the font-size property", () => {
    // When em units are used on font-size, the size is relative to the font-size of the parent.
    // When used on other properties, it’s relative to the font-size of the element itself.
    // https://www.digitalocean.com/community/tutorials/css-rem-vs-em-units
    expect(
      transform({
        prop: "fontSize",
        value: "calc(10px + 2em)",
        win,
        parent: {
          font: {
            size: 16
          }
        }
      })
    ).toEqual(42);
    expect(
      transform({
        prop: "fontSize",
        value: "calc(10PX + 2EM)",
        win,
        parent: {
          font: {
            size: 16
          }
        }
      })
    ).toEqual(42);
  });

  it("should support em unit with the font-size property and percentages", () => {
    expect(
      transform({
        prop: "fontSize",
        value: "calc(100% + 2em)",
        win,
        parent: {
          font: {
            size: 16
          }
        }
      })
    ).toEqual(48);
    expect(
      transform({
        prop: "fontSize",
        value: "calc(10% + 1em)",
        win,
        parent: {
          font: {
            size: 16
          }
        }
      })
    ).toEqual(17.6);
  });

  it("should support em unit with non font-size properties", () => {
    // When em units are used on font-size, the size is relative to the font-size of the parent.
    // When used on other properties, it’s relative to the font-size of the element itself.
    // https://www.digitalocean.com/community/tutorials/css-rem-vs-em-units
    expect(
      transform({
        prop: "height",
        value: "calc(10px + 2em)",
        win,
        parent,
        font: {
          size: 18
        }
      })
    ).toEqual(46);
    expect(
      transform({
        prop: "height",
        value: "calc(50% - 1em)",
        win,
        parent,
        font: {
          size: 16
        }
      })
    ).toEqual(34);
    expect(
      transform({
        prop: "height",
        value: "calc(50% - 1.5em)",
        win,
        parent,
        font: {
          size: 16
        }
      })
    ).toEqual(26);
    expect(
      transform({
        prop: "width",
        value: "calc(50% - 1.5em)",
        win,
        parent,
        font: {
          size: 20
        }
      })
    ).toEqual(210);
    expect(
      transform({
        prop: "width",
        value: "calc(50% - 1.5em)",
        win,
        parent,
        font: {
          size: 2
        }
      })
    ).toEqual(237);
  });

  it("should support em and throw an error when font size is not defined", () => {
    expect(() =>
      transform({
        prop: "fontSize",
        value: "calc(50px - 1em)",
        win,
        parent
      })
    ).toThrow(
      `CSS calc(): you have to define parent.font.size when using the "em" unit with font-size.`
    );
    expect(() =>
      transform({
        prop: "height",
        value: "calc(50% - 1em)",
        win,
        parent
      })
    ).toThrow(
      `CSS calc(): you have to define font.size when using the "em" unit.`
    );
    expect(() =>
      transform({
        prop: "height",
        value: "calc(50% - 1em)",
        win,
        parent,
        font: {
          weight: "bold"
        }
      })
    ).toThrow(
      `CSS calc(): you have to define font.size when using the "em" unit.`
    );
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
    expect(
      transform({
        prop: "width",
        value: "CALC(0)",
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
        parent: {
          font: {
            size: 16
          }
        }
      })
    ).toEqual(16);

    expect(
      transform({
        prop: "fontSize",
        value: "calc(60%)",
        win,
        parent: {
          font: {
            size: 16
          }
        }
      })
    ).toEqual(9.6);

    expect(
      transform({
        prop: "fontSize",
        value: "calc(100%)",
        win,
        parent: {
          font: {
            size: 12
          }
        }
      })
    ).toEqual(12);

    expect(
      transform({
        prop: "fontSize",
        value: "calc(100% + 10px)",
        win,
        parent: {
          font: {
            size: 12
          }
        }
      })
    ).toEqual(22);

    expect(() =>
      transform({
        prop: "fontSize",
        value: "calc(100%)",
        win,
        parent
      })
    ).toThrow(
      `CSS calc(): you have to define parent.font.size when using the "%" unit with font-size.`
    );
  });

  it("should support font-size with viewport units", () => {
    expect(
      transform({
        prop: "fontSize",
        value: "calc(10vw)",
        win,
        parent
      })
    ).toEqual(48);
    expect(
      transform({
        prop: "fontSize",
        value: "calc(10vh)",
        win,
        parent
      })
    ).toEqual(64);
    expect(
      transform({
        prop: "fontSize",
        value: "calc(10vmax)",
        win,
        parent
      })
    ).toEqual(64);
    expect(
      transform({
        prop: "fontSize",
        value: "calc(10vmin)",
        win,
        parent
      })
    ).toEqual(48);
  });

  it("should support min() function", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(10% + min(1%, 1em))",
        win,
        parent: {
          width: 480,
          height: 480
        },
        font: {
          size: 16
        }
      })
    ).toEqual(52.8);
    expect(
      transform({
        prop: "height",
        value: "CALC(10% + MIN(1%, 1EM))",
        win,
        parent: {
          width: 480,
          height: 480
        },
        font: {
          size: 16
        }
      })
    ).toEqual(52.8);
    expect(
      transform({
        prop: "height",
        value: "calc( 10% + min( 1% , 1em ))",
        win,
        parent: {
          width: 480,
          height: 480
        },
        font: {
          size: 16
        }
      })
    ).toEqual(52.8);
    expect(
      transform({
        prop: "height",
        value: "calc(10% + min(1%))",
        win,
        parent: {
          width: 480,
          height: 480
        },
        font: {
          size: 16
        }
      })
    ).toEqual(52.8);
  });

  it("should support max() function", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(10% + max(1%, 1em))",
        win,
        parent: {
          width: 480,
          height: 480
        },
        font: {
          size: 16
        }
      })
    ).toEqual(64);
    expect(
      transform({
        prop: "height",
        value: "CALC(10% + MAX(1%, 1EM))",
        win,
        parent: {
          width: 480,
          height: 480
        },
        font: {
          size: 16
        }
      })
    ).toEqual(64);
    expect(
      transform({
        prop: "height",
        value: "calc(10% + max(1%))",
        win,
        parent: {
          width: 480,
          height: 480
        },
        font: {
          size: 16
        }
      })
    ).toEqual(52.8);
  });

  it("should support clamp() function", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(1px + clamp(250px, 50vw, 600px))",
        win: {
          width: 520,
          height: 520
        }
      })
    ).toEqual(520 / 2 + 1);
    expect(
      transform({
        prop: "width",
        value: "CALC(1PX + CLAMP(250PX, 50VW, 600PX))",
        win: {
          width: 520,
          height: 520
        }
      })
    ).toEqual(520 / 2 + 1);
    expect(
      transform({
        prop: "width",
        value: "calc(1px + clamp(250px,50vw,600px))",
        win: {
          width: 520,
          height: 520
        }
      })
    ).toEqual(520 / 2 + 1);
    expect(
      transform({
        prop: "width",
        value: "calc(10% + clamp(350px, 50%, 500px))",
        parent: {
          width: 1000,
          height: 1000
        }
      })
    ).toEqual(500 + 1000 / 10);
    expect(
      transform({
        prop: "width",
        value: "calc(10% + clamp(350px, 50%, 500px))",
        parent: {
          width: 800,
          height: 800
        }
      })
    ).toEqual(400 + 800 / 10);
    expect(
      transform({
        prop: "width",
        value: "calc(10% + clamp(350px, 50%, 500px))",
        parent: {
          width: 600,
          height: 600
        }
      })
    ).toEqual(350 + 600 / 10);
  });

  it("should support mixing min/max/clamp", () => {
    expect(
      transform({
        prop: "height",
        value: "calc(min(1px, 2px) + max(1px, 2px))"
      })
    ).toEqual(3);
    expect(
      transform({
        prop: "height",
        value: "calc(min(2px) + clamp(100px, 150px, 200px) + max(2px))"
      })
    ).toEqual(154);
    expect(
      transform({
        prop: "height",
        value:
          "calc( min( 2px  )  + clamp( 100px , 150px , 200px ) + max( 2px))"
      })
    ).toEqual(154);
    expect(
      transform({
        prop: "height",
        value:
          "calc(clamp(100px, 150px, 200px) + min(1px, 2px) + max(1px, 2px))"
      })
    ).toEqual(153);
  });

  it("should allow min, max, clamp, and calc functions to be called", () => {
    const allowed = ["min", "max", "clamp"];
    allowed.forEach((fn) => {
      expect(
        transform({
          prop: "width",
          value: `calc(${fn}(10px, 20px, 30px))`
        })
      ).toBeDefined();
    });
    expect(
      transform({
        prop: "width",
        value: `calc(calc(10px + 20px))`
      })
    ).toBe(30);
  });

  it("should do nothing when contains unsupported functions", () => {
    expect(
      transform({
        prop: "width",
        value: `calc(alert("foo"))`
      })
    ).toEqual(`calc(alert("foo"))`);
    expect(
      transform({
        prop: "width",
        value: `calc(myFunction())`
      })
    ).toEqual(`calc(myFunction())`);
    expect(
      transform({
        prop: "width",
        value: `calc(10px + alert("foo"))`
      })
    ).toEqual(`calc(10px + alert("foo"))`);
    expect(
      transform({
        prop: "width",
        value: `calc(10px + myFunction("foo"))`
      })
    ).toEqual(`calc(10px + myFunction("foo"))`);
  });

  it("should do nothing when mixing supported and unsupported functions", () => {
    expect(
      transform({
        prop: "width",
        value: `calc(min(1px, 2px) + myFunction("foo"))`
      })
    ).toEqual(`calc(min(1px, 2px) + myFunction("foo"))`);

    expect(
      transform({
        prop: "width",
        value: `calc(myFunction("foo") - clamp(350px, 50%, 500px))`
      })
    ).toEqual(`calc(myFunction("foo") - clamp(350px, 50%, 500px))`);
  });

  it("should do nothing when special characters are passed", () => {
    expect(
      transform({
        prop: "width",
        value: "calc(1 |`^$)"
      })
    ).toEqual("calc(1 |`^$)");
  });

  it("should throw an error when clamp has less or more than 3 parameters", () => {
    expect(() =>
      transform({
        prop: "width",
        value: "calc(10% + clamp(350px))",
        win,
        parent
      })
    ).toThrow(
      `CSS calc(): clamp() needs to be called with exactly three parameters`
    );
    expect(() =>
      transform({
        prop: "width",
        value: "calc(10% + clamp(350px, 50%))",
        win,
        parent
      })
    ).toThrow(
      `CSS calc(): clamp() needs to be called with exactly three parameters`
    );
    expect(() =>
      transform({
        prop: "width",
        value: "calc(10% + clamp(350px, 50%, 1px, 2px))",
        win,
        parent
      })
    ).toThrow(
      `CSS calc(): clamp() needs to be called with exactly three parameters`
    );
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
    expect(
      transform({
        prop: "width",
        value: "calc((50vmax / 2) + 50vmax - ((50vmax * 0.57735) / 2))",
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
        value: "calc(10vw * 2)",
        win,
        parent
      })
    ).toEqual(96);

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
        value: "calc(2em*15em)",
        win,
        parent,
        font: {
          size: 14
        }
      })
    ).toThrow('CSS calc(): cannot multiply by "em", number expected');

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

    expect(() =>
      transform({
        prop: "width",
        value: "calc(1vh * 1vmax)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "vmax", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(1vmax * 1vmin)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot multiply by "vmin", number expected');
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
        value: "calc(10px / 2em)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "em", number expected');

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
        value: "calc(10px / 1vmin)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "vmin", number expected');

    expect(() =>
      transform({
        prop: "width",
        value: "calc(10px / 1vmax)",
        win,
        parent
      })
    ).toThrow('CSS calc(): cannot divide by "vmax", number expected');

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

    noClamp.forEach((prop) => {
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
        value: "calc(0 + 5vmin)",
        win,
        parent
      })
    ).toThrow("CSS calc(): unexpected unitless value.");

    expect(() =>
      transform({
        prop: "width",
        value: "calc(5vmax - 0)",
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

  const unsupportedUnits = [
    "cm",
    "mm",
    "Q",
    "in",
    "pc",
    "pt",
    "ex",
    "ch",
    "lh",
    "rlh",
    "vb",
    "vi"
  ];
  unsupportedUnits.forEach((unit) => {
    it(`should throw an error for unsupported unit ${unit}`, () => {
      expect(() =>
        transform({
          prop: "fontSize",
          value: `calc(100${unit})`,
          win,
          parent
        })
      ).toThrow(`CSS calc(): unsupported unit ${unit}.`);

      expect(() =>
        transform({
          prop: "width",
          value: `calc(1px + 8${unit})`,
          win,
          parent
        })
      ).toThrow(`CSS calc(): unsupported unit ${unit}.`);
    });
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
        value: "CALC(CALC(1px) + CALC(2px))",
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
