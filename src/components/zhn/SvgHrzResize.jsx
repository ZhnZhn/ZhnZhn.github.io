import { Component } from 'react';

import BtResize from './BtResize';
import isKeyEnter from './isKeyEnter';

const S = {
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

const _isFn = fn => typeof fn === 'function'
, _isNaN = Number.isNaN;

class SvgHrzResize extends Component {
  static defaultProps = {
    step: 10
  }

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

  constructor(props){
    super(props);
    const {
      initWidth, minWidth, maxWidth
    } = props;
    this.initWidth = initWidth;
    this.currentWidth = this.initWidth;
    this.minDelta = minWidth - this.initWidth;
    this.maxDelta = maxWidth - this.initWidth;

    this.id = null;
    this.delta = 0;
    this.step = 1;
    this.countStep = 0;

    this._hStartResizeLeft = this._startResize.bind(null, this._resizeLeft)
    this._hStartResizeRight = this._startResize.bind(null, this._resizeRight)
    this._hStopResize = this._stopResize.bind(null, true)
  }

  componentWillUnmount(){
    clearInterval(this.id)
  }

  _increaseStepValue = () => {
    this.countStep +=1;
    if (this.countStep > 30){
      this.step = 3;
    } else if (this.countStep > 15){
      this.step = 2;
    }
    if ( (this.maxDelta - this.delta) < 20 ||
         (this.delta - this.minDelta) < 20) {
      this.step = 1;
    }
  }

  _getNodeStyle = () => {
    const { nodeRef } = this.props
    , { current } = nodeRef || {};
    return current && current.style || {};
  }

  _setNodeWidth = (width) => {
    this.currentWidth = width
    this._getNodeStyle().width = this.currentWidth + 'px';
  }

  _onResizeAfter = (isOnResizeAfter) => {
    const { onResizeAfter } = this.props;
    if (isOnResizeAfter && _isFn(onResizeAfter)) {
      onResizeAfter(this.currentWidth);
    }
  }

  toWidth = (width, isOnResizeAfter) => {
    const { minWidth, maxWidth, initWidth } = this.props;
    if (width >= minWidth && width <= maxWidth) {
      this.delta = width - initWidth
      this._setNodeWidth(width)
      this._onResizeAfter(isOnResizeAfter)
    }
  }

  resizeBy = (step) => {
    if ( (step < 0 && this.delta > this.minDelta)
      || (step > 0 && this.delta < this.maxDelta) ) {
      this.delta += step;
      this._setNodeWidth(this.initWidth + this.delta)
    } else {
      this._stopResize(true)
    }
  }

  _hKdLeft = (event) => {
    if (isKeyEnter(event)) {
      event.stopPropagation()
      this.resizeBy(-this.props.step)
    }
  }
  _resizeLeft = () => {
     this.resizeBy(-this.step)
     this._increaseStepValue();
  }
  _hKdRight = (event) => {
    if (isKeyEnter(event)) {
      event.stopPropagation()
      this.resizeBy(this.props.step)
    }
  }
  _resizeRight = () => {
    this.resizeBy(this.step)
    this._increaseStepValue();
  }

  _updateDelta = () => {
    const w = parseInt(this._getNodeStyle().width, 10);
    if (!_isNaN(w)) {
      this.delta = w - this.initWidth
    }
  }
  _startResize = (fnResize, evt) => {
    //evt.preventDefault()
    this._updateDelta()
    if (this.id !== null){
      this._stopResize(false);
    }
    this.id = setInterval(fnResize, 5);
  }
  _stopResize = (isOnResizeAfter) => {
    clearInterval(this.id);
    this.id = null;
    this.step = 1;
    this.countStep = 0;

    this._onResizeAfter(isOnResizeAfter)
  }

  render(){
    return (
      <div style={S.ROOT_DIV}>
        <BtResize
          style={S.BT_LEFT}
          title="Resize container to left"
          startResize={this._hStartResizeLeft}
          stopResize={this._hStopResize}
          onKeyDown={this._hKdLeft}
        />
        <BtResize
          style={S.BT_RIGHT}
          title="Resize container to right"
          startResize={this._hStartResizeRight}
          stopResize={this._hStopResize}
          onKeyDown={this._hKdRight}
        />
     </div>
   );
  }
}

export default SvgHrzResize
