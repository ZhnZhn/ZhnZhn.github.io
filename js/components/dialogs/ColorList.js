"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));
var _jsxRuntime = require("react/jsx-runtime");
const N_SHORT = 5,
  CL_INPUT_COLOR = 'va-b',
  S_CELL = {
    marginRight: 4
  };
const ColorList = _ref => {
  let {
    isLong,
    colors,
    onClick
  } = _ref;
  const _max = isLong ? colors.length : N_SHORT;
  return (0, _arrFn.filterBoolean)(colors.map((color, i) => i < _max ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor.default, {
    className: CL_INPUT_COLOR,
    style: S_CELL,
    color: color,
    onClick: onClick
  }, color) : null));
};
var _default = exports.default = ColorList;
//# sourceMappingURL=ColorList.js.map