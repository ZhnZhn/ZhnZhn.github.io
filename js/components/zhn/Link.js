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

var Link = function Link(_ref) {
  var title = _ref.title,
      dfStyle = _ref.dfStyle,
      style = _ref.style,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["title", "dfStyle", "style"]);
  return _react2.default.createElement(
    "a",
    (0, _extends3.default)({
      target: "_blank",
      className: "link",
      style: (0, _extends3.default)({}, dfStyle, style)
    }, rest),
    title
  );
};

exports.default = Link;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\Link.js.map