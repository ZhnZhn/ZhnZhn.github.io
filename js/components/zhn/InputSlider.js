"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _has = _interopRequireDefault(require("../has"));

var _mathFn = require("../../math/mathFn");

var _CircleInner = _interopRequireDefault(require("./CircleInner"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const S_ROOT = {
  position: 'relative',
  width: '100%',
  height: 18,
  margin: '8px 0',
  userSelect: 'none',
  cursor: 'default'
},
      S_ROOT_LINE = {
  position: 'absolute',
  top: 8,
  left: 0,
  width: '100%',
  height: 2
},
      S_LINE_BEFORE = {
  position: 'absolute',
  left: 0,
  width: 'calc(15%)',
  height: '100%',
  marginRight: 6,
  backgroundColor: '#00bcd4',
  transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
},
      S_LINE_AFTER = {
  position: 'absolute',
  right: 0,
  width: 'calc(85%)',
  height: '100%',
  marginLeft: 6,
  backgroundColor: '#bdbdbd',
  transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
},
      S_LINE_AFTER_HOVERED = { ...S_LINE_AFTER,
  backgroundColor: '#9e9e9e'
},
      S_ROOT_CIRCLE = {
  boxSizing: 'border-box',
  zIndex: '1',
  position: 'absolute',
  top: 0,
  left: '15%',
  width: 12,
  height: 12,
  cursor: 'pointer',
  pointerEvents: 'inherit',
  margin: '1px 0px 0px',
  backgroundColor: '#00bcd4',
  backgroundClip: 'padding-box',
  border: '0px solid transparent',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'visible',
  outline: 'none',
  transition: 'background 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
},
      S_CIRCLE_DRAGGED = {
  width: 20,
  height: 20
},
      S_EMBER = {
  top: -12,
  left: -12,
  width: '220%',
  height: 44,
  border: '1px solid #4caf50'
};

const _isNaN = Number.isNaN,
      _noopFn = () => {},
      hasTouch = _has.default.touch,
      [EVENT_NAME_MOVE, EVENT_NAME_UP] = hasTouch ? ['touchmove', 'touchend'] : ['mousemove', 'mouseup'],
      _checkValueInMinMax = (min, max, value) => value > max ? max : value < min ? min : value,
      _toPercent = (value, min, max) => {
  const _percent = (value - min) / (max - min);

  return _isNaN(_percent) ? 0 : _percent * 100;
},
      _crWidthStyle = percent => ({
  width: "calc(" + percent + "%)"
}),
      _crLeftStyle = percent => ({
  left: percent + "%"
}),
      _getClienX = hasTouch ? evt => (((evt || {}).touches || [])[0] || {}).clientX || 0 : evt => evt.clientX,
      _isUp = keyCode => keyCode === 39 || keyCode === 38,
      _isDown = keyCode => keyCode === 37 || keyCode === 40,
      _calcValueByKeyCode = (value, step, keyCode) => _isUp(keyCode) ? value + step : _isDown(keyCode) ? value - step : void 0,
      _isNumber = n => typeof n === 'number' && n - n === 0,
      _getRefValue = ref => ref.current;

const _useMouseDown = setValueFromPosition => {
  const [isDragged, setDraggedTrue, setDraggedFalse] = (0, _useBool.default)(false),
        _refDragRunning = (0, _react.useRef)(false),
        _hDragMouseMove = event => {
    if (_getRefValue(_refDragRunning)) {
      return;
    }

    _refDragRunning.current = true;
    requestAnimationFrame(() => {
      _refDragRunning.current = false;
      setValueFromPosition(event);
    });
  },
        _hDragMouseUp = () => {
    document.removeEventListener(EVENT_NAME_MOVE, _hDragMouseMove);
    document.removeEventListener(EVENT_NAME_UP, _hDragMouseUp);
    setDraggedFalse();
  },
        _hMouseDown = event => {
    // Cancel text selection
    if (!hasTouch) {
      event.preventDefault();
    }

    document.addEventListener(EVENT_NAME_MOVE, _hDragMouseMove);
    document.addEventListener(EVENT_NAME_UP, _hDragMouseUp);
    setDraggedTrue();
  };

  return [isDragged, _hMouseDown];
};

const InputSlider = _ref => {
  let {
    initialValue = 4,
    step = 1,
    min = 0,
    max = 20,
    onChange = _noopFn
  } = _ref;

  const _refTrack = (0, _react.useRef)(),
        [isHovered, setHoveredTrue, setHoveredFalse] = (0, _useBool.default)(false),
        [value, setValue] = (0, _react.useState)(initialValue),
        _updateValue = value => {
    const _value = _checkValueInMinMax(min, max, value);

    setValue(_value);
    onChange(_value);
  },
        _hKeyDown = evt => {
    const {
      keyCode
    } = evt,
          _value = _calcValueByKeyCode(value, step, keyCode);

    if (_value != null) {
      evt.preventDefault();

      _updateValue(_value);
    }
  },
        _calcPositionFromEvent = evt => {
    const _trackOffset = _getRefValue(_refTrack).getBoundingClientRect()['left'];

    return _isNumber(_trackOffset) ? _getClienX(evt) - _trackOffset : NaN;
  },
        _setValueFromPosition = evt => {
    const positionMax = _getRefValue(_refTrack).clientWidth;

    let position = _calcPositionFromEvent(evt);

    if (_isNumber(position) && _isNumber(positionMax)) {
      if (position < 0) {
        position = 0;
      } else if (position > positionMax) {
        position = positionMax;
      }

      let v;
      v = position / positionMax * (max - min);
      v = Math.round(v / step) * step + min;
      v = (0, _mathFn.roundBy)(v, 5);

      _updateValue(v);
    }
  },
        [isDragged, _hMouseDown] = _useMouseDown(_setValueFromPosition);

  const [_sliderHandlers, _btHandlers] = hasTouch ? [{
    onTouchStart: _hMouseDown
  }, void 0] : [{
    onMouseDown: _hMouseDown,
    onMouseEnter: setHoveredTrue,
    onMouseLeave: setHoveredFalse
  }, {
    onFocus: setHoveredTrue,
    onKeyDown: _hKeyDown,
    onBlur: setHoveredFalse
  }],
        _lineAfterStyle = isHovered ? S_LINE_AFTER_HOVERED : S_LINE_AFTER,
        [_circleStyle, _emberStyle] = isDragged ? [S_CIRCLE_DRAGGED, S_EMBER] : [],
        _percent = _toPercent(value, min, max),
        _widthBeforeStyle = _crWidthStyle(_percent),
        _widthAfterStyle = _crWidthStyle(100 - _percent),
        _leftStyle = _crLeftStyle(_percent);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_ROOT,
    ..._sliderHandlers,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: _refTrack,
      style: S_ROOT_LINE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: { ...S_LINE_BEFORE,
          ..._widthBeforeStyle
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: { ..._lineAfterStyle,
          ..._widthAfterStyle
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "hidden",
        step: step,
        min: min,
        max: max,
        value: value,
        required: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        role: "slider",
        tabIndex: 0,
        "aria-valuenow": value,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-orientation": "horizontal",
        "aria-labelledby": "discrete-slider-custom",
        style: { ...S_ROOT_CIRCLE,
          ..._circleStyle,
          ..._leftStyle
        },
        ..._btHandlers,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircleInner.default, {
          is: isHovered || isDragged,
          circleStyle: _circleStyle,
          emberStyle: _emberStyle
        })
      })]
    })
  });
};
/*
static propTypes = {
  initialValue : PropTypes.number,
  step : PropTypes.number,
  min : PropTypes.number,
  max : PropTypes.number,
  onChange : PropTypes.func
}
*/


var _default = InputSlider;
exports.default = _default;
//# sourceMappingURL=InputSlider.js.map