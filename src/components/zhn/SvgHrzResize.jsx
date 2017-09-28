import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const S = {
  ROOT_DIV : {
    display : 'inline-block'
  },
  LEFT_DIV : {
    marginLeft : '10px'
  }
};

class SvgHrzResize extends Component {
  constructor(props){
    super();
    this.id = null;
    this.domNode = null;
    this.delta = 0;
    this.step = 1;
    this.countStep = 0;
    this.isResizeAfter = (typeof props.onResizeAfter === 'function')
           ? true
           : false;
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
  _handlerStartResize = (fnResize) => {    
    if (this.id !== null){
      this._handlerStopResize(false);
    }
    this.id = setInterval(fnResize, 5);
  }
  _handlerStopResize = (isOnResizeAfter) => {
    clearInterval(this.id);
    this.id = null;
    this.step = 1;
    this.countStep = 0;

    if (isOnResizeAfter && this.isResizeAfter){
      this.props.onResizeAfter(this.currentWidth);
    }
  }

  render(){
    return (
      <div style={S.ROOT_DIV}>
        <div
           className="svg-resize"
           style={S.LEFT_DIV}
           title="Resize container horizontal left"
           onMouseDown={this._handlerStartResize.bind(null, this._resizeLeft)}
           onMouseUp={this._handlerStopResize.bind(null, true)}
           onTouchStart={this._handlerStartResize.bind(null, this._resizeLeft)}
           onTouchEnd={this._handlerStopResize.bind(null, true)}
        >
           <svg viewBox="0 0 12 12" width="100%" height="100%"
               preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
      </div>
      <div
         className="svg-resize"
         style={S.LEFT_DIV}
         title="Resize container horizontal right"
         onMouseDown={this._handlerStartResize.bind(null, this._resizeRight)}
         onMouseUp={this._handlerStopResize.bind(null, true)}
         onTouchStart={this._handlerStartResize.bind(null, this._resizeRight)}
         onTouchEnd={this._handlerStopResize.bind(null, true)}
      >
        <svg viewBox="0 0 12 12" width="100%" height="100%"
             preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
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
      </div>
    </div>
    )
  }
}


export default SvgHrzResize
