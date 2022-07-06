"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const S_ROW_CAPTION = {
  display: 'flex',
  margin: 5,
  lineHeight: 2,
  fontSize: '18px',
  fontWeight: 'bold'
},
      S_CAPTION = {
  display: 'inline-block',
  color: '#f44336',
  padding: '0 10px 0 8px'
},
      S_ITEM_ID = {
  display: 'inline-block',
  color: '#a487d4',
  width: 140
},
      S_DESCR = {
  color: 'grey',
  padding: '0 8px 0 12px',
  lineHeight: 1.4,
  fontWeight: 'bold',
  whiteSpace: 'pre-line',
  wordWrap: 'break-word'
};
/*
AlertDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    alertCaption: PropTypes.string,
    alertItemId: PropTypes.string,
    alertDescr: PropTypes.string
  }),
  onClose: PropTypes.func
}
*/

const AlertDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;

  const {
    alertCaption = 'Item',
    alertItemId = '',
    alertDescr
  } = data,
        _caption = alertCaption + ': ';

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: "Alert",
    isShow: isShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROW_CAPTION,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S_CAPTION,
        children: _caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
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
var _default = AlertDialog;
exports.default = _default;
//# sourceMappingURL=AlertDialog.js.map