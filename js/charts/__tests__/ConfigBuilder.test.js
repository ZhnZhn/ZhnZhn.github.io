"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ConfigBuilder = _interopRequireDefault(require("../ConfigBuilder"));

describe('ConfigBuilder addCaption', function () {
  test('should add title', function () {
    var title = 'title',
        config = (0, _ConfigBuilder["default"])().addTitle(title).toConfig();
    expect(config.title.text).toBe(title);
  });
  test('should add subtitle', function () {
    var subtitle = 'subtitle',
        config = (0, _ConfigBuilder["default"])().addSubtitle(subtitle).toConfig();
    expect(config.subtitle.text).toBe(subtitle);
  });
  test('should add caption', function () {
    var title = 'title',
        subtitle = 'subtitle',
        config = (0, _ConfigBuilder["default"])().addCaption(title, subtitle).toConfig();
    expect(config.title.text).toBe(title);
    expect(config.subtitle.text).toBe(subtitle);
  }); // <7.2.2 || >=8.0.0 <8.1.1
  // https://snyk.io/vuln/SNYK-JS-HIGHCHARTS-571995
  // https://github.com/highcharts/highcharts/issues/13559

  test('should sanitize title and subtitle', function () {
    var title = "<a href='javascript:alert()'>title</a>",
        titleSanitized = "<a>title</a>",
        subtitle = "<a href='#\";alert();\"'>subtitle</a>",
        subtitleSanitized = "<a href=\"#&quot;;alert();&quot;\">subtitle</a>",
        config = (0, _ConfigBuilder["default"])().addCaption(title, subtitle).toConfig();
    expect(config.title.text).toBe(titleSanitized);
    expect(config.subtitle.text).toBe(subtitleSanitized);
  });
});
describe('ConfigBuilder add', function () {
  test('should add option by new propName', function () {
    var config = (0, _ConfigBuilder["default"])().add('abc', {
      a: 'a',
      b: 'b'
    }).toConfig();
    expect(config.abc.a).toBe('a');
    expect(config.abc.b).toBe('b');
  });
  test('should add option by propName', function () {
    var config = (0, _ConfigBuilder["default"])({
      abc: {
        a: 1,
        b: 2,
        c: 3
      }
    }).add('abc', {
      a: 'a',
      b: 'b'
    }).toConfig();
    expect(config.abc.a).toBe('a');
    expect(config.abc.b).toBe('b');
    expect(config.abc.c).toBe(3);
  });
  test('should add options by obj with new propName-option', function () {
    var config = (0, _ConfigBuilder["default"])().add({
      a: {
        aa: 'aa'
      },
      b: {
        bb: 'bb'
      }
    }).toConfig();
    expect(config.a.aa).toBe('aa');
    expect(config.b.bb).toBe('bb');
  });
  test('should add options by obj with propName-option', function () {
    var config = (0, _ConfigBuilder["default"])({
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
    }).add({
      a: {
        aa: 'aa'
      },
      b: {
        bb: 'bb'
      }
    }).toConfig();
    expect(config.a.aa).toBe('aa');
    expect(config.a.a).toBe('a');
    expect(config.b.bb).toBe('bb');
    expect(config.b.b).toBe('b');
    expect(config.c.cc).toBe(33);
    expect(config.c.c).toBe('c');
  });
});
//# sourceMappingURL=ConfigBuilder.test.js.map