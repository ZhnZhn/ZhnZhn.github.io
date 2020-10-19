"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _ModalPane = _interopRequireDefault(require("./ModalPane"));

var TH_ID = 'ELEMENT';

var ModalPopup = function ModalPopup(_ref) {
  var isShow = _ref.isShow,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      onClose = _ref.onClose;
  var TS = (0, _useTheme["default"])(TH_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane["default"], {
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
      className: className,
      style: (0, _extends2["default"])({}, style, TS.BORDER),
      isShow: isShow,
      children: children
    })
  });
};

var _default = ModalPopup;
exports["default"] = _default;
//# sourceMappingURL=ModalPopup.js.map