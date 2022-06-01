"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogStyles = require("../styles/DialogStyles");

var _jsxRuntime = require("react/jsx-runtime");

const S_CAPTION = {
  color: '#a487d4',
  width: 400,
  paddingLeft: 10,
  lineHeight: 2,
  fontSize: '18px',
  fontWeight: 'bold'
},
      S_DESCR = {
  color: 'grey',
  width: 400,
  paddingLeft: 10,
  lineHeight: 1.4,
  fontWeight: 'bold',
  whiteSpace: 'pre'
};
const InfoDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const {
    caption,
    descr
  } = data;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: "Information",
    isShow: isShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _DialogStyles.S_DIALOG_ROW,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S_CAPTION,
        children: caption
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _DialogStyles.S_DIALOG_ROW,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        style: S_DESCR,
        children: descr
      })
    })]
  });
});
var _default = InfoDialog;
exports.default = _default;
//# sourceMappingURL=InfoDialog.js.map