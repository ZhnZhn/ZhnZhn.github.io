import { Component } from 'react';

import isKeyEnter from './isKeyEnter'

const CL_BT = "bt-resize not-selected";

const S = {
  ROOT_DIV: {
    display: 'inline-block'
  },
  BT: {
    marginLeft: 10
  }
};

const _isFn = fn => typeof fn === 'function';

class SvgHrzResize extends Component {
  static defaultProps = {
    step: 10
  }

  /*
  static propTypes = {
    btStyle: PropTypes.object
    initWidth: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    step: PropTypes.number,
    nodeRef=PropTypes.ref,
    onResizeAfter=PropTypes.func
  }
  */

  constructor(props){
    super(props);
    const {
      initWidth, minWidth, maxWidth
    } = props
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

  _increaseStepValue = () => {
    this.countStep +=1;
    if ( this.countStep > 30){
      this.step = 3;
    } else if ( this.countStep > 15){
      this.step = 2;
    }
    if ( (this.maxDelta - this.delta) < 20 ||
         (this.delta - this.minDelta) < 20    ){
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
    if (!isNaN(w)) {
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
    const { btStyle } = this.props
    , _btStyle = {...S.BT, ...btStyle };
    return (
      <div style={S.ROOT_DIV}>
        <button
           className={CL_BT}
           style={_btStyle}
           title="Resize container to left"
           onMouseDown={this._hStartResizeLeft}
           onMouseUp={this._hStopResize}
           onKeyDown={this._hKdLeft}
           onTouchStart={this._hStartResizeLeft}
           onTouchEnd={this._hStopResize}
        >
           <svg viewBox="0 0 12 12" width="100%" height="100%"
               preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path
                   d="M 1,6 L 11,6"
                   strokeWidth="2"
                   strokeLinecap="round"
                />
               <path
                   d="M 6,2 L 1,6 6,10"
                   strokeWidth="2"
                   strokeLinecap="round"
                   fill="none"
               />
          </svg>
      </button>
      <button
         className={CL_BT}
         style={_btStyle}
         title="Resize container to right"
         onMouseDown={this._hStartResizeRight}
         onMouseUp={this._hStopResize}
         onKeyDown={this._hKdRight}
         onTouchStart={this._hStartResizeRight}
         onTouchEnd={this._hStopResize}
      >
        <svg viewBox="0 0 12 12" width="100%" height="100%"
             preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path
               d="M 1,6 L 11,6"
               strokeWidth="2"
               strokeLinecap="round"
            />
            <path
               d="M 6,2 L 11,6 6,10"
               strokeWidth="2"
               strokeLinecap="round"
               fill="none"
             />
        </svg>
      </button>
    </div>
   );
  }
}


export default SvgHrzResize
