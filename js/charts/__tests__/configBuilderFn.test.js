/**
 * @jest-environment jsdom
 */
//Highcharts from Chart require jsdom
"use strict";

var _configBuilderFn = require("../configBuilderFn");
describe('fAddCaption', () => {
  const fn = _configBuilderFn.fAddCaption;
  test('should add caption', () => {
    const title = 'title',
      subtitle = 'subtitle',
      config = fn(title, subtitle)({});
    expect(config.title.text).toBe(title);
    expect(config.subtitle.text).toBe(subtitle);
  });

  // <7.2.2 || >=8.0.0 <8.1.1
  // https://snyk.io/vuln/SNYK-JS-HIGHCHARTS-571995
  // https://github.com/highcharts/highcharts/issues/13559
  test('should sanitize title and subtitle', () => {
    const title = "<a href='javascript:alert()'>title</a>",
      titleSanitized = "<a>title</a>",
      subtitle = "<a href='#\";alert();\"'>subtitle</a>",
      subtitleSanitized = "<a href=\"#&quot;;alert();&quot;\">subtitle</a>",
      config = fn(title, subtitle)({});
    expect(config.title.text).toBe(titleSanitized);
    expect(config.subtitle.text).toBe(subtitleSanitized);
  });
});
describe('fAdd', () => {
  const fn = _configBuilderFn.fAdd;
  test('should add option by new propName, value', () => {
    const config = fn('abc', {
      a: 'a',
      b: 'b'
    })({});
    expect(config.abc.a).toBe('a');
    expect(config.abc.b).toBe('b');
  });
  test('should add option by propName, value', () => {
    const config = fn('abc', {
      a: 'a',
      b: 'b'
    })({
      abc: {
        a: 1,
        b: 2,
        c: 3
      }
    });
    expect(config.abc.a).toBe('a');
    expect(config.abc.b).toBe('b');
    expect(config.abc.c).toBe(3);
  });
  test('should add options by obj with new propName-value', () => {
    const config = fn({
      a: {
        aa: 'aa'
      },
      b: {
        bb: 'bb'
      }
    })({});
    expect(config.a.aa).toBe('aa');
    expect(config.b.bb).toBe('bb');
  });
  test('should add by option obj with propName-value', () => {
    const config = fn({
      a: {
        aa: 'aa'
      },
      b: {
        bb: 'bb'
      }
    })({
      a: {
        aa: 11,
        a: 'a'
      },
      b: {
        bb: 22,
        b: 'b'
      },
      c: {
        cc: 33,
        c: 'c'
      }
    });
    expect(config.a.aa).toBe('aa');
    expect(config.a.a).toBe('a');
    expect(config.b.bb).toBe('bb');
    expect(config.b.b).toBe('b');
    expect(config.c.cc).toBe(33);
    expect(config.c.c).toBe('c');
  });
  test('should add by option obj array, string, number, boolean values', () => {
    const data = ['a'],
      str = 'str',
      bool = true,
      n = 10,
      config = fn({
        a: data,
        b: str,
        c: bool,
        d: n
      })({});
    expect(config.a).toEqual(data);
    expect(config.b).toBe(str);
    expect(config.c).toBe(bool);
    expect(config.d).toBe(n);
  });
  test('should add array, string, number, boolean values', () => {
    const data = ['a'],
      str = 'str',
      bool = true,
      n = 10,
      config1 = fn('a', data)({}),
      config2 = fn('b', str)(config1),
      config3 = fn('c', bool)(config2),
      config = fn('d', n)(config3);
    expect(config.a).toEqual(data);
    expect(config.b).toBe(str);
    expect(config.c).toBe(bool);
    expect(config.d).toBe(n);
  });
});
//# sourceMappingURL=configBuilderFn.test.js.map