"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

//import PropTypes from "prop-types";
var _renderValidationMessages = function _renderValidationMessages(validationMessages) {
  return validationMessages.map(function (msg, index) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _DialogStyles["default"].VM_MSG_NUMBER,
        children: index + 1
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _DialogStyles["default"].VM_MSG,
        children: msg
      })]
    }, msg);
  });
};

var ValidationMessages = function ValidationMessages(_ref) {
  var _ref$validationMessag = _ref.validationMessages,
      validationMessages = _ref$validationMessag === void 0 ? [] : _ref$validationMessag;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _DialogStyles["default"].VM_CONT,
    children: _renderValidationMessages(validationMessages)
  });
};
/*
ValidationMessages.propTypes = {
  validationMessages : PropTypes.arrayOf(PropTypes.shape({
    msg: PropTypes.string
  }))
}
*/


var _default = ValidationMessages;
exports["default"] = _default;
//# sourceMappingURL=ValidationMessages.js.map