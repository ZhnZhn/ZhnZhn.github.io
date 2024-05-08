"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _SpanToken = require("../../zhn/SpanToken");
var _DateField = _interopRequireDefault(require("../../zhn/DateField"));
var _RowFlex = require("./RowFlex");
var _crRowLabelStyle = _interopRequireDefault(require("./crRowLabelStyle"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const RowDate = props => {
  const {
      innerRef,
      title = '',
      initialValue,
      errorMsg,
      onTest
    } = props,
    _refDate = (0, _uiApi.useRef)(null);
  (0, _uiApi.useImperativeHandle)(innerRef, () => ({
    getValue: () => (0, _uiApi.getInputValue)(_refDate),
    isValid: () => (0, _uiApi.isInputValid)(_refDate)
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: (0, _crRowLabelStyle.default)(props),
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
      refEl: _refDate,
      initialValue: initialValue,
      errorMsg: errorMsg,
      onTest: onTest
    })]
  });
};

/*
RowDate.propTypes = {
  innerRef: PropTypes.object,
  isShowLabels: PropTypes.bool,
  title: PropTypes.string,
  initialValue: PropTypes.string,
  errorMsg: PropTypes.string,
  onTest: PropTypes.func
}
*/
var _default = exports.default = RowDate;
//# sourceMappingURL=RowDate.js.map