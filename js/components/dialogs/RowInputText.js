"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

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

var RowInputText = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var styleRoot = props.styleRoot,
      rootStyle = props.rootStyle,
      captionStyle = props.captionStyle,
      styleCaption = props.styleCaption,
      _props$caption = props.caption,
      caption = _props$caption === void 0 ? 'Input' : _props$caption,
      inputStyle = props.inputStyle,
      styleInput = props.styleInput,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(props, ["styleRoot", "rootStyle", "captionStyle", "styleCaption", "caption", "inputStyle", "styleInput"]),
      _rootStyle = rootStyle || (0, _extends2["default"])({}, S.ROOT, styleRoot),
      _captionStyle = captionStyle || (0, _extends2["default"])({}, S.CAPTION, styleCaption),
      _inputStyle = inputStyle || (0, _extends2["default"])({}, S.INPUT_TEXT, styleInput),
      _caption = caption.indexOf(COLLON) === -1 ? caption + COLLON : caption;

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _rootStyle
  }, /*#__PURE__*/_react["default"].createElement("label", null, /*#__PURE__*/_react["default"].createElement("span", {
    style: _captionStyle
  }, _caption), /*#__PURE__*/_react["default"].createElement(_InputText["default"], (0, _extends2["default"])({
    ref: ref,
    style: _inputStyle
  }, rest))));
});
/*
RowInputText.propTypes= {
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/


var _default = RowInputText;
exports["default"] = _default;
//# sourceMappingURL=RowInputText.js.map