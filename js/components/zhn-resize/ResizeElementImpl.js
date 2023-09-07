"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));
const _isFn = fn => typeof fn === 'function',
  _isNaN = Number.isNaN,
  _assign = Object.assign,
  _initResizeProperties = inst => {
    _assign(inst, {
      id: null,
      deltaStep: 1,
      countStep: 0
    });
  };
class ResizeElementImpl {
  constructor(_ref) {
    let {
      elementRef,
      initWidth,
      minWidth,
      maxWidth,
      step: _step = 10,
      onResizeAfter: _onResizeAfter
    } = _ref;
    this._increaseDeltaStep = () => {
      this.countStep += 1;
      if (this.countStep > 30) {
        this.deltaStep = 3;
      } else if (this.countStep > 15) {
        this.deltaStep = 2;
      }
      if (this.maxDelta - this.delta < 20 || this.delta - this.minDelta < 20) {
        this.deltaStep = 1;
      }
    };
    this._getStyle = () => {
      return (0, _uiApi.getRefElementStyle)(this.elementRef) || {};
    };
    this._setWidth = width => {
      this._getStyle().width = width + 'px';
    };
    this._getWidth = () => {
      return parseInt(this._getStyle().width, 10);
    };
    this._onResizeAfter = () => {
      const {
        onResizeAfter
      } = this;
      if (_isFn(onResizeAfter)) {
        onResizeAfter(this._getWidth());
      }
    };
    this.clearInterval = () => {
      clearInterval(this.id);
    };
    this.toWidth = (width, isOnResizeAfter) => {
      if (width >= this.minWidth && width <= this.maxWidth) {
        this.delta = width - this.initWidth;
        this._setWidth(width);
        if (isOnResizeAfter) {
          this._onResizeAfter();
        }
      }
    };
    this.resizeBy = step => {
      if (step < 0 && this.delta > this.minDelta || step > 0 && this.delta < this.maxDelta) {
        this.delta += step;
        this._setWidth(this.initWidth + this.delta);
      } else {
        this.hStopResize();
      }
    };
    this.hKdLeft = event => {
      if ((0, _isKeyEnter.default)(event)) {
        event.stopPropagation();
        this.resizeBy(-this.step);
      }
    };
    this._resizeLeft = () => {
      this.resizeBy(-this.deltaStep);
      this._increaseDeltaStep();
    };
    this.hKdRight = event => {
      if ((0, _isKeyEnter.default)(event)) {
        event.stopPropagation();
        this.resizeBy(this.step);
      }
    };
    this._resizeRight = () => {
      this.resizeBy(this.deltaStep);
      this._increaseDeltaStep();
    };
    this._updateDelta = () => {
      const w = this._getWidth();
      if (!_isNaN(w)) {
        this.delta = w - this.initWidth;
      }
    };
    this._startResize = fnResize => {
      if (this.id !== null) {
        this._stopResize();
      }
      this._updateDelta();
      this.id = setInterval(fnResize, 5);
    };
    this._stopResize = () => {
      this.clearInterval();
      _initResizeProperties(this);
    };
    this.hStopResize = () => {
      this._stopResize();
      this._onResizeAfter();
    };
    this.elementRef = elementRef;
    this.step = _step;
    this.onResizeAfter = _onResizeAfter;
    this.initWidth = initWidth;
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;
    this.minDelta = minWidth - initWidth;
    this.maxDelta = maxWidth - initWidth;
    this.delta = 0;
    _initResizeProperties(this);
    this.hStartResizeLeft = (0, _uiApi.bindTo)(this._startResize, this._resizeLeft);
    this.hStartResizeRight = (0, _uiApi.bindTo)(this._startResize, this._resizeRight);
  }
}
var _default = ResizeElementImpl;
exports.default = _default;
//# sourceMappingURL=ResizeElementImpl.js.map