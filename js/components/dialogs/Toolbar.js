"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ToolbarButtonCircle = _interopRequireDefault(require("../zhn/ToolbarButtonCircle"));
var _jsxRuntime = require("react/jsx-runtime");
const Toolbar = _ref => {
  let {
    isShow,
    buttons
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
    isShow: isShow,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.default, {
      buttons: buttons
    })
  });
};
var _default = Toolbar;
exports.default = _default;
//# sourceMappingURL=Toolbar.js.map