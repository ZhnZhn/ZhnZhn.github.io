"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

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
      initWidth: _initWidth,
      minWidth: _minWidth,
      maxWidth: _maxWidth,
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

    this._getElementStyle = () => {
      const {
        current
      } = this.elementRef || {},
            {
        style
      } = current || {};
      return style || {};
    };

    this._setElementWidth = width => {
      this._getElementStyle().width = width + 'px';
    };

    this._getElementWidth = () => {
      return parseInt(this._getElementStyle().width, 10);
    };

    this._onResizeAfter = () => {
      const {
        onResizeAfter
      } = this;

      if (_isFn(onResizeAfter)) {
        onResizeAfter(this._getElementWidth());
      }
    };

    this.clearInterval = () => {
      clearInterval(this.id);
    };

    this.toWidth = (width, isOnResizeAfter) => {
      const {
        minWidth,
        maxWidth,
        initWidth
      } = this;

      if (width >= minWidth && width <= maxWidth) {
        this.delta = width - initWidth;

        this._setElementWidth(width);

        if (isOnResizeAfter) {
          this._onResizeAfter();
        }
      }
    };

    this.resizeBy = step => {
      if (step < 0 && this.delta > this.minDelta || step > 0 && this.delta < this.maxDelta) {
        this.delta += step;

        this._setElementWidth(this.initWidth + this.delta);
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
      const w = parseInt(this._getElementStyle().width, 10);

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
    this.initWidth = _initWidth;
    this.minWidth = _minWidth;
    this.maxWidth = _maxWidth;
    this.minDelta = _minWidth - _initWidth;
    this.maxDelta = _maxWidth - _initWidth;
    this.delta = 0;

    _initResizeProperties(this);

    this.hStartResizeLeft = this._startResize.bind(null, this._resizeLeft);
    this.hStartResizeRight = this._startResize.bind(null, this._resizeRight);
  }

}

var _default = ResizeElementImpl;
exports.default = _default;
//# sourceMappingURL=ResizeElementImpl.js.map