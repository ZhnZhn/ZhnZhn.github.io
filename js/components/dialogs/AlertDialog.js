"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _crModalDialog = _interopRequireDefault(require("./fns/crModalDialog"));

//import PropTypes from "prop-types";
var CL_ELL = 'ellipsis';
var S = {
  ROW_CAPTION: {
    display: 'flex',
    margin: 5,
    lineHeight: 2,
    fontSize: '18px',
    fontWeight: 'bold'
  },
  CAPTION: {
    display: 'inline-block',
    color: '#f44336',
    paddingLeft: 8,
    paddingRight: 10
  },
  ITEM_ID: {
    color: '#a487d4',
    width: 140
  },
  DESCR: {
    color: 'gray',
    paddingLeft: 12,
    paddingRight: 8,
    lineHeight: 1.4,
    fontWeight: 'bold',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  }
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

var AlertDialog = (0, _crModalDialog["default"])(function (_ref) {
  var isShow = _ref.isShow,
      data = _ref.data,
      onClose = _ref.onClose;

  var _data$alertCaption = data.alertCaption,
      alertCaption = _data$alertCaption === void 0 ? 'Item' : _data$alertCaption,
      _data$alertItemId = data.alertItemId,
      alertItemId = _data$alertItemId === void 0 ? '' : _data$alertItemId,
      alertDescr = data.alertDescr,
      _caption = alertCaption + ': ';

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog["default"], {
    caption: "Alert",
    isShow: isShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROW_CAPTION,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S.CAPTION,
        children: _caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_ELL,
        style: S.ITEM_ID,
        title: alertItemId,
        children: alertItemId
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S.DESCR,
      children: alertDescr
    })]
  });
});
var _default = AlertDialog;
exports["default"] = _default;
//# sourceMappingURL=AlertDialog.js.map