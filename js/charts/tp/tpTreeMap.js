"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

var _Colors = require("./Colors");

const {
  crHeader,
  crRow,
  toNumberFormatAll
} = _tpFn.default;

const _crTreeMap = function (_ref) {
  let {
    id,
    point
  } = _ref;

  const {
    title,
    label,
    value,
    percent = ''
  } = point,
        _percent = percent ? "(" + percent + "%)" : '',
        _value = toNumberFormatAll(value) + " " + _percent;

  return crHeader(title, id) + "\n  <div class=\"tp_body\">\n    " + crRow('', label) + "\n    " + crRow('', _value, {
    color: _Colors.YEAR_COLOR
  }) + "\n  </div>\n  ";
};

const tpTreeMap = {
  value: {
    fnTemplate: _crTreeMap
  }
};
var _default = tpTreeMap;
exports.default = _default;
//# sourceMappingURL=tpTreeMap.js.map