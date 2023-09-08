"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _ButtonCircle = _interopRequireDefault(require("./ButtonCircle"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_C2 = (0, _styleFn.crBtCircleCn)("bt-c2");
const ButtonCircle2 = _ref => {
  let {
    className,
    caption = '',
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    ...restProps,
    caption: caption,
    className: (0, _styleFn.crCn)(CL_BT_C2, className)
  });
};
var _default = ButtonCircle2;
exports.default = _default;
//# sourceMappingURL=ButtonCircle2.js.map