'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    display: 'inline-block'
  },
  leftDiv: {
    marginLeft: '10px'
  }
};

var SvgHrzResize = _react2.default.createClass({
  displayName: 'SvgHrzResize',
  getInitialState: function getInitialState() {
    this.id = null;
    this.domNode = null;
    this.delta = 0;
    this.step = 1;
    this.countStep = 0;
    this.isResizeAfter = typeof this.props.onResizeAfter === 'function' ? true : false;
    return {};
  },
  componentDidMount: function componentDidMount() {
    var _props = this.props;
    var comp = _props.comp;
    var minWidth = _props.minWidth;
    var maxWidth = _props.maxWidth;

    this.domNode = _reactDom2.default.findDOMNode(comp);
    this.initWidth = this.domNode.getBoundingClientRect().width;
    this.currentWidth = this.initWidth;
    this.minDelta = minWidth - this.initWidth;
    this.maxDelta = maxWidth - this.initWidth;
  },
  _increaseStepValue: function _increaseStepValue() {
    this.countStep += 1;
    if (this.countStep > 30) {
      this.step = 3;
    } else if (this.countStep > 15) {
      this.step = 2;
    }
    if (this.maxDelta - this.delta < 20 || this.delta - this.minDelta < 20) {
      this.step = 1;
    }
  },
  _resizeLeft: function _resizeLeft() {
    if (this.delta > this.minDelta) {
      this.delta -= this.step;
      this.currentWidth = this.initWidth + this.delta;
      this.domNode.style.width = this.currentWidth + 'px';
      this._increaseStepValue();
    }
  },
  _resizeRight: function _resizeRight() {
    if (this.delta < this.maxDelta) {
      this.delta += this.step;
      this.currentWidth = this.initWidth + this.delta;
      this.domNode.style.width = this.currentWidth + 'px';
      this._increaseStepValue();
    }
  },
  _handlerStartResize: function _handlerStartResize(fnResize) {
    if (this.id !== null) {
      this._handlerStopResize(false);
    }
    this.id = setInterval(fnResize, 5);
  },
  _handlerStopResize: function _handlerStopResize(isOnResizeAfter) {
    clearInterval(this.id);
    this.id = null;
    this.step = 1;
    this.countStep = 0;

    if (isOnResizeAfter && this.isResizeAfter) {
      this.props.onResizeAfter(this.currentWidth);
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement(
        'div',
        {
          className: 'svg-resize',
          style: styles.leftDiv,
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
          style: styles.leftDiv,
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
});

exports.default = SvgHrzResize;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\SvgHrzResize.js.map