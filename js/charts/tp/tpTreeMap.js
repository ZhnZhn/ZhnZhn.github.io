"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

var _tpConfig = _interopRequireDefault(require("./tpConfig"));

var crHeader = _tpFn["default"].crHeader,
    crRow = _tpFn["default"].crRow,
    toNumberFormatAll = _tpFn["default"].toNumberFormatAll;

var _crTreeMap = function _crTreeMap(_ref) {
  var id = _ref.id,
      point = _ref.point;

  var title = point.title,
      label = point.label,
      value = point.value,
      _point$percent = point.percent,
      percent = _point$percent === void 0 ? '' : _point$percent,
      _percent = percent ? "(" + percent + "%)" : '',
      _value = toNumberFormatAll(value) + " " + _percent;

  return crHeader(title, id) + "\n  <div class=\"tp_body\">\n    " + crRow('', label) + "\n    " + crRow('', _value, {
    color: _tpConfig["default"].YEAR_C
  }) + "\n  </div>\n  ";
};

var tpTreeMap = {
  value: {
    fnTemplate: _crTreeMap
  }
};
var _default = tpTreeMap;
exports["default"] = _default;
//# sourceMappingURL=tpTreeMap.js.map