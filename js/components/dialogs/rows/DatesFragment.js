"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DateField = _interopRequireDefault(require("../../zhn/DateField"));

var _crRowStyle2 = _interopRequireDefault(require("./crRowStyle"));

//import PropTypes from "prop-types";
var FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
var NEAR_ERR_MSG = "From Date is near that To Date";

var _isPeriodValid = function _isPeriodValid(from, to) {
  return from <= to;
},
    _msgOnNotValidFormat = function _msgOnNotValidFormat(item) {
  if (item === void 0) {
    item = 'Date';
  }

  return item + " is not in valid format";
};

var _getValue = function _getValue(ref) {
  return ref.current.getValue();
},
    _getTrimValue = function _getTrimValue(ref) {
  return _getValue(ref).trim();
},
    _isValid = function _isValid(ref) {
  return ref.current.isValid();
},
    _setValue = function _setValue(ref, value) {
  return ref.current.setValue(value);
};

var DatesFragment = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$isShowLabels = _ref.isShowLabels,
      isShowLabels = _ref$isShowLabels === void 0 ? true : _ref$isShowLabels,
      placeholder = _ref.placeholder,
      _ref$fromCaption = _ref.fromCaption,
      fromCaption = _ref$fromCaption === void 0 ? 'From Date:' : _ref$fromCaption,
      initFromDate = _ref.initFromDate,
      _ref$toCaption = _ref.toCaption,
      toCaption = _ref$toCaption === void 0 ? 'To Date:' : _ref$toCaption,
      initToDate = _ref.initToDate,
      dateStyle = _ref.dateStyle,
      _ref$errMsg = _ref.errMsg,
      errMsg = _ref$errMsg === void 0 ? FORMAT_ERR_MSG : _ref$errMsg,
      _ref$isPeriodValid = _ref.isPeriodValid,
      isPeriodValid = _ref$isPeriodValid === void 0 ? _isPeriodValid : _ref$isPeriodValid,
      _ref$msgOnNotValidFor = _ref.msgOnNotValidFormat,
      msgOnNotValidFormat = _ref$msgOnNotValidFor === void 0 ? _msgOnNotValidFormat : _ref$msgOnNotValidFor,
      onTestDate = _ref.onTestDate,
      onEnter = _ref.onEnter;

  var _refFrom = (0, _react.useRef)(),
      _refTo = (0, _react.useRef)(),
      _crRowStyle = (0, _crRowStyle2["default"])({
    isShowLabels: isShowLabels
  }),
      rowStyle = _crRowStyle.rowStyle,
      labelStyle = _crRowStyle.labelStyle;

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getValues: function getValues() {
        return {
          fromDate: _getValue(_refFrom),
          toDate: _getValue(_refTo)
        };
      },
      getValidation: function getValidation() {
        var datesMsg = [];

        if (!_isValid(_refFrom)) {
          datesMsg.push(msgOnNotValidFormat('From Date'));
        }

        if (!_isValid(_refTo)) {
          datesMsg.push(msgOnNotValidFormat('To Date'));
        }

        if (datesMsg.length === 0 && !isPeriodValid(_getTrimValue(_refFrom), _getTrimValue(_refTo))) {
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
      },
      focusInput: function focusInput() {
        return _refFrom.current.focus();
      },
      setFromTo: function setFromTo(fromStr, toStr) {
        _setValue(_refFrom, fromStr);

        _setValue(_refTo, toStr);
      }
    };
  }, [isPeriodValid, msgOnNotValidFormat]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: labelStyle,
        children: fromCaption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField["default"], {
        ref: _refFrom,
        style: dateStyle,
        placeholder: placeholder,
        initialValue: initFromDate,
        errorMsg: errMsg,
        onTest: onTestDate,
        onEnter: onEnter
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: labelStyle,
        children: toCaption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField["default"], {
        ref: _refTo,
        style: dateStyle,
        placeholder: placeholder,
        initialValue: initToDate,
        errorMsg: errMsg,
        onTest: onTestDate,
        onEnter: onEnter
      })]
    })]
  });
});
/*
DatesFragment.propTypes = {
  isShowLabels: PropTypes.bool,
  dateStyle: PropTypes.object,
  placeholder: PropTypes.string,
  initFromDate: PropTypes.string,
  initToDate: PropTypes.string,
  fromCaption: PropTypes.string,
  toCaption: PropTypes.string,
  errMsg: PropTypes.string,
  onTestDate: PropTypes.func,
  isPeriodValid: PropTypes.func,
  msgOnNotValidFormat: PropTypes.func,
  onEnter: PropTypes.func
}
*/

var _default = DatesFragment;
exports["default"] = _default;
//# sourceMappingURL=DatesFragment.js.map