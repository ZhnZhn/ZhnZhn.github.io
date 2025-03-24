"use strict";

exports.__esModule = true;
exports.treeMapValue = void 0;
var _Color = require("../../constants/Color");
var _tpFn = require("./tpFn");
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
    _percent = percent ? `(${percent}%)` : '',
    _value = `${(0, _tpFn.toNumberFormatAll)(value)} ${_percent}`;
  return `${(0, _tpFn.crHeader)(title, id)}
  <div class="tp_body">
    ${(0, _tpFn.crRow)('', label)}
    ${(0, _tpFn.crRow)('', _value, {
    color: _Color.COLOR_DATE
  })}
  </div>
  `;
};
const treeMapValue = exports.treeMapValue = {
  fnTemplate: _crTreeMap
};
//# sourceMappingURL=tpTreeMap.js.map