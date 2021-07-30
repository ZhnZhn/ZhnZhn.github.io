"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const CL_BT_CIRCLE = 'bt-circle bt-c1 not-selected';

const ButtonCircle = ({
  className = CL_BT_CIRCLE,
  style,
  caption,
  title,
  onClick
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  className: className,
  style: style,
  title: title,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: caption
  })
});
/*
ButtonCircle.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  caption: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
}
*/


var _default = ButtonCircle;
exports.default = _default;
//# sourceMappingURL=ButtonCircle.js.map