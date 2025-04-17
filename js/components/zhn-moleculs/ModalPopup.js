"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ModalPane = _interopRequireDefault(require("./ModalPane"));
var _jsxRuntime = require("react/jsx-runtime");
const ModalPopup = _ref => {
  let {
    isShow,
    className,
    style,
    children,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      className: (0, _styleFn.crCn)(_styleFn.CL_POPUP_MENU, className),
      style: style,
      isShow: isShow,
      children: children
    })
  });
};
var _default = exports.default = ModalPopup;
//# sourceMappingURL=ModalPopup.js.map