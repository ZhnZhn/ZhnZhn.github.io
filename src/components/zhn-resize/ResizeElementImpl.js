import isKeyEnter from '../zhn/isKeyEnter';

const _isFn = fn => typeof fn === 'function'
, _isNaN = Number.isNaN
, _assign = Object.assign
, _initResizeProperties = inst => {
  _assign(inst, {
    id: null,
    deltaStep: 1,
    countStep: 0
  })
};

class ResizeElementImpl {

  constructor({
    elementRef,
    initWidth,
    minWidth,
    maxWidth,
    step=10,
    onResizeAfter
  }){
    this.elementRef = elementRef
    this.step = step
    this.onResizeAfter = onResizeAfter

    this.initWidth = initWidth
    this.minWidth = minWidth
    this.maxWidth = maxWidth
    this.minDelta = minWidth - initWidth
    this.maxDelta = maxWidth - initWidth

    this.delta = 0;
    _initResizeProperties(this)

    this.hStartResizeLeft = this._startResize.bind(null, this._resizeLeft)
    this.hStartResizeRight = this._startResize.bind(null, this._resizeRight)
  }

  _increaseDeltaStep = () => {
    this.countStep +=1;
    if (this.countStep > 30){
      this.deltaStep = 3;
    } else if (this.countStep > 15){
      this.deltaStep = 2;
    }
    if ( (this.maxDelta - this.delta) < 20 ||
         (this.delta - this.minDelta) < 20) {
      this.deltaStep = 1;
    }
  }

  _getElementStyle = () => {
    const { current } = this.elementRef || {}
    , { style } = current || {};
    return style || {};
  }

  _setElementWidth = (width) => {
    this._getElementStyle().width = width + 'px';
  }

  _getElementWidth = () => {
    return parseInt(this._getElementStyle().width, 10)
  }

  _onResizeAfter = () => {
    const { onResizeAfter } = this;
    if (_isFn(onResizeAfter)) {
      onResizeAfter(this._getElementWidth());
    }
  }

  clearInterval = () => {
    clearInterval(this.id)
  }

  toWidth = (width, isOnResizeAfter) => {
    const {
      minWidth,
      maxWidth,
      initWidth
    } = this;
    if (width >= minWidth && width <= maxWidth) {
      this.delta = width - initWidth
      this._setElementWidth(width)
      if (isOnResizeAfter) {
        this._onResizeAfter()
      }
    }
  }

  resizeBy = (step) => {
    if ( (step < 0 && this.delta > this.minDelta)
      || (step > 0 && this.delta < this.maxDelta) ) {
      this.delta += step;
      this._setElementWidth(this.initWidth + this.delta)
    } else {
      this.hStopResize()
    }
  }

  hKdLeft = (event) => {
    if (isKeyEnter(event)) {
      event.stopPropagation()
      this.resizeBy(-this.step)
    }
  }
  _resizeLeft = () => {
     this.resizeBy(-this.deltaStep)
     this._increaseDeltaStep();
  }
  hKdRight = (event) => {
    if (isKeyEnter(event)) {
      event.stopPropagation()
      this.resizeBy(this.step)
    }
  }
  _resizeRight = () => {
    this.resizeBy(this.deltaStep)
    this._increaseDeltaStep();
  }

  _updateDelta = () => {
    const w = parseInt(this._getElementStyle().width, 10);
    if (!_isNaN(w)) {
      this.delta = w - this.initWidth
    }
  }

  _startResize = (fnResize) => {
    if (this.id !== null){
      this._stopResize();
    }
    this._updateDelta()
    this.id = setInterval(fnResize, 5);
  }

  _stopResize = () => {
    this.clearInterval()
    _initResizeProperties(this)
  }

  hStopResize = () => {
    this._stopResize()
    this._onResizeAfter()
  }
}

export default ResizeElementImpl
