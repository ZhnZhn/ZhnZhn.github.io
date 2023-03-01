"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
const TH_ID = 'CHART_CONTAINER',
  CL_ROOT = "item-container",
  CL_SHOW_CONT = "show-cont",
  S_INLINE = {
    display: 'inline-block'
  },
  S_NONE = {
    display: 'none'
  };
const useChartContainerStyle = isShow => [(0, _useTheme.default)(TH_ID), isShow ? S_INLINE : S_NONE, (0, _crCn.default)(CL_ROOT, [isShow, CL_SHOW_CONT])];
var _default = useChartContainerStyle;
exports.default = _default;
//# sourceMappingURL=useChartContainerStyle.js.map