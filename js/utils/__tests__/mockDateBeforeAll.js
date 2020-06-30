"use strict";

exports.__esModule = true;
exports["default"] = void 0;
describe('mockDateBeforeAll', function () {
  test('', function () {
    return expect('').toBe('');
  });
});

var mockDateBeforeAll = function mockDateBeforeAll(y, m, d, hours, minutes, seconds) {
  var FIXED_DATE = new Date(y, m, d, hours, minutes, seconds);
  /*eslint-disable no-undef*/

  var NATIVE_DATE_IMP = Date.bind(global.Date);
  beforeAll(function () {
    var _Date = Date; //2020-01-01 12:00:01

    global.Date = jest.fn(function () {
      return FIXED_DATE;
    });
    global.Date.UTC = jest.fn(_Date.UTC);
  });
  it('show mocked date', function () {
    console.log('Mocked Date', new Date().toISOString());
    console.log(Date.UTC(2020, 0, 1), 1577836800000, '2020-01-01 UTC-0');
  });
  afterAll(function () {
    global.Date = NATIVE_DATE_IMP;
    global.Date.UTC = NATIVE_DATE_IMP.UTC;
    console.log('Current Date', new Date().toISOString());
  });
};

var _default = mockDateBeforeAll;
exports["default"] = _default;
//# sourceMappingURL=mockDateBeforeAll.js.map