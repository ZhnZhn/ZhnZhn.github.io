"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

//import PropTypes from "prop-types";
var _renderValidationMessages = function _renderValidationMessages(validationMessages) {
  return validationMessages.map(function (msg, index) {
    return _react["default"].createElement("div", {
      key: msg
    }, _react["default"].createElement("span", {
      style: _DialogStyles["default"].VM_MSG_NUMBER
    }, index + 1), _react["default"].createElement("span", {
      style: _DialogStyles["default"].VM_MSG
    }, msg));
  });
};

var ValidationMessages = function ValidationMessages(_ref) {
  var _ref$validationMessag = _ref.validationMessages,
      validationMessages = _ref$validationMessag === void 0 ? [] : _ref$validationMessag;
  return _react["default"].createElement("div", {
    style: _DialogStyles["default"].VM_CONT
  }, _renderValidationMessages(validationMessages));
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