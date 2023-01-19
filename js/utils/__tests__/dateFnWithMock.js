"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _dateFn = require("../dateFn");
var _mockDateBeforeAll = _interopRequireDefault(require("./mockDateBeforeAll"));
describe('dateFnWithMock', () => {
  test('', () => expect('').toBe(''));
});
const dateFnWithMock = () => {
  describe('getFromDate', () => {
    const fn = _dateFn.getFromDate;
    //2020-01-01 12:00:01
    (0, _mockDateBeforeAll.default)(2020, 0, 1, 12, 0, 1);
    test('should return str in format YYYY-MM-DD minusYear', () => {
      expect(fn(2, new Date('2020-01-01'))).toBe('2018-01-01');
      expect(fn(void 0, new Date('2020-01-01'))).toBe('2018-01-01');
    });
    test('getToDate should return current Date as YYYY-MM-DD', () => {
      expect((0, _dateFn.getToDate)()).toBe('2020-01-01');
    });
    test('getDaysFromYmd should return number of days to current Date', () => {
      const fn = _dateFn.getDaysFromYmd;
      expect(fn('2020-01-01')).toBe(1);
      expect(fn('2019-12-31')).toBe(2);
      expect(fn('2019-12-30')).toBe(3);
    });
  });
};
var _default = dateFnWithMock;
exports.default = _default;
//# sourceMappingURL=dateFnWithMock.js.map