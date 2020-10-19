"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var _crModalDialog = _interopRequireDefault(require("./fns/crModalDialog"));

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog["default"], {
    caption: "Information",
    isShow: isShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _DialogStyles["default"].ROW,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S.CAPTION,
        children: caption
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _DialogStyles["default"].ROW,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S.DESCR,
        children: descr
      })
    })]
  });
});
var _default = InfoDialog;
exports["default"] = _default;
//# sourceMappingURL=InfoDialog.js.map