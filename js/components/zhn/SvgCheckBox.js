"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _isKeyEnter = _interopRequireDefault(require("./isKeyEnter"));

var _Color = _interopRequireDefault(require("../styles/Color"));

//import PropTypes from "prop-types";
var CL_CHB = 'chb';
var S = {
  SVG: {
    display: 'inline-block'
  }
};
var C_GREY = "#777777";

var SvgChecked = function SvgChecked(_ref) {
  var stroke = _ref.stroke;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
    d: "M 2,5 L 8,14 14,1",
    strokeWidth: "2",
    strokeLinecap: "round",
    stroke: stroke,
    fill: _Color["default"].BLANK
  });
};

var _isBool = function _isBool(bool) {
  return typeof bool === 'boolean';
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SvgCheckBox = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SvgCheckBox, _Component);

  /*
  static propTypes = {
    initValue: PropTypes.bool,
    value: PropTypes.bool,
    style: PropTypes.object,
    checkedRestStroke: PropTypes.string,
    checkedRestFill: PropTypes.string,
    checkedColor: PropTypes.string,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */
  function SvgCheckBox(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClick = function () {
      var _this$props = _this.props,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? _this.state.isChecked : _this$props$value,
          onCheck = _this$props.onCheck,
          onUnCheck = _this$props.onUnCheck;

      if (value && _isFn(onUnCheck)) {
        onUnCheck((0, _assertThisInitialized2["default"])(_this));
      } else if (_isFn(onCheck)) {
        onCheck((0, _assertThisInitialized2["default"])(_this));
      }

      _this.setState({
        isChecked: !value
      });
    };

    _this._hKeyDown = function (evt) {
      if ((0, _isKeyEnter["default"])(evt)) {
        evt.preventDefault();

        _this._hClick();
      }
    };

    _this.setUnchecked = function () {
      _this.setState({
        isChecked: false
      });
    };

    var _value = props.value,
        initialValue = props.initialValue;
    _this.state = {
      isChecked: _isBool(_value) ? _value : !!initialValue
    };
    return _this;
  }

  var _proto = SvgCheckBox.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        style = _this$props2.style,
        checkedRestStroke = _this$props2.checkedRestStroke,
        checkedRestFill = _this$props2.checkedRestFill,
        checkedColor = _this$props2.checkedColor,
        _this$props2$value = _this$props2.value,
        value = _this$props2$value === void 0 ? this.state.isChecked : _this$props2$value,
        _restStroke = value ? checkedRestStroke : C_GREY,
        _restFill = value ? checkedRestFill : _Color["default"].BLANK;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      role: "checkbox",
      tabIndex: "0",
      "aria-checked": value //aria-labelledby
      ,
      className: CL_CHB,
      style: style,
      onClick: this._hClick,
      onKeyDown: this._hKeyDown,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
        viewBox: "0 0 16 16",
        width: "100%",
        height: "100%",
        preserveAspectRatio: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: S.SVG,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
          x: "1",
          y: "1",
          height: "14",
          width: "14",
          strokeWidth: "2",
          rx: "3",
          stroke: _restStroke,
          fill: _restFill
        }), value ? /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgChecked, {
          stroke: checkedColor
        }) : null]
      })
    });
  };

  return SvgCheckBox;
}(_react.Component);

SvgCheckBox.defaultProps = {
  checkedRestStroke: C_GREY,
  checkedRestFill: _Color["default"].BLANK,
  checkedColor: _Color["default"].YELLOW
};
var _default = SvgCheckBox;
exports["default"] = _default;
//# sourceMappingURL=SvgCheckBox.js.map