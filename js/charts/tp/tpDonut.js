"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

var crHeader = _tpFn["default"].crHeader,
    crRow = _tpFn["default"].crRow;

var _crDonut = function _crDonut(_ref) {
  var id = _ref.id,
      value = _ref.value,
      point = _ref.point;
  return crHeader(point.nameFull, id) + "\n  <div class=\"tp__body\">\n    " + crRow('Value', value) + "\n  </div>";
};

var tpDonut = {
  value: {
    fnTemplate: _crDonut,
    isWithValue: true
  }
};
var _default = tpDonut;
exports["default"] = _default;
//# sourceMappingURL=tpDonut.js.map