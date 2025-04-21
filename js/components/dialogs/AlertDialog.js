"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW_CAPTION = {
    ..._styleFn.S_FLEX,
    margin: 5,
    lineHeight: 2,
    fontSize: '18px',
    fontWeight: 'bold'
  },
  S_CAPTION = {
    ..._styleFn.S_INLINE,
    color: '#f44336',
    padding: '0 10px 0 8px',
    whiteSpace: 'nowrap'
  },
  S_ITEM_ID = {
    ..._styleFn.S_INLINE,
    color: '#a487d4',
    width: 190
  },
  S_DESCR = {
    color: 'grey',
    padding: '0 8px 0 12px',
    lineHeight: 1.4,
    fontWeight: 'bold',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  };
const AlertDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const {
      alertCaption = 'Item',
      alertItemId,
      alertDescr
    } = data,
    _caption = alertItemId ? alertCaption + ': ' : alertCaption;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: "Alert",
    isShow: isShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROW_CAPTION,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_CAPTION,
        children: _caption
      }), alertItemId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
        style: S_ITEM_ID,
        text: alertItemId,
        title: alertItemId
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S_DESCR,
      children: alertDescr
    })]
  });
});
var _default = exports.default = AlertDialog;
//# sourceMappingURL=AlertDialog.js.map