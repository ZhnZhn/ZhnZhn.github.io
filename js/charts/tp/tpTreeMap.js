"use strict";

exports.__esModule = true;
exports.treeMapValue = void 0;

var _tpFn = require("./tpFn");

var _Colors = require("./Colors");

const _crTreeMap = _ref => {
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
        _value = (0, _tpFn.toNumberFormatAll)(value) + " " + _percent;

  return (0, _tpFn.crHeader)(title, id) + "\n  <div class=\"tp_body\">\n    " + (0, _tpFn.crRow)('', label) + "\n    " + (0, _tpFn.crRow)('', _value, {
    color: _Colors.YEAR_COLOR
  }) + "\n  </div>\n  ";
};

const treeMapValue = {
  fnTemplate: _crTreeMap
};
exports.treeMapValue = treeMapValue;
//# sourceMappingURL=tpTreeMap.js.map