"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

//import PropTypes from "prop-types";
var CL = {
  ELL: 'ellipsis'
};
var S = {
  CAPTION: {
    display: 'inline-block',
    width: 380,
    paddingLeft: 10,
    color: '#F44336',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: 2
  },
  ITEM_ID: {
    width: 120,
    color: '#a487d4',
    fontWeight: 'bold',
    verticalAlign: 'bottom'
  },
  DESCR: {
    color: 'gray',
    width: 380,
    paddingLeft: 10,
    paddingRight: 8,
    fontWeight: 'bold',
    lineHeight: 1.4,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word'
  }
};

var AlertDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(AlertDialog, _Component);

  function AlertDialog() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AlertDialog.prototype;

  /*
  static propTypes = {
    isShow: PropTypes.bool,
    data: PropTypes.shape({
      alertCaption: PropTypes.string,
      alertItemId: PropTypes.string,
      alertDescr: PropTypes.string
    }),
    onClose: PropTypes.func
  }
  */
  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        data = _this$props.data,
        onClose = _this$props.onClose,
        _data$alertCaption = data.alertCaption,
        alertCaption = _data$alertCaption === void 0 ? 'Item' : _data$alertCaption,
        _data$alertItemId = data.alertItemId,
        alertItemId = _data$alertItemId === void 0 ? '' : _data$alertItemId,
        alertDescr = data.alertDescr,
        _caption = alertCaption + ': ';

    return _react["default"].createElement(_ModalDialog["default"], {
      caption: "Alert",
      isShow: isShow,
      onClose: onClose
    }, _react["default"].createElement("div", {
      style: _DialogStyles["default"].rowDiv
    }, _react["default"].createElement("span", {
      style: S.CAPTION
    }, _caption, _react["default"].createElement("span", {
      className: CL.ELL,
      style: S.ITEM_ID,
      title: alertItemId
    }, alertItemId))), _react["default"].createElement("div", {
      style: _DialogStyles["default"].rowDiv
    }, _react["default"].createElement("p", {
      style: S.DESCR
    }, alertDescr)));
  };

  return AlertDialog;
}(_react.Component);

var _default = AlertDialog;
exports["default"] = _default;
//# sourceMappingURL=AlertDialog.js.map