"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DateField = _interopRequireDefault(require("../../zhn/DateField"));

var _crRowStyle = _interopRequireDefault(require("./crRowStyle"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
const NEAR_ERR_MSG = "From Date is near that To Date";

const _isPeriodValid = (from, to) => from <= to,
      _msgOnNotValidFormat = (item = 'Date') => item + " is not in valid format";

const _getValue = ref => ref.current.getValue(),
      _getTrimValue = ref => _getValue(ref).trim(),
      _isValid = ref => ref.current.isValid(),
      _setValue = (ref, value) => ref.current.setValue(value);

const DatesFragment = /*#__PURE__*/(0, _react.forwardRef)(({
  isShowLabels = true,
  placeholder,
  fromCaption = 'From Date',
  initFromDate,
  toCaption = 'To Date',
  initToDate,
  dateStyle,
  errMsg = FORMAT_ERR_MSG,
  isPeriodValid = _isPeriodValid,
  msgOnNotValidFormat = _msgOnNotValidFormat,
  onTestDate,
  onEnter
}, ref) => {
  const _refFrom = (0, _react.useRef)(),
        _refTo = (0, _react.useRef)(),
        {
    rowStyle,
    labelStyle
  } = (0, _crRowStyle.default)({
    isShowLabels
  });

  (0, _react.useImperativeHandle)(ref, () => ({
    getValues: () => ({
      fromDate: _getValue(_refFrom),
      toDate: _getValue(_refTo)
    }),
    getValidation: () => {
      const datesMsg = [];

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
          datesMsg
        };
      }

      return {
        isValid: true
      };
    },
    focusInput: () => _refFrom.current.focus(),
    setFromTo: (fromStr, toStr) => {
      _setValue(_refFrom, fromStr);

      _setValue(_refTo, toStr);
    }
  }), [isPeriodValid, msgOnNotValidFormat]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: labelStyle,
        children: fromCaption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
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
exports.default = _default;
//# sourceMappingURL=DatesFragment.js.map