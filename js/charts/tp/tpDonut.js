"use strict";

exports.__esModule = true;
exports.donutValue = void 0;

var _tpFn = require("./tpFn");

const _crDonut = _ref => {
  let {
    id,
    value,
    point
  } = _ref;
  return (0, _tpFn.crHeader)(point.nameFull, id) + "\n<div class=\"tp__body\">\n  " + (0, _tpFn.crRow)('Value', value) + "\n</div>";
};

const donutValue = {
  fnTemplate: _crDonut,
  isWithValue: true
};
exports.donutValue = donutValue;
//# sourceMappingURL=tpDonut.js.map