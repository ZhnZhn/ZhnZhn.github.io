"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIcon = function SvgIcon(_ref) {
  var color = _ref.color,
      size = _ref.size,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties3.default)(_ref, ["color", "size", "children"]);
  return _react2.default.createElement(
    "svg",
    (0, _extends3.default)({
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, restProps),
    children
  );
};

SvgIcon.defaultProps = {
  color: 'currentColor',
  size: '24'
};

exports.default = SvgIcon;
//# sourceMappingURL=SvgIcon.js.map