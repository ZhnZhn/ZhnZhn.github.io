"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DateField = _interopRequireDefault(require("../../zhn/DateField"));

var _crRowStyle2 = _interopRequireDefault(require("./crRowStyle"));

//import PropTypes from "prop-types";
var RowDate = function RowDate(_ref) {
  var innerRef = _ref.innerRef,
      isShowLabels = _ref.isShowLabels,
      _ref$labelTitle = _ref.labelTitle,
      labelTitle = _ref$labelTitle === void 0 ? '' : _ref$labelTitle,
      initValue = _ref.initValue,
      errorMsg = _ref.errorMsg,
      onTestDate = _ref.onTestDate;

  var _refDate = (0, _react.useRef)(null),
      _crRowStyle = (0, _crRowStyle2["default"])({
    isShowLabels: isShowLabels
  }),
      rowStyle = _crRowStyle.rowStyle,
      labelStyle = _crRowStyle.labelStyle;

  (0, _react.useImperativeHandle)(innerRef, function () {
    return {
      getValue: function getValue() {
        return _refDate.current.getValue();
      },
      isValid: function isValid() {
        return _refDate.current.isValid;
      }
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: labelStyle,
      children: labelTitle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateField["default"], {
      ref: _refDate,
      initialValue: initValue,
      errorMsg: errorMsg,
      onTest: onTestDate
    })]
  });
};
/*
RowDate.propTypes = {
  innerRef: PropTypes.object,
  isShowLabels: PropTypes.bool,
  labelTitle : PropTypes.string,
  initValue : PropTypes.string,
  errorMsg : PropTypes.string,
  onTestDate : PropTypes.func
}
*/


var _default = RowDate;
exports["default"] = _default;
//# sourceMappingURL=RowDate.js.map