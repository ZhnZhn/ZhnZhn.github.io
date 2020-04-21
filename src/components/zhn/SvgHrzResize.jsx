import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const CL = "svg-resize not-selected";

const S = {
  ROOT_DIV: {
    display: 'inline-block'    
  },
  LEFT_DIV: {
    marginLeft: 10
  }
};

const _isFn = fn => typeof fn === 'function';

class SvgHrzResize extends Component {
  constructor(props){
    super(props);
    this.id = null;
    this.domNode = null;
    this.delta = 0;
    this.step = 1;
    this.countStep = 0;
    this.isResizeAfter = _isFn(props.onResizeAfter)

    this._hStartResizeLeft = this._startResize.bind(null, this._resizeLeft)
    this._hStartResizeRight = this._startResize.bind(null, this._resizeRight)
    this._hStopResize = this._stopResize.bind(null, true)

    this.state = {};
  }

  componentDidMount(){
     const { comp, initWidth, minWidth, maxWidth } = this.props;
     this.domNode = ReactDOM.findDOMNode(comp);
     //this.initWidth = this.domNode.getBoundingClientRect().width;
     this.initWidth = initWidth;
     this.currentWidth = this.initWidth;
     this.minDelta = minWidth - this.initWidth;
     this.maxDelta = maxWidth - this.initWidth;
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

  _resizeLeft = () => {
    if (this.delta > this.minDelta){
      this.delta -= this.step;
      this.currentWidth = this.initWidth + this.delta;
      this.domNode.style.width = this.currentWidth + 'px';
      this._increaseStepValue();
    }
  }
  _resizeRight = () => {
    if (this.delta < this.maxDelta){
      this.delta += this.step;
      this.currentWidth = this.initWidth + this.delta;
      this.domNode.style.width = this.currentWidth + 'px';
      this._increaseStepValue();
    }
  }

  _updateDelta = () => {
    const w = parseInt(this.domNode.style.width);
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

    if (isOnResizeAfter && this.isResizeAfter){
      this.props.onResizeAfter(this.currentWidth);
    }
  }

  render(){
    const { btStyle } = this.props
    , _btStyle = {...S.LEFT_DIV, ...btStyle };
    return (
      <div style={S.ROOT_DIV}>
        <button
           className={CL}
           style={_btStyle}
           title="Resize container to left"
           onMouseDown={this._hStartResizeLeft}
           onMouseUp={this._hStopResize}
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
         className={CL}
         style={_btStyle}
         title="Resize container to right"
         onMouseDown={this._hStartResizeRight}
         onMouseUp={this._hStopResize}
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
