"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _BtResize = _interopRequireDefault(require("./BtResize"));

var _isKeyEnter = _interopRequireDefault(require("./isKeyEnter"));

var S = {
  ROOT_DIV: {
    display: 'inline-block'
  },
  BT_LEFT: {
    marginLeft: 10
  },
  BT_RIGHT: {
    marginLeft: 10,
    transform: 'rotate(180deg)'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
},
    _isNaN = Number.isNaN;

var SvgHrzResize = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SvgHrzResize, _Component);

  /*
  static propTypes = {
    initWidth: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    step: PropTypes.number,
    nodeRef: PropTypes.ref,
    onResizeAfter: PropTypes.func
  }
  */
  function SvgHrzResize(props) {
    var _this;

    _this = _Component.call(this, props) || this;

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

    _this._getNodeStyle = function () {
      var nodeRef = _this.props.nodeRef,
          _ref = nodeRef || {},
          current = _ref.current;

      return current && current.style || {};
    };

    _this._setNodeWidth = function (width) {
      _this.currentWidth = width;
      _this._getNodeStyle().width = _this.currentWidth + 'px';
    };

    _this._onResizeAfter = function (isOnResizeAfter) {
      var onResizeAfter = _this.props.onResizeAfter;

      if (isOnResizeAfter && _isFn(onResizeAfter)) {
        onResizeAfter(_this.currentWidth);
      }
    };

    _this.toWidth = function (width, isOnResizeAfter) {
      var _this$props = _this.props,
          minWidth = _this$props.minWidth,
          maxWidth = _this$props.maxWidth,
          initWidth = _this$props.initWidth;

      if (width >= minWidth && width <= maxWidth) {
        _this.delta = width - initWidth;

        _this._setNodeWidth(width);

        _this._onResizeAfter(isOnResizeAfter);
      }
    };

    _this.resizeBy = function (step) {
      if (step < 0 && _this.delta > _this.minDelta || step > 0 && _this.delta < _this.maxDelta) {
        _this.delta += step;

        _this._setNodeWidth(_this.initWidth + _this.delta);
      } else {
        _this._stopResize(true);
      }
    };

    _this._hKdLeft = function (event) {
      if ((0, _isKeyEnter["default"])(event)) {
        event.stopPropagation();

        _this.resizeBy(-_this.props.step);
      }
    };

    _this._resizeLeft = function () {
      _this.resizeBy(-_this.step);

      _this._increaseStepValue();
    };

    _this._hKdRight = function (event) {
      if ((0, _isKeyEnter["default"])(event)) {
        event.stopPropagation();

        _this.resizeBy(_this.props.step);
      }
    };

    _this._resizeRight = function () {
      _this.resizeBy(_this.step);

      _this._increaseStepValue();
    };

    _this._updateDelta = function () {
      var w = parseInt(_this._getNodeStyle().width, 10);

      if (!_isNaN(w)) {
        _this.delta = w - _this.initWidth;
      }
    };

    _this._startResize = function (fnResize, evt) {
      //evt.preventDefault()
      _this._updateDelta();

      if (_this.id !== null) {
        _this._stopResize(false);
      }

      _this.id = setInterval(fnResize, 5);
    };

    _this._stopResize = function (isOnResizeAfter) {
      clearInterval(_this.id);
      _this.id = null;
      _this.step = 1;
      _this.countStep = 0;

      _this._onResizeAfter(isOnResizeAfter);
    };

    var _initWidth = props.initWidth,
        _minWidth = props.minWidth,
        _maxWidth = props.maxWidth;
    _this.initWidth = _initWidth;
    _this.currentWidth = _this.initWidth;
    _this.minDelta = _minWidth - _this.initWidth;
    _this.maxDelta = _maxWidth - _this.initWidth;
    _this.id = null;
    _this.delta = 0;
    _this.step = 1;
    _this.countStep = 0;
    _this._hStartResizeLeft = _this._startResize.bind(null, _this._resizeLeft);
    _this._hStartResizeRight = _this._startResize.bind(null, _this._resizeRight);
    _this._hStopResize = _this._stopResize.bind(null, true);
    return _this;
  }

  var _proto = SvgHrzResize.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.id);
  };

  _proto.render = function render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROOT_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtResize["default"], {
        style: S.BT_LEFT,
        title: "Resize container to left",
        startResize: this._hStartResizeLeft,
        stopResize: this._hStopResize,
        onKeyDown: this._hKdLeft
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtResize["default"], {
        style: S.BT_RIGHT,
        title: "Resize container to right",
        startResize: this._hStartResizeRight,
        stopResize: this._hStopResize,
        onKeyDown: this._hKdRight
      })]
    });
  };

  return SvgHrzResize;
}(_react.Component);

SvgHrzResize.defaultProps = {
  step: 10
};
var _default = SvgHrzResize;
exports["default"] = _default;
//# sourceMappingURL=SvgHrzResize.js.map