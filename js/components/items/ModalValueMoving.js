"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SpanValue = _interopRequireDefault(require("../zhn-span/SpanValue"));

var _SpanDate = _interopRequireDefault(require("../zhn-span/SpanDate"));

var _DivCompareTo = _interopRequireDefault(require("../modals/DivCompareTo"));

//import PropTypes from "prop-types";
var isDmy = _DateUtils["default"].isDmy;
var S = {
  ROOT: {
    position: 'absolute',
    top: 25,
    left: 0,
    zIndex: 10,
    width: 'auto',
    backgroundColor: 'inherit',
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 12,
    cursor: 'auto'
  },
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    paddingLeft: 16,
    whiteSpace: 'nowrap'
  }
};

var _isNotAdminMode = function _isNotAdminMode(isAdminMode, isDenyToChange) {
  var _isAdminMode = typeof isAdminMode == 'function' ? isAdminMode() : typeof isAdminMode == 'boolean' ? isAdminMode : false;

  return !_isAdminMode || isDenyToChange;
};

var RowValueDate = function RowValueDate(_ref) {
  var value = _ref.value,
      date = _ref.date;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROW
  }, /*#__PURE__*/_react["default"].createElement(_SpanValue["default"], {
    value: (0, _formatAllNumber["default"])(value)
  }), /*#__PURE__*/_react["default"].createElement(_SpanDate["default"], {
    date: date,
    style: S.DATE
  }));
};

var ModalValueMoving = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ModalValueMoving, _Component);

  function ModalValueMoving() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      msgDateTo: ''
    };
    _this._refInput = /*#__PURE__*/_react["default"].createRef();

    _this._handleEnterDate = function (dateTo) {
      if (isDmy(dateTo)) {
        var isUpdated = _this.props.updateDateTo(dateTo);

        if (isUpdated) {
          _this.setState({
            msgDateTo: ''
          });
        } else {
          _this.setState({
            msgDateTo: "No data for " + dateTo
          });
        }
      }
    };

    return _this;
  }

  var _proto = ModalValueMoving.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.isShow && this._refInput.current) {
      this._refInput.current.focusInput();
    }

    if (this.props !== prevProps) {
      this.setState({
        msgDateTo: ''
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        onClose = _this$props.onClose,
        valueMoving = _this$props.valueMoving,
        isAdminMode = _this$props.isAdminMode,
        value = valueMoving.value,
        date = valueMoving.date,
        valueTo = valueMoving.valueTo,
        dateTo = valueMoving.dateTo,
        isDenyToChange = valueMoving.isDenyToChange,
        msgDateTo = this.state.msgDateTo;
    return /*#__PURE__*/_react["default"].createElement(_ModalPopup["default"], {
      isShow: isShow,
      style: S.ROOT,
      onClose: onClose
    }, /*#__PURE__*/_react["default"].createElement(RowValueDate, {
      value: value,
      date: date
    }), /*#__PURE__*/_react["default"].createElement(RowValueDate, {
      value: valueTo,
      date: dateTo
    }), !_isNotAdminMode(isAdminMode, isDenyToChange) && /*#__PURE__*/_react["default"].createElement(_DivCompareTo["default"], {
      ref: this._refInput,
      initialValue: dateTo,
      msgErr: msgDateTo,
      onTest: isDmy,
      onEnter: this._handleEnterDate
    }));
  };

  return ModalValueMoving;
}(_react.Component);

var _default = ModalValueMoving;
exports["default"] = _default;
//# sourceMappingURL=ModalValueMoving.js.map