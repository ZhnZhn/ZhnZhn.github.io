"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _DialogStyles = require("../../styles/DialogStyles");
var _SpanToken = require("../../zhn/SpanToken");
var _DateField = _interopRequireDefault(require("../../zhn/DateField"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const RowDate = _ref => {
  let {
    innerRef,
    isShowLabels,
    title = '',
    initialValue,
    errorMsg,
    onTest
  } = _ref;
  const _refDate = (0, _uiApi.useRef)(null),
    [rowStyle, labelStyle] = (0, _DialogStyles.crRowLabelStyle)(isShowLabels);
  (0, _uiApi.useImperativeHandle)(innerRef, () => ({
    getValue: () => (0, _uiApi.getInputValue)(_refDate),
    isValid: () => (0, _uiApi.isInputValid)(_refDate)
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: labelStyle,
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField.default, {
      ref: _refDate,
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