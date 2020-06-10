"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

//import PropTypes from "prop-types";
var S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 220,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};
var COLLON = ':';

var RowInputText = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(RowInputText, _Component);

  function RowInputText() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refInput = function (node) {
      return _this._inputComp = node;
    };

    return _this;
  }

  var _proto = RowInputText.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        styleRoot = _this$props.styleRoot,
        rootStyle = _this$props.rootStyle,
        captionStyle = _this$props.captionStyle,
        styleCaption = _this$props.styleCaption,
        caption = _this$props.caption,
        inputStyle = _this$props.inputStyle,
        styleInput = _this$props.styleInput,
        rest = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["styleRoot", "rootStyle", "captionStyle", "styleCaption", "caption", "inputStyle", "styleInput"]),
        _rootStyle = rootStyle || (0, _extends2["default"])({}, S.ROOT, styleRoot),
        _captionStyle = captionStyle || (0, _extends2["default"])({}, S.CAPTION, styleCaption),
        _inputStyle = inputStyle || (0, _extends2["default"])({}, S.INPUT_TEXT, styleInput),
        _caption = caption.indexOf(COLLON) === -1 ? caption + COLLON : caption;

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: _rootStyle
    }, /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("span", {
      style: _captionStyle
    }, _caption), /*#__PURE__*/_react["default"].createElement(_InputText["default"], (0, _extends2["default"])({
      ref: this._refInput,
      style: _inputStyle
    }, rest))));
  };

  _proto.getValue = function getValue() {
    return this._inputComp.getValue();
  };

  return RowInputText;
}(_react.Component);

RowInputText.defaultProps = {
  caption: 'Input'
};
var _default = RowInputText;
exports["default"] = _default;
//# sourceMappingURL=RowInputText.js.map