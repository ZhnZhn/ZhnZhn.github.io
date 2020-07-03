"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _crStyle = _interopRequireDefault(require("../crStyle"));

describe('crStyle', function () {
  var fn = _crStyle["default"];
  it('should create style from arr', function () {
    var _s1 = {
      width: 10
    },
        _s2 = {
      width: 20,
      height: 20
    };
    expect(fn([])).toEqual({});
    expect(fn([_s1, _s2])).toEqual((0, _extends2["default"])({}, _s1, _s2));
    expect(fn([_s1, false, null, void 0, NaN, '', _s2])).toEqual((0, _extends2["default"])({}, _s1, _s2));
  });
});
//# sourceMappingURL=crStyle.test.js.map