"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _ItemStack = _interopRequireDefault(require("./ItemStack"));
var _StepTitle = _interopRequireDefault(require("./StepTitle"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const MSG_COLOR = "#f44336",
  S_VM = {
    color: MSG_COLOR,
    paddingLeft: 10,
    paddingTop: 4,
    fontWeight: "bold",
    lineHeight: 1.4
  },
  S_VM_MSG_NUMBER = (0, _styleFn.crStepStyle)(MSG_COLOR);
const _crItem = (msg, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepTitle.default, {
  step: index + 1,
  stepStyle: S_VM_MSG_NUMBER,
  title: msg
}, msg);
const ValidationMessages = _ref => {
  let {
    validationMessages
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_VM,
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
var _default = exports.default = ValidationMessages;
//# sourceMappingURL=ValidationMessages.js.map