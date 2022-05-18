"use strict";

exports.__esModule = true;
exports.default = void 0;

var _tpFn = require("./tpFn");

const _crDonut = _ref => {
  let {
    id,
    value,
    point
  } = _ref;
  return (0, _tpFn.crHeader)(point.nameFull, id) + "\n<div class=\"tp__body\">\n  " + (0, _tpFn.crRow)('Value', value) + "\n</div>";
};

const tpDonut = {
  value: {
    fnTemplate: _crDonut,
    isWithValue: true
  }
};
var _default = tpDonut;
exports.default = _default;
//# sourceMappingURL=tpDonut.js.map