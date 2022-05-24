"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ItemStack = _interopRequireDefault(require("./ItemStack"));

var _DialogStyles = require("../styles/DialogStyles");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const _crItem = (msg, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: _DialogStyles.S_VM_MSG_NUMBER,
    children: index + 1
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: _DialogStyles.S_VM_MSG,
    children: msg
  })]
}, msg);

const ValidationMessages = _ref => {
  let {
    validationMessages
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _DialogStyles.S_VM_CONT,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: validationMessages,
      crItem: _crItem
    })
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
exports.default = _default;
//# sourceMappingURL=ValidationMessages.js.map