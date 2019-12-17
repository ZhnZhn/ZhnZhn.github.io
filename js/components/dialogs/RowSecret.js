"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _InputSecret = _interopRequireDefault(require("../zhn/InputSecret"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var RowSecret =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(RowSecret, _Component);

  function RowSecret() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refInput = function (comp) {
      return _this.inputComp = comp;
    };

    return _this;
  }

  var _proto = RowSecret.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        title = _this$props.title,
        titleStyle = _this$props.titleStyle,
        rest = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["title", "titleStyle"]);
    return _react["default"].createElement("form", null, _react["default"].createElement("label", {
      style: _DialogStyles["default"].rowDiv
    }, _react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, _DialogStyles["default"].labelSpan, {}, titleStyle)
    }, title), _react["default"].createElement(_InputSecret["default"], (0, _extends2["default"])({
      ref: this._refInput
    }, rest))));
  };

  _proto.getValue = function getValue() {
    return this.inputComp.getValue();
  };

  _proto.clear = function clear() {
    this.inputComp.clear();
  };

  return RowSecret;
}(_react.Component);

RowSecret.defaultProps = {
  title: ''
};
var _default = RowSecret;
exports["default"] = _default;
//# sourceMappingURL=RowSecret.js.map