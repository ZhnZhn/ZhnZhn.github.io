"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

var crHeader = _tpFn["default"].crHeader,
    crRow = _tpFn["default"].crRow,
    toDateFormatDMYT = _tpFn["default"].toDateFormatDMYT,
    getStatus = _tpFn["default"].getStatus;

var _crValue = function _crValue(_ref) {
  var date = _ref.date,
      id = _ref.id,
      color = _ref.color,
      _ref$valueText = _ref.valueText,
      valueText = _ref$valueText === void 0 ? 'Value' : _ref$valueText,
      value = _ref.value,
      point = _ref.point;
  var status = getStatus(point);
  return crHeader(date, id) + "\n  <div class=\"tp__body\">\n    " + crRow(valueText, value, {
    color: color,
    status: status
  }) + "\n  </div>";
};

var tpSpline = {
  value: {
    fnTemplate: _crValue,
    isWithColor: true,
    isWithValueText: true,
    isWithValue: true
  },
  valueDmyt: {
    fnTemplate: _crValue,
    fnDateFormat: toDateFormatDMYT,
    isWithColor: true,
    isWithValueText: true,
    isWithValue: true
  }
};
var _default = tpSpline;
exports["default"] = _default;
//# sourceMappingURL=tpSpline.js.map