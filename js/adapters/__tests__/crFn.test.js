"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _crFn = _interopRequireDefault(require("../crFn"));

var crError = _crFn["default"].crError;
describe('crError', function () {
  var fn = crError;
  it('should create err obj', function () {
    expect(fn('caption', 'msg')).toEqual({
      errCaption: 'caption',
      message: 'msg'
    });
  });
  it('should replace void 0 values by empty str', function () {
    expect(fn()).toEqual({
      errCaption: '',
      message: ''
    });
  });
});
//# sourceMappingURL=crFn.test.js.map