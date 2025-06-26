"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _InputSwitch = _interopRequireDefault(require("../../zhn/InputSwitch"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const DF_ON_TOGGLE = () => {};
const RowCheckBox3 = _ref => {
  let {
    value,
    style,
    caption,
    onToggle = DF_ON_TOGGLE
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
    initialValue: !!value,
    caption: caption,
    style: style,
    initialValue: !!value,
    onCheck: () => onToggle(!0),
    onUnCheck: () => onToggle(!1)
  });
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  color: PropTypes.string,
  value: PropTypes.bool,

  onToggle: PropTypes.func
}
*/
var _default = exports.default = RowCheckBox3;
//# sourceMappingURL=RowCheckBox3.js.map