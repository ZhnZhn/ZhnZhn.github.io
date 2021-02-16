"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var pby10 = function pby10(data, by) {
  var multipleBy = (0, _big["default"])(10).pow(by);
  return [data.map(function (point) {
    point.y = parseFloat((0, _big["default"])(point.y).times(multipleBy).toString());
    return point;
  }), parseFloat(multipleBy.toString())];
};

var _default = pby10;
exports["default"] = _default;
//# sourceMappingURL=pby10.js.map