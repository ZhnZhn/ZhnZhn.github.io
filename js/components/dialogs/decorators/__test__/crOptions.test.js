"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _crOptions = _interopRequireDefault(require("../crOptions"));

var CAPTION_OPTIONS = {
  items: [{
    caption: 'Abc',
    value: 123
  }]
},
    C_OPTIONS = {
  items: [{
    c: 'Abc',
    v: 123
  }]
},
    S_OPTIONS = {
  items: [{
    c: 'Abc',
    v: 123,
    s: 'Abc'
  }]
};
describe('crOptions', function () {
  var fn = _crOptions["default"];
  test('should return propCaption undefined for item caption prop name', function () {
    expect(fn(CAPTION_OPTIONS, 'items').propCaption).toBe(void 0);
  });
  test('should return propCaption c for item c prop name', function () {
    expect(fn(C_OPTIONS, 'items').propCaption).toBe('c');
  });
  test('should add item s value to c', function () {
    expect(fn(S_OPTIONS, 'items').items[0].c).toBe('Abc (Abc)');
  });
});
//# sourceMappingURL=crOptions.test.js.map