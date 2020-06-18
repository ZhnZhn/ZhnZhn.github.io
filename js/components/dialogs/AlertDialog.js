"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _crModalDialog = _interopRequireDefault(require("./crModalDialog"));

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

  return /*#__PURE__*/_react["default"].createElement(_ModalDialog["default"], {
    caption: "Alert",
    isShow: isShow,
    onClose: onClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROW_CAPTION
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: S.CAPTION
  }, _caption), /*#__PURE__*/_react["default"].createElement("span", {
    className: CL_ELL,
    style: S.ITEM_ID,
    title: alertItemId
  }, alertItemId)), /*#__PURE__*/_react["default"].createElement("p", {
    style: S.DESCR
  }, alertDescr));
});
var _default = AlertDialog;
exports["default"] = _default;
//# sourceMappingURL=AlertDialog.js.map