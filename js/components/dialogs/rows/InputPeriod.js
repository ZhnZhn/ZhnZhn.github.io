"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _SpanToken = require("../../zhn/SpanToken");
var _DateField = _interopRequireDefault(require("../../zhn/DateField"));
var _crRowLabelStyle = _interopRequireDefault(require("./crRowLabelStyle"));
var _RowFlex = require("./RowFlex");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
const NEAR_ERR_MSG = "From Date is near that To Date";
const _isPeriodValid = (from, to) => from <= to,
  _msgOnNotValidFormat = function (item) {
    if (item === void 0) {
      item = 'Date';
    }
    return item + " is not in valid format";
  };
const _getTrimValue = ref => ((0, _uiApi.getInputValue)(ref) || '').trim();
const InputPeriod = _ref => {
  let {
    refEl,
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
  } = _ref;
  const _refFrom = (0, _uiApi.useRef)(),
    _refTo = (0, _uiApi.useRef)(),
    labelStyle = (0, _crRowLabelStyle.default)({
      isShowLabels
    });
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValues: () => ({
      fromDate: (0, _uiApi.getInputValue)(_refFrom),
      toDate: (0, _uiApi.getInputValue)(_refTo)
    }),
    getValidation: () => {
      const datesMsg = [];
      if (!(0, _uiApi.isInputValid)(_refFrom)) {
        datesMsg.push(msgOnNotValidFormat('From Date'));
      }
      if (!(0, _uiApi.isInputValid)(_refTo)) {
        datesMsg.push(msgOnNotValidFormat('To Date'));
      }
      if (datesMsg.length === 0 && !isPeriodValid(_getTrimValue(_refFrom), _getTrimValue(_refTo))) {
        datesMsg.push(NEAR_ERR_MSG);
      }
      return datesMsg.length > 0 ? {
        isValid: false,
        datesMsg
      } : {
        isValid: true
      };
    },
    focusInput: () => (0, _uiApi.focusRefElement)(_refFrom),
    setFromTo: (fromStr, toStr) => {
      (0, _uiApi.setRefValue)(_refFrom, fromStr);
      (0, _uiApi.setRefValue)(_refTo, toStr);
    }
  }), [isPeriodValid, msgOnNotValidFormat]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
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
};

/*
InputPeriod.propTypes = {
  refEl: PropTypes.ref,
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
var _default = exports.default = InputPeriod;
//# sourceMappingURL=InputPeriod.js.map