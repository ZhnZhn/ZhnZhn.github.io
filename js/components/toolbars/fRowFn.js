"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useAddSeriaBy = _interopRequireDefault(require("./useAddSeriaBy"));
var _jsxRuntime = require("react/jsx-runtime");
const fRowFn = Row => _ref => {
  let {
    refEl,
    caption,
    configArr,
    getChart
  } = _ref;
  const [isSeria, addSeria, removeSeria] = (0, _useAddSeriaBy.default)(configArr, getChart);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Row, {
    refEl: refEl,
    is: isSeria,
    caption: caption,
    getChart: getChart,
    onPlus: addSeria,
    onMinus: removeSeria
  });
};
var _default = exports.default = fRowFn;
//# sourceMappingURL=fRowFn.js.map