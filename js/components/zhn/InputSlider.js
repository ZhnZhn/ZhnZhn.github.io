'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 Mostly from
 https://github.com/callemall/material-ui/blob/master/src/Slider/Slider.js
*/

var S = {
  ROOT: {
    userSelect: 'none',
    cursor: 'default',
    height: '18px',
    width: '100%',
    position: 'relative',
    marginTop: '8px',
    marginBottom: '8px'
  },
  ROOT_LINE: {
    position: 'absolute',
    top: '8px',
    left: '0px',
    width: '100%',
    height: '2px'
  },
  LINE_BEFORE: {
    position: 'absolute',
    height: '100%',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    left: '0px',
    backgroundColor: 'rgb(0, 188, 212)',
    marginRight: '6px',
    width: 'calc(15%)'
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

var _fnToPercent = function _fnToPercent(value, min, max) {
  var _percent = (value - min) / (max - min);
  return isNaN(_percent) ? 0 : _percent * 100;
};
var _fnWidthCalc = function _fnWidthCalc(percent) {
  return { width: 'calc(' + percent + '%)' };
};
var _fnLeftPercent = function _fnLeftPercent(percent) {
  return { left: percent + '%' };
};

var InputSlider = (_temp = _class = function (_Component) {
  _inherits(InputSlider, _Component);

  function InputSlider(props) {
    _classCallCheck(this, InputSlider);

    var _this = _possibleConstructorReturn(this, (InputSlider.__proto__ || Object.getPrototypeOf(InputSlider)).call(this));

    _this._handleMouseEnter = function () {
      _this.setState({ hovered: true });
    };

    _this._handleMouseLeave = function () {
      _this.setState({ hovered: false });
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

      var value = void 0;
      value = position / positionMax * (max - min);
      value = Math.round(value / step) * step + min;
      value = parseFloat(value.toFixed(5));

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

    _this.state = {
      hovered: false,
      dragged: false,
      value: 4
    };
    return _this;
  }

  _createClass(InputSlider, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          step = _props.step,
          min = _props.min,
          max = _props.max,
          _state = this.state,
          hovered = _state.hovered,
          dragged = _state.dragged,
          value = _state.value,
          _lineAfterStyle = hovered ? _extends({}, S.LINE_AFTER, S.LINE_HOVERED) : S.LINE_AFTER,
          _circleStyle = dragged ? S.CIRCLE_DRAGGED : null,
          _emberStyle = dragged ? S.EMBER : null,
          _circleInnerEl = hovered || dragged ? _react2.default.createElement('div', { style: _extends({}, S.CIRCLE_INNER_EL, _emberStyle) }) : null,
          _percent = _fnToPercent(value, min, max),
          _widthBeforeStyle = _fnWidthCalc(_percent),
          _widthAfterStyle = _fnWidthCalc(100 - _percent),
          _leftStyle = _fnLeftPercent(_percent);

      return _react2.default.createElement(
        'div',
        { style: S.ROOT,
          onMouseDown: this._handleMouseDown,
          onMouseEnter: this._handleMouseEnter,
          onMouseLeave: this._handleMouseLeave
        },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(comp) {
              return _this2.trackComp = comp;
            },
            style: S.ROOT_LINE
          },
          _react2.default.createElement('div', { style: _extends({}, S.LINE_BEFORE, _widthBeforeStyle) }),
          _react2.default.createElement('div', { style: _extends({}, _lineAfterStyle, _widthAfterStyle) }),
          _react2.default.createElement(
            'div',
            {
              tabIndex: 0,
              style: _extends({}, S.ROOT_CIRCLE, _circleStyle, _leftStyle)
            },
            _react2.default.createElement(
              'div',
              { style: _extends({}, S.CIRCLE_INNER, _circleStyle) },
              _circleInnerEl
            )
          ),
          _react2.default.createElement('input', {
            type: 'hidden',
            step: step,
            min: min,
            max: max,
            value: value,
            required: true
          })
        )
      );
    }
  }]);

  return InputSlider;
}(_react.Component), _class.propTypes = {
  step: _react.PropTypes.number,
  min: _react.PropTypes.number,
  max: _react.PropTypes.number,
  onChange: _react.PropTypes.func
}, _class.defaultProps = {
  min: 0,
  max: 20,
  step: 1
}, _temp);
exports.default = InputSlider;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InputSlider.js.map