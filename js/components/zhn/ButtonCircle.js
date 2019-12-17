"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var CL = {
  ROOT: 'zhn-bt-circle',
  NOT: 'not-selected'
};

var ButtonCircle = function ButtonCircle(props) {
  var _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      style = props.style,
      _props$caption = props.caption,
      caption = _props$caption === void 0 ? '' : _props$caption,
      title = props.title,
      isWithoutDefault = props.isWithoutDefault,
      onClick = props.onClick,
      _className = isWithoutDefault ? className + " " + CL.NOT : CL.ROOT + " " + className + " " + CL.NOT;

  return _react["default"].createElement("button", {
    className: _className,
    style: style,
    title: title,
    onClick: onClick
  }, _react["default"].createElement("div", null, caption));
};

var _default = ButtonCircle;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle.js.map