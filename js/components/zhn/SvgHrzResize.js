'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT_DIV: {
    display: 'inline-block'
  },
  LEFT_DIV: {
    marginLeft: '10px'
  }
};

var SvgHrzResize = function (_Component) {
  (0, _inherits3.default)(SvgHrzResize, _Component);

  function SvgHrzResize(props) {
    (0, _classCallCheck3.default)(this, SvgHrzResize);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SvgHrzResize.__proto__ || Object.getPrototypeOf(SvgHrzResize)).call(this));

    _this._increaseStepValue = function () {
      _this.countStep += 1;
      if (_this.countStep > 30) {
        _this.step = 3;
      } else if (_this.countStep > 15) {
        _this.step = 2;
      }
      if (_this.maxDelta - _this.delta < 20 || _this.delta - _this.minDelta < 20) {
        _this.step = 1;
      }
    };

    _this._resizeLeft = function () {
      if (_this.delta > _this.minDelta) {
        _this.delta -= _this.step;
        _this.currentWidth = _this.initWidth + _this.delta;
        _this.domNode.style.width = _this.currentWidth + 'px';
        _this._increaseStepValue();
      }
    };

    _this._resizeRight = function () {
      if (_this.delta < _this.maxDelta) {
        _this.delta += _this.step;
        _this.currentWidth = _this.initWidth + _this.delta;
        _this.domNode.style.width = _this.currentWidth + 'px';
        _this._increaseStepValue();
      }
    };

    _this._handlerStartResize = function (fnResize) {
      if (_this.id !== null) {
        _this._handlerStopResize(false);
      }
      _this.id = setInterval(fnResize, 5);
    };

    _this._handlerStopResize = function (isOnResizeAfter) {
      clearInterval(_this.id);
      _this.id = null;
      _this.step = 1;
      _this.countStep = 0;

      if (isOnResizeAfter && _this.isResizeAfter) {
        _this.props.onResizeAfter(_this.currentWidth);
      }
    };

    _this.id = null;
    _this.domNode = null;
    _this.delta = 0;
    _this.step = 1;
    _this.countStep = 0;
    _this.isResizeAfter = typeof props.onResizeAfter === 'function' ? true : false;
    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(SvgHrzResize, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          comp = _props.comp,
          minWidth = _props.minWidth,
          maxWidth = _props.maxWidth;

      this.domNode = _reactDom2.default.findDOMNode(comp);
      this.initWidth = this.domNode.getBoundingClientRect().width;
      this.currentWidth = this.initWidth;
      this.minDelta = minWidth - this.initWidth;
      this.maxDelta = maxWidth - this.initWidth;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: S.ROOT_DIV },
        _react2.default.createElement(
          'div',
          {
            className: 'svg-resize',
            style: S.LEFT_DIV,
            title: 'Resize container horizontal left',
            onMouseDown: this._handlerStartResize.bind(null, this._resizeLeft),
            onMouseUp: this._handlerStopResize.bind(null, true),
            onTouchStart: this._handlerStartResize.bind(null, this._resizeLeft),
            onTouchEnd: this._handlerStopResize.bind(null, true)
          },
          _react2.default.createElement(
            'svg',
            { viewBox: '0 0 12 12', width: '100%', height: '100%',
              preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', {
              d: 'M 1,6 L 11,6',
              strokeWidth: '2',
              strokeLinecap: 'round'
            }),
            _react2.default.createElement('path', {
              d: 'M 6,2 L 1,6 6,10',
              strokeWidth: '2',
              strokeLinecap: 'round',
              fill: 'none'
            })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'svg-resize',
            style: S.LEFT_DIV,
            title: 'Resize container horizontal right',
            onMouseDown: this._handlerStartResize.bind(null, this._resizeRight),
            onMouseUp: this._handlerStopResize.bind(null, true),
            onTouchStart: this._handlerStartResize.bind(null, this._resizeRight),
            onTouchEnd: this._handlerStopResize.bind(null, true)
          },
          _react2.default.createElement(
            'svg',
            { viewBox: '0 0 12 12', width: '100%', height: '100%',
              preserveAspectRatio: 'none', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', {
              d: 'M 1,6 L 11,6',
              strokeWidth: '2',
              strokeLinecap: 'round'
            }),
            _react2.default.createElement('path', {
              d: 'M 6,2 L 11,6 6,10',
              strokeWidth: '2',
              strokeLinecap: 'round',
              fill: 'none'
            })
          )
        )
      );
    }
  }]);
  return SvgHrzResize;
}(_react.Component);

exports.default = SvgHrzResize;
//# sourceMappingURL=SvgHrzResize.js.map