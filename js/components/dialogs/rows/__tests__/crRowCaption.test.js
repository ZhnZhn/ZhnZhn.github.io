"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _crRowCaption = _interopRequireDefault(require("../crRowCaption"));
describe('crRowCaption', () => {
  const fn = _crRowCaption.default;
  test('should return arr with caption and title depend on caption length', () => {
    const caption12 = 'Abcdefghjk12',
      [_caption1, _title1] = fn(caption12);
    expect(_caption1).toBe('Abcdefghjk1.');
    expect(_title1).toBe(caption12);
    const longCaption = 'A very long caption, more than 30 characters',
      [_caption2, _title2] = fn(longCaption);
    expect(_caption2).toBe(longCaption.slice(0, 30) + '...');
    expect(_title2).toBe(longCaption);
    const simpleCaption = 'Indicator',
      [_caption3, _title3] = fn(simpleCaption);
    expect(_caption3).toBe(simpleCaption);
    expect(_title3).toBe(void 0);
    const notLongCaption = 'Economic Indicators',
      [_caption4, _title4] = fn(notLongCaption);
    expect(_caption4).toBe(notLongCaption);
    expect(_title4).toBe(void 0);
    const [_caption5, _title5] = fn();
    expect(_caption5).toBe(void 0);
    expect(_title5).toBe(void 0);
    const [_caption6, _title6] = fn(null);
    expect(_caption6).toBe(void 0);
    expect(_title6).toBe(void 0);
  });
});
//# sourceMappingURL=crRowCaption.test.js.map