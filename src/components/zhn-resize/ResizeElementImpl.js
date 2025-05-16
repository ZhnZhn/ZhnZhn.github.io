import {
  isFn,
  isNumber,
  parseIntBy10
} from '../../utils/isTypeFn';

import {
  bindTo,
  getRefElementStyle
} from '../uiApi';

import { isKeyEnterOrBlank } from '../hooks/fUseKey';

const _assign = Object.assign
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

    this.hStartResizeLeft = bindTo(this._startResize, this._resizeLeft)
    this.hStartResizeRight = bindTo(this._startResize, this._resizeRight)
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

  _getStyle = () => {
    return getRefElementStyle(this.elementRef) || {};
  }

  _setWidth = (width) => {
    this._getStyle().width = width + 'px';
  }

  _getWidth = () => {
    return parseIntBy10(this._getStyle().width)
  }

  _onResizeAfter = () => {
    const { onResizeAfter } = this;
    if (isFn(onResizeAfter)) {
      onResizeAfter(this._getWidth());
    }
  }

  clearInterval = () => {
    clearInterval(this.id)
  }

  toWidth = (width, isOnResizeAfter) => {
    if (width >= this.minWidth && width <= this.maxWidth) {
      this.delta = width - this.initWidth
      this._setWidth(width)
      if (isOnResizeAfter) {
        this._onResizeAfter()
      }
    }
  }

  resizeBy = (step) => {
    if ( (step < 0 && this.delta > this.minDelta)
      || (step > 0 && this.delta < this.maxDelta) ) {
      this.delta += step;
      this._setWidth(this.initWidth + this.delta)
    } else {
      this.hStopResize()
    }
  }

  hKdLeft = (evt) => {
    if (isKeyEnterOrBlank(evt)) {
      evt.stopPropagation()
      this.resizeBy(-this.step)
    }
  }
  _resizeLeft = () => {
     this.resizeBy(-this.deltaStep)
     this._increaseDeltaStep();
  }
  hKdRight = (evt) => {
    if (isKeyEnterOrBlank(evt)) {
      evt.stopPropagation()
      this.resizeBy(this.step)
    }
  }
  _resizeRight = () => {
    this.resizeBy(this.deltaStep)
    this._increaseDeltaStep();
  }

  _updateDelta = () => {
    const w = this._getWidth();
    if (isNumber(w)) {
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
