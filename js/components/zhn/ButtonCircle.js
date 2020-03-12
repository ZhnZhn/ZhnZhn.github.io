"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

//import PropTypes from "prop-types";
var CL = {
  ROOT: 'zhn-bt-circle',
  NOT: 'not-selected'
};

var ButtonCircle = function ButtonCircle(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      style = _ref.style,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? '' : _ref$caption,
      title = _ref.title,
      isWithoutDefault = _ref.isWithoutDefault,
      onClick = _ref.onClick;

  var _className = isWithoutDefault ? className + " " + CL.NOT : CL.ROOT + " " + className + " " + CL.NOT;

  return _react["default"].createElement("button", {
    className: _className,
    style: style,
    title: title,
    onClick: onClick
  }, _react["default"].createElement("div", null, caption));
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