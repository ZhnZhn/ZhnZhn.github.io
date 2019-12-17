"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Color = _interopRequireDefault(require("../styles/Color"));

//import PropTypes from "prop-types";
var S = {
  DIV: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  SVG: {
    display: 'inline-block'
  }
};
var E = {
  KEY: " ",
  KEY_CODE: 32
};
var C_GREY = "#777777";

var SvgChecked = function SvgChecked(_ref) {
  var stroke = _ref.stroke;
  return _react["default"].createElement("path", {
    d: "M 2,5 L 8,14 14,1",
    strokeWidth: "2",
    strokeLinecap: "round",
    stroke: stroke,
    fill: _Color["default"].BLANK
  });
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _getInitStateFrom = function _getInitStateFrom(_ref2) {
  var initValue = _ref2.initValue,
      value = _ref2.value;
  return {
    initValue: initValue,
    isChecked: !!value
  };
};

var SvgCheckBox =
/*#__PURE__*/
function (_Component) {
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
  function SvgCheckBox(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._hClick = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          _isOnCheck = _assertThisInitialize._isOnCheck,
          _isOnUnCheck = _assertThisInitialize._isOnUnCheck,
          state = _assertThisInitialize.state,
          props = _assertThisInitialize.props,
          onCheck = props.onCheck,
          onUnCheck = props.onUnCheck,
          isChecked = state.isChecked;

      if (!isChecked && _isOnCheck) {
        onCheck((0, _assertThisInitialized2["default"])(_this));
      } else if (_isOnUnCheck) {
        onUnCheck((0, _assertThisInitialized2["default"])(_this));
      }

      _this.setState({
        isChecked: !isChecked
      });
    };

    _this._hKeyDown = function (evt) {
      if (evt.key === E.KEY || evt.keyCode === E.KEY_CODE) {
        evt.preventDefault();

        _this._hClick();
      }
    };

    _this.setUnchecked = function () {
      _this.setState({
        isChecked: false
      });
    };

    var _onCheck = _props.onCheck,
        _onUnCheck = _props.onUnCheck;
    _this._isOnCheck = _isFn(_onCheck);
    _this._isOnUnCheck = _isFn(_onUnCheck);
    _this.state = _getInitStateFrom(_props);
    return _this;
  }

  SvgCheckBox.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return props.initValue !== state.initValue ? _getInitStateFrom(props) : null;
  };

  var _proto = SvgCheckBox.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        checkedRestStroke = _this$props.checkedRestStroke,
        checkedRestFill = _this$props.checkedRestFill,
        checkedColor = _this$props.checkedColor,
        _this$props$value = _this$props.value,
        value = _this$props$value === void 0 ? this.state.isChecked : _this$props$value,
        _restStroke = value ? checkedRestStroke : C_GREY,
        _restFill = value ? checkedRestFill : _Color["default"].BLANK;

    return _react["default"].createElement("div", {
      role: "checkbox",
      tabIndex: "0",
      "aria-checked": value //aria-labelledby
      ,
      style: (0, _extends2["default"])({}, S.DIV, {}, style),
      onClick: this._hClick,
      onKeyDown: this._hKeyDown
    }, _react["default"].createElement("svg", {
      viewBox: "0 0 16 16",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: S.SVG
    }, _react["default"].createElement("rect", {
      x: "1",
      y: "1",
      height: "14",
      width: "14",
      strokeWidth: "2",
      rx: "3",
      stroke: _restStroke,
      fill: _restFill
    }), value ? _react["default"].createElement(SvgChecked, {
      stroke: checkedColor
    }) : null));
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