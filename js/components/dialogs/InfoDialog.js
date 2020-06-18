"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _crModalDialog = _interopRequireDefault(require("./crModalDialog"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var S = {
  CAPTION: {
    width: 400,
    paddingLeft: 10,
    color: 'rgba(164, 135, 212, 1)',
    lineHeight: 2,
    fontSize: '18px',
    fontWeight: 'bold'
  },
  DESCR: {
    color: 'gray',
    width: 400,
    paddingLeft: 10,
    lineHeight: 1.4,
    fontWeight: 'bold',
    whiteSpace: 'pre'
  }
};
var InfoDialog = (0, _crModalDialog["default"])(function (_ref) {
  var isShow = _ref.isShow,
      data = _ref.data,
      onClose = _ref.onClose;
  var caption = data.caption,
      descr = data.descr;
  return /*#__PURE__*/_react["default"].createElement(_ModalDialog["default"], {
    caption: "Information",
    isShow: isShow,
    onClose: onClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: _DialogStyles["default"].rowDiv
  }, /*#__PURE__*/_react["default"].createElement("p", {
    style: S.CAPTION
  }, caption)), /*#__PURE__*/_react["default"].createElement("div", {
    style: _DialogStyles["default"].rowDiv
  }, /*#__PURE__*/_react["default"].createElement("p", {
    style: S.DESCR
  }, descr)));
});
var _default = InfoDialog;
exports["default"] = _default;
//# sourceMappingURL=InfoDialog.js.map