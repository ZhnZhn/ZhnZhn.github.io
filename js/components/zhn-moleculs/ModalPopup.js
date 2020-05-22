"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

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
  return _react["default"].createElement(_ModalPane["default"], {
    isShow: isShow,
    onClose: onClose
  }, _react["default"].createElement(_ShowHide["default"], {
    className: className,
    style: (0, _extends2["default"])({}, style, {}, TS.BORDER),
    isShow: isShow
  }, children));
};

var _default = ModalPopup;
exports["default"] = _default;
//# sourceMappingURL=ModalPopup.js.map