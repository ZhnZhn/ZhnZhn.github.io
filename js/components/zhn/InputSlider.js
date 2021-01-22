"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _has = _interopRequireDefault(require("../has"));

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
    left: 0,
    width: 'calc(15%)',
    height: '100%',
    marginRight: 6,
    backgroundColor: 'rgb(0, 188, 212)',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  LINE_AFTER: {
    position: 'absolute',
    right: 0,
    width: 'calc(85%)',
    height: '100%',
    marginLeft: 6,
    backgroundColor: 'rgb(189, 189, 189)',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  LINE_HOVERED: {
    backgroundColor: 'rgb(158, 158, 158)'
  },
  ROOT_CIRCLE: {
    boxSizing: 'borderBox',
    zIndex: '1',
    position: 'absolute',
    top: 0,
    left: '15%',
    width: 12,
    height: 12,
    cursor: 'pointer',
    pointerEvents: 'inherit',
    margin: '1px 0px 0px',
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
    width: 20,
    height: 20
  },
  CIRCLE_INNER: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    overflow: 'visible'
  },
  CIRCLE_INNER_EL: {
    position: 'absolute',
    top: -12,
    left: -12,
    width: '300%',
    height: 36,
    borderRadius: '50%',
    //opacity: '0.16',
    backgroundColor: 'rgba(0, 188, 212, 0.16)',
    transform: 'scale(1)'
  },
  EMBER: {
    top: -12,
    left: -12,
    width: '220%',
    height: 44,
    border: '1px solid #4caf50'
  }
};

var _isNaN = Number.isNaN,
    _toPercent = function _toPercent(value, min, max) {
  var _percent = (value - min) / (max - min);

  return _isNaN(_percent) ? 0 : _percent * 100;
},
    _crWidthStyle = function _crWidthStyle(percent) {
  return {
    width: "calc(" + percent + "%)"
  };
},
    _crLeftStyle = function _crLeftStyle(percent) {
  return {
    left: percent + "%"
  };
},
    hasTouch = _has["default"].touch,
    _getClienX = hasTouch ? function (evt) {
  return (((evt || {}).touches || [])[0] || {}).clientX || 0;
} : function (evt) {
  return evt.clientX;
},
    _isUp = function _isUp(keyCode) {
  return keyCode === 39 || keyCode === 38;
},
    _isDown = function _isDown(keyCode) {
  return keyCode === 37 || keyCode === 40;
};

var InputSlider = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(InputSlider, _Component);

  /*
  static propTypes = {
    step : PropTypes.number,
    min : PropTypes.number,
    max : PropTypes.number,
    onChange : PropTypes.func
  }
  */
  function InputSlider(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      hovered: false,
      dragged: false,
      value: 4
    };
    _this._evtNameMove = hasTouch ? 'touchmove' : 'mousemove';
    _this._evtNameUp = hasTouch ? 'touchend' : 'mouseup';

    _this._hKeyDown = function (evt) {
      var keyCode = evt.keyCode,
          step = _this.props.step,
          value = _this.state.value,
          _newValue = _isUp(keyCode) ? value + step : _isDown(keyCode) ? value - step : void 0;

      if (_newValue != null) {
        evt.preventDefault();

        _this._updateValue(event, _newValue);
      }
    };

    _this._hFocusTrackBt = function () {
      _this.setState({
        hovered: true
      });
    };

    _this._hBlurTrackBt = function () {
      _this.setState({
        hovered: false
      });
    };

    _this._hMouseEnter = function () {
      _this.setState({
        hovered: true
      });
    };

    _this._hMouseLeave = function () {
      _this.setState({
        hovered: false
      });
    };

    _this._hMouseDown = function (event) {
      // Cancel text selection
      if (!hasTouch) {
        event.preventDefault();
      }

      document.addEventListener(_this._evtNameMove, _this._hDragMouseMove);
      document.addEventListener(_this._evtNameUp, _this._hDragMouseUp);

      _this.setState({
        dragged: true
      });
    };

    _this._hDragMouseMove = function (event) {
      _this._onDragUpdate(event);
    };

    _this._hDragMouseUp = function () {
      document.removeEventListener(_this._evtNameMove, _this._hDragMouseMove);
      document.removeEventListener(_this._evtNameUp, _this._hDragMouseUp);

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

        var position = _getClienX(event) - _this._calcTrackOffset();

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
          max = _this$props.max;
      var value;
      value = position / positionMax * (max - min);
      value = Math.round(value / step) * step + min;
      value = _mathFn["default"].roundBy(value, 5);

      _this._updateValue(event, value);
    };

    _this._updateValue = function (event, newValue) {
      var _this$props2 = _this.props,
          min = _this$props2.min,
          max = _this$props2.max,
          onChange = _this$props2.onChange,
          value = _this.state.value,
          _newValue = newValue > max ? max : newValue < min ? min : newValue;

      if (_newValue !== value) {
        _this.setState({
          value: _newValue
        });

        if (typeof onChange === 'function') {
          onChange(event, _newValue);
        }
      }
    };

    _this._refTrack = function (comp) {
      return _this.trackComp = comp;
    };

    _this._handlers = hasTouch ? {
      onTouchStart: _this._hMouseDown
    } : {
      onMouseDown: _this._hMouseDown,
      onMouseEnter: _this._hMouseEnter,
      onMouseLeave: _this._hMouseLeave
    };
    _this._btHandlers = hasTouch ? void 0 : {
      onFocus: _this._hFocusTrackBt,
      onKeyDown: _this._hKeyDown,
      onBlur: _this._hBlurTrackBt
    };
    return _this;
  }

  var _proto = InputSlider.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        step = _this$props3.step,
        min = _this$props3.min,
        max = _this$props3.max,
        _this$state = this.state,
        hovered = _this$state.hovered,
        dragged = _this$state.dragged,
        value = _this$state.value,
        _lineAfterStyle = hovered ? (0, _extends2["default"])({}, S.LINE_AFTER, S.LINE_HOVERED) : S.LINE_AFTER,
        _circleStyle = dragged ? S.CIRCLE_DRAGGED : null,
        _emberStyle = dragged ? S.EMBER : null,
        _circleInnerEl = hovered || dragged ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: (0, _extends2["default"])({}, S.CIRCLE_INNER_EL, _emberStyle)
    }) : null,
        _percent = _toPercent(value, min, max),
        _widthBeforeStyle = _crWidthStyle(_percent),
        _widthAfterStyle = _crWidthStyle(100 - _percent),
        _leftStyle = _crLeftStyle(_percent);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2["default"])({
      style: S.ROOT
    }, this._handlers, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: this._refTrack,
        style: S.ROOT_LINE,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: (0, _extends2["default"])({}, S.LINE_BEFORE, _widthBeforeStyle)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: (0, _extends2["default"])({}, _lineAfterStyle, _widthAfterStyle)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "hidden",
          step: step,
          min: min,
          max: max,
          value: value,
          required: true
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2["default"])({
          role: "slider",
          tabIndex: 0,
          "aria-valuenow": value,
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-orientation": "horizontal",
          "aria-labelledby": "discrete-slider-custom",
          style: (0, _extends2["default"])({}, S.ROOT_CIRCLE, _circleStyle, _leftStyle)
        }, this._btHandlers, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            style: (0, _extends2["default"])({}, S.CIRCLE_INNER, _circleStyle),
            children: _circleInnerEl
          })
        }))]
      })
    }));
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