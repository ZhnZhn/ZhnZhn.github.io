"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
const TH_ID = 'CHART_CONTAINER',
  CL_ROOT = (0, _styleFn.crBsContainerCn)("item-container"),
  CL_SHOW_CONT = "show-cont";
const useChartContainerStyle = isShow => [(0, _useTheme.default)(TH_ID), isShow ? _styleFn.S_INLINE : _styleFn.S_NONE, (0, _styleFn.crCn)(CL_ROOT, [isShow, CL_SHOW_CONT])];
var _default = useChartContainerStyle;
exports.default = _default;
//# sourceMappingURL=useChartContainerStyle.js.map