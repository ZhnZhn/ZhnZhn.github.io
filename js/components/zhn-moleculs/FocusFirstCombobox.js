"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const FocusFirtsCombobox = _ref => {
  let {
    is,
    children
  } = _ref;
  const _refInputs = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(() => {
    if (is) {
      setTimeout(() => (0, _uiApi.focusHtmlElement)((0, _uiApi.getComboboxElement)(_refInputs)), 200);
    }
  }, [is]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: _refInputs,
    children: children
  });
};
var _default = exports.default = FocusFirtsCombobox;
//# sourceMappingURL=FocusFirstCombobox.js.map