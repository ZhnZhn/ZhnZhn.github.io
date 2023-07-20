"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'SCROLL_PANE',
  CL_SCROLL = 'with-scroll';
const ScrollPane = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    className,
    style,
    children
  } = _ref;
  const TS = (0, _useTheme.default)(TH_ID),
    _cn = (0, _crCn.default)(CL_SCROLL + " " + TS.CL_SCROLL, className);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: ref,
    className: _cn,
    style: style,
    children: children
  });
});
var _default = ScrollPane;
exports.default = _default;
//# sourceMappingURL=ScrollPane.js.map