"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
const CL_ROOT = (0, _styleFn.crBsContainerCn)("item-container"),
  CL_SHOW_CONT = "show-cont";
const crChartContainerStyle = isShow => [isShow ? _styleFn.S_INLINE : _styleFn.S_NONE, (0, _styleFn.crCn)(CL_ROOT, [isShow, CL_SHOW_CONT])];
var _default = crChartContainerStyle;
exports.default = _default;
//# sourceMappingURL=crChartContainerStyle.js.map