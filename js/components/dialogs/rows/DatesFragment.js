"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _DateField = _interopRequireDefault(require("../../zhn/DateField"));

var _crRowStyle2 = _interopRequireDefault(require("./crRowStyle"));

//import PropTypes from "prop-types";
var FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
var NEAR_ERR_MSG = "From Date is near that To Date";

var DatesFragment = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DatesFragment, _Component);

  function DatesFragment() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refFromDate = function (c) {
      return _this.fromDate = c;
    };

    _this._refToDate = function (c) {
      return _this.toDate = c;
    };

    return _this;
  }

  var _proto = DatesFragment.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        isShowLabels = _this$props.isShowLabels,
        placeholder = _this$props.placeholder,
        fromCaption = _this$props.fromCaption,
        initFromDate = _this$props.initFromDate,
        toCaption = _this$props.toCaption,
        initToDate = _this$props.initToDate,
        dateStyle = _this$props.dateStyle,
        nForecastDate = _this$props.nForecastDate,
        errMsg = _this$props.errMsg,
        onTestDate = _this$props.onTestDate,
        onEnter = _this$props.onEnter,
        _crRowStyle = (0, _crRowStyle2["default"])({
      isShowLabels: isShowLabels
    }),
        rowStyle = _crRowStyle.rowStyle,
        labelStyle = _crRowStyle.labelStyle;

    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/_react["default"].createElement("span", {
      style: labelStyle
    }, fromCaption), /*#__PURE__*/_react["default"].createElement(_DateField["default"], {
      ref: this._refFromDate,
      rootStyle: dateStyle,
      placeholder: placeholder,
      initialValue: initFromDate,
      errorMsg: errMsg,
      onTest: onTestDate,
      onEnter: onEnter
    })), /*#__PURE__*/_react["default"].createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/_react["default"].createElement("span", {
      style: labelStyle
    }, toCaption), /*#__PURE__*/_react["default"].createElement(_DateField["default"], {
      ref: this._refToDate,
      rootStyle: dateStyle,
      placeholder: placeholder,
      initialValue: initToDate,
      nForecastDate: nForecastDate,
      errorMsg: errMsg,
      onTest: onTestDate,
      onEnter: onEnter
    })));
  };

  _proto.getValues = function getValues() {
    return {
      fromDate: this.fromDate.getValue(),
      toDate: this.toDate.getValue()
    };
  };

  _proto.getValidation = function getValidation() {
    var fromDate = this.fromDate,
        toDate = this.toDate,
        _this$props2 = this.props,
        msgOnNotValidFormat = _this$props2.msgOnNotValidFormat,
        isPeriodValid = _this$props2.isPeriodValid,
        datesMsg = [];

    if (!fromDate.isValid()) {
      datesMsg.push(msgOnNotValidFormat('From Date'));
    }

    if (!toDate.isValid()) {
      datesMsg.push(msgOnNotValidFormat('To Date'));
    }

    if (datesMsg.length === 0 && !isPeriodValid(fromDate.getValue().trim(), toDate.getValue().trim())) {
      datesMsg.push(NEAR_ERR_MSG);
    }

    if (datesMsg.length > 0) {
      return {
        isValid: false,
        datesMsg: datesMsg
      };
    }

    return {
      isValid: true
    };
  };

  _proto.focusInput = function focusInput() {
    this.fromDate.focus();
  };

  _proto.focusNotValidInput = function focusNotValidInput() {
    if (!this.fromDate.isValid()) {
      this.fromDate.focus();
      return true;
    }

    if (!this.toDate.isValid()) {
      this.toDate.focus();
      return true;
    }

    return false;
  };

  _proto.setFromTo = function setFromTo(fromStr, toStr) {
    this._setFromDate(fromStr);

    this._setToDate(toStr);
  };

  _proto._setFromDate = function _setFromDate(dateStr) {
    if (this.fromDate) {
      this.fromDate.setValue(dateStr);
    }
  };

  _proto._setToDate = function _setToDate(dateStr) {
    if (this.toDate) {
      this.toDate.setValue(dateStr);
    }
  };

  return DatesFragment;
}(_react.Component);

DatesFragment.defaultProps = {
  isShowLabels: true,
  fromCaption: 'From Date:',
  toCaption: 'To Date:',
  errMsg: FORMAT_ERR_MSG,
  msgOnNotValidFormat: function msgOnNotValidFormat(item) {
    if (item === void 0) {
      item = 'Date';
    }

    return item + " is not in valid format";
  },
  isPeriodValid: function isPeriodValid(from, to) {
    return from <= to;
  }
};
var _default = DatesFragment;
exports["default"] = _default;
//# sourceMappingURL=DatesFragment.js.map