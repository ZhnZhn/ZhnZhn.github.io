"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

//import PropTypes from "prop-types";
var CL_BT_CIRCLE = 'zhn-bt-circle';

var ButtonCircle = function ButtonCircle(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? CL_BT_CIRCLE : _ref$className,
      style = _ref.style,
      caption = _ref.caption,
      title = _ref.title,
      onClick = _ref.onClick;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: className,
    style: style,
    title: title,
    onClick: onClick,
    children: caption
  });
};
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
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map