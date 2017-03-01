'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S = {
  ROOT_DIV: {
    display: 'inline-block'
  },
  LEFT_DIV: {
    marginLeft: '10px'
  }
};

var SvgHrzResize = function (_Component) {
  _inherits(SvgHrzResize, _Component);

  function SvgHrzResize(props) {
    _classCallCheck(this, SvgHrzResize);

    var _this = _possibleConstructorReturn(this, (SvgHrzResize.__proto__ || Object.getPrototypeOf(SvgHrzResize)).call(this));

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

  _createClass(SvgHrzResize, [{
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