"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ModalPane = _interopRequireDefault(require("./ModalPane"));
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'ELEMENT';
const ModalPopup = _ref => {
  let {
    isShow,
    className,
    style,
    children,
    onClose
  } = _ref;
  const TS = (0, _useTheme.default)(TH_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      className: className,
      style: {
        ...style,
        ...TS.BORDER
      },
      isShow: isShow,
      children: children
    })
  });
};
var _default = ModalPopup;
exports.default = _default;
//# sourceMappingURL=ModalPopup.js.map