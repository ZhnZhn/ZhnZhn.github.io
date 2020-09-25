"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _InputSecret = _interopRequireDefault(require("../zhn/InputSecret"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var RowSecret = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      titleStyle = _ref.titleStyle,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["title", "titleStyle"]);
  return /*#__PURE__*/_react["default"].createElement("form", null, /*#__PURE__*/_react["default"].createElement("label", {
    style: _DialogStyles["default"].ROW
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, _DialogStyles["default"].CAPTION, titleStyle)
  }, title), /*#__PURE__*/_react["default"].createElement(_InputSecret["default"], (0, _extends2["default"])({
    ref: ref
  }, rest))));
});
/*
RowSecret.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object
}
*/

var _default = RowSecret;
exports["default"] = _default;
//# sourceMappingURL=RowSecret.js.map