"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DateField = _interopRequireDefault(require("../../zhn/DateField"));

var _crRowStyle2 = _interopRequireDefault(require("./crRowStyle"));

//import PropTypes from "prop-types";
var _getCurrent = function _getCurrent(ref) {
  return ref.current;
};

var RowDate = function RowDate(_ref) {
  var innerRef = _ref.innerRef,
      isShowLabels = _ref.isShowLabels,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      initialValue = _ref.initialValue,
      errorMsg = _ref.errorMsg,
      onTest = _ref.onTest;

  var _refDate = (0, _react.useRef)(null),
      _crRowStyle = (0, _crRowStyle2["default"])({
    isShowLabels: isShowLabels
  }),
      rowStyle = _crRowStyle.rowStyle,
      labelStyle = _crRowStyle.labelStyle;

  (0, _react.useImperativeHandle)(innerRef, function () {
    return {
      getValue: function getValue() {
        return _getCurrent(_refDate).getValue();
      },
      isValid: function isValid() {
        return _getCurrent(_refDate).isValid();
      }
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: labelStyle,
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField["default"], {
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
exports["default"] = _default;
//# sourceMappingURL=RowDate.js.map