"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var withProps = function withProps(overrideProps) {
  return function (BaseComponent) {
    return function (props) {
      return _react["default"].createElement(BaseComponent, (0, _extends2["default"])({}, props, overrideProps));
    };
  };
};

var _default = withProps;
exports["default"] = _default;
//# sourceMappingURL=withProps.js.map