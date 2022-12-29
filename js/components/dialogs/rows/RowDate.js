"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _DateField = _interopRequireDefault(require("../../zhn/DateField"));
var _crRowStyle = _interopRequireDefault(require("./crRowStyle"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const _getCurrent = ref => ref.current;
const RowDate = _ref => {
  let {
    innerRef,
    isShowLabels,
    title = '',
    initialValue,
    errorMsg,
    onTest
  } = _ref;
  const _refDate = (0, _react.useRef)(null),
    {
      rowStyle,
      labelStyle
    } = (0, _crRowStyle.default)({
      isShowLabels
    });
  (0, _react.useImperativeHandle)(innerRef, () => ({
    getValue: () => _getCurrent(_refDate).getValue(),
    isValid: () => _getCurrent(_refDate).isValid()
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
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
var _default = RowDate;
exports.default = _default;
//# sourceMappingURL=RowDate.js.map