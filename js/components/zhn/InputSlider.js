"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _mathFn = _interopRequireDefault(require("../../math/mathFn"));

//import PropTypes from "prop-types";

/*
 Mostly from
 https://github.com/callemall/material-ui/blob/master/src/Slider/Slider.js
*/
var S = {
  ROOT: {
    position: 'relative',
    width: '100%',
    height: 18,
    marginTop: 8,
    marginBottom: 8,
    userSelect: 'none',
    cursor: 'default'
  },
  ROOT_LINE: {
    position: 'absolute',
    top: 8,
    left: 0,
    width: '100%',
    height: 2
  },
  LINE_BEFORE: {
    position: 'absolute',
    width: 'calc(15%)',
    height: '100%',
    left: 0,
    marginRight: 6,
    backgroundColor: 'rgb(0, 188, 212)',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  LINE_AFTER: {
    position: 'absolute',
    height: '100%',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    right: '0px',
    backgroundColor: 'rgb(189, 189, 189)',
    marginLeft: '6px',
    width: 'calc(85%)'
  },
  LINE_HOVERED: {
    backgroundColor: 'rgb(158, 158, 158)'
  },
  ROOT_CIRCLE: {
    boxSizing: 'borderBox',
    position: 'absolute',
    cursor: 'pointer',
    pointerEvents: 'inherit',
    top: '0px',
    left: '15%',
    zIndex: '1',
    margin: '1px 0px 0px',
    width: '12px',
    height: '12px',
    backgroundColor: 'rgb(0, 188, 212)',
    backgroundClip: 'padding-box',
    border: '0px solid transparent',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible',
    outline: 'none',
    transition: 'background 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  CIRCLE_DRAGGED: {
    width: '20px',
    height: '20px '
  },
  CIRCLE_INNER: {
    position: 'absolute',
    overflow: 'visible',
    height: '12px',
    width: '12px',
    top: '0px',
    left: '0px'
  },
  CIRCLE_INNER_EL: {
    position: 'absolute',
    height: '36px',
    width: '300%',
    borderRadius: '50%',
    //opacity: '0.16',
    backgroundColor: 'rgba(0, 188, 212, 0.16)',
    top: '-12px',
    left: '-12px',
    transform: 'scale(1)'
  },
  EMBER: {
    top: '-12px',
    left: '-12px',
    height: '44px',
    width: '220%',
    border: '1px solid #4caf50'
  }
};

var _toPercent = function _toPercent(value, min, max) {
  var _percent = (value - min) / (max - min);

  return isNaN(_percent) ? 0 : _percent * 100;
};

var _crWidthStyle = function _crWidthStyle(percent) {
  return {
    width: "calc(" + percent + "%)"
  };
};

var _crLeftStyle = function _crLeftStyle(percent) {
  return {
    left: percent + "%"
  };
};

var InputSlider = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(InputSlider, _Component);

  function InputSlider() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      hovered: false,
      dragged: false,
      value: 4
    };

    _this._handleMouseEnter = function () {
      _this.setState({
        hovered: true
      });
    };

    _this._handleMouseLeave = function () {
      _this.setState({
        hovered: false
      });
    };

    _this._handleMouseDown = function (event) {
      // Cancel text selection
      event.preventDefault();
      document.addEventListener('mousemove', _this._handleDragMouseMove);
      document.addEventListener('mouseup', _this._handleDragMouseUp);

      _this.setState({
        dragged: true
      });
    };

    _this._handleDragMouseMove = function (event) {
      _this._onDragUpdate(event);
    };

    _this._handleDragMouseUp = function () {
      document.removeEventListener('mousemove', _this._handleDragMouseMove);
      document.removeEventListener('mouseup', _this._handleDragMouseUp);

      _this.setState({
        dragged: false
      });
    };

    _this._onDragUpdate = function (event) {
      if (_this.dragRunning) {
        return;
      }

      _this.dragRunning = true;
      requestAnimationFrame(function () {
        _this.dragRunning = false;

        var position = event.clientX - _this._calcTrackOffset();

        _this._setValueFromPosition(event, position);
      });
    };

    _this._calcTrackOffset = function () {
      return _this.trackComp.getBoundingClientRect()['left'];
    };

    _this._setValueFromPosition = function (event, position) {
      var positionMax = _this.trackComp['clientWidth'];

      if (position < 0) {
        position = 0;
      } else if (position > positionMax) {
        position = positionMax;
      }

      var _this$props = _this.props,
          step = _this$props.step,
          min = _this$props.min,
          max = _this$props.max,
          onChange = _this$props.onChange;
      var value;
      value = position / positionMax * (max - min);
      value = Math.round(value / step) * step + min;
      value = _mathFn["default"].roundBy(value, 5);

      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }

      if (_this.state.value !== value) {
        _this.setState({
          value: value
        });

        if (typeof onChange === 'function') {
          onChange(event, value);
        }
      }
    };

    _this._refTrack = function (comp) {
      return _this.trackComp = comp;
    };

    return _this;
  }

  var _proto = InputSlider.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        step = _this$props2.step,
        min = _this$props2.min,
        max = _this$props2.max,
        _this$state = this.state,
        hovered = _this$state.hovered,
        dragged = _this$state.dragged,
        value = _this$state.value,
        _lineAfterStyle = hovered ? (0, _extends2["default"])({}, S.LINE_AFTER, S.LINE_HOVERED) : S.LINE_AFTER,
        _circleStyle = dragged ? S.CIRCLE_DRAGGED : null,
        _emberStyle = dragged ? S.EMBER : null,
        _circleInnerEl = hovered || dragged ? /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.CIRCLE_INNER_EL, _emberStyle)
    }) : null,
        _percent = _toPercent(value, min, max),
        _widthBeforeStyle = _crWidthStyle(_percent),
        _widthAfterStyle = _crWidthStyle(100 - _percent),
        _leftStyle = _crLeftStyle(_percent);

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: S.ROOT,
      onMouseDown: this._handleMouseDown,
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave
    }, /*#__PURE__*/_react["default"].createElement("div", {
      ref: this._refTrack,
      style: S.ROOT_LINE
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.LINE_BEFORE, _widthBeforeStyle)
    }), /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, _lineAfterStyle, _widthAfterStyle)
    }), /*#__PURE__*/_react["default"].createElement("div", {
      tabIndex: 0,
      style: (0, _extends2["default"])({}, S.ROOT_CIRCLE, _circleStyle, _leftStyle)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.CIRCLE_INNER, _circleStyle)
    }, _circleInnerEl)), /*#__PURE__*/_react["default"].createElement("input", {
      type: "hidden",
      step: step,
      min: min,
      max: max,
      value: value,
      required: true
    })));
  };

  return InputSlider;
}(_react.Component);

InputSlider.defaultProps = {
  min: 0,
  max: 20,
  step: 1
};
var _default = InputSlider;
exports["default"] = _default;
//# sourceMappingURL=InputSlider.js.map