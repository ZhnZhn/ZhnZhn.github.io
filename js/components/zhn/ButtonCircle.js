"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

//import PropTypes from "prop-types";
var CL = {
  ROOT: 'zhn-bt-circle',
  NOT: 'not-selected'
};

var ButtonCircle = function ButtonCircle(_ref) {
  var isOverwriteClass = _ref.isOverwriteClass,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      style = _ref.style,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? '' : _ref$caption,
      title = _ref.title,
      onClick = _ref.onClick;

  var _className = isOverwriteClass ? className + " " + CL.NOT : CL.ROOT + " " + className + " " + CL.NOT;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: _className,
    style: style,
    title: title,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: caption
    })
  });
};
/*
ButtonCircle.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  caption: PropTypes.string,
  title: PropTypes.string,
  isWithoutDefault: PropTypes.bool,
  onClick: PropTypes.func
}
*/


var _default = ButtonCircle;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map