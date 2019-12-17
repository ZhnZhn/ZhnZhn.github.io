"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _ModalPane = _interopRequireDefault(require("./ModalPane"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var TH_ID = 'ELEMENT';

var ModalPopup = function ModalPopup(_ref) {
  var theme = _ref.theme,
      isShow = _ref.isShow,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      onClose = _ref.onClose;
  var TS = theme.getStyle(TH_ID);
  return _react["default"].createElement(_ModalPane["default"], {
    isShow: isShow,
    onClose: onClose
  }, _react["default"].createElement(_ShowHide["default"], {
    className: className,
    style: (0, _extends2["default"])({}, style, {}, TS.BORDER),
    isShow: isShow
  }, children));
};

var _default = (0, _withTheme["default"])(ModalPopup);

exports["default"] = _default;
//# sourceMappingURL=ModalPopup.js.map