"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _InputPattern = _interopRequireDefault(require("../../zhn/InputPattern"));

var _useRow2 = _interopRequireDefault(require("./useRow"));

//import PropTypes from "prop-types";
var RowPattern =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(RowPattern, _Component);

  function RowPattern() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refInput = function (c) {
      return _this.inputPattern = c;
    };

    return _this;
  }

  var _proto = RowPattern.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        isShowLabels = _this$props.isShowLabels,
        caption = _this$props.caption,
        captionStyle = _this$props.captionStyle,
        rest = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["isShowLabels", "caption", "captionStyle"]),
        _useRow = (0, _useRow2["default"])({
      isShowLabels: isShowLabels,
      caption: caption,
      captionStyle: captionStyle
    }),
        rowStyle = _useRow.rowStyle,
        labelStyle = _useRow.labelStyle,
        _caption = _useRow.caption;

    return _react["default"].createElement("div", {
      style: rowStyle
    }, _react["default"].createElement("span", {
      style: labelStyle
    }, _caption), _react["default"].createElement(_InputPattern["default"], (0, _extends2["default"])({
      ref: this._refInput
    }, rest)));
  };

  _proto.getValue = function getValue() {
    return this.inputPattern.getValue();
  };

  _proto.isValid = function isValid() {
    return this.inputPattern.isValid();
  };

  return RowPattern;
}(_react.Component);

var _default = RowPattern;
exports["default"] = _default;
//# sourceMappingURL=RowPattern.js.map