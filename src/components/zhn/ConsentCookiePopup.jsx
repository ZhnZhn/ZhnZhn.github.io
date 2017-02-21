import React, { Component } from 'react';

const HIDE_PERIOD = 300000
    , ANIMATION_PERIOD = 1100
    , MSG = 'Can website collect statistics, by using session cookies from Google Analytics with anonymizeIp, for better experience ?'
    , BTN_OK_TITLE = "OK"
    , BTN_NO_TITLE = "NO, not today.";

const STYLE = {
  ROOT__SHOW : {
     opacity: '0.9',
     //top : '52px'
     bottom : '0px'
  },
  ROOT_HIDE : {
     display: 'none'
  }
}

class ConsentCookiePopup extends Component{
  constructor(props){
    super();
    this.timeID = undefined;
    this.hideID = undefined;
    this.state = {
      isOpacity : true,
      isDisplay : true
    }
  }

  componentDidMount(){
    this.timeID = setTimeout( () => {
      this.props.onNoAnswer();
      this._startHidingAnimation();
    }, HIDE_PERIOD);

    setTimeout(()=>{
      this.setState({ isOpacity: false });
    }, 500);
  }

  _startHidingAnimation = () => {
    this.hideID = setTimeout(this._hidePopup, ANIMATION_PERIOD);
    this.setState({ isOpacity: true });
  }
  _hidePopup = () => {
     this.setState({ isDisplay : false });
  }

  _handleClickOk = () => {
    if (!this.hideId) {
      clearTimeout(this.timeID);
      this.props.onAnswerYes();
      this._startHidingAnimation();
    }
  }

  _handleClickNo = () => {
    if (!this.hideId) {
      clearTimeout(this.timeID);
      this.props.onAnswerNo();
      this._startHidingAnimation();
    }
  }

  render(){
    const { isOpacity, isDisplay } = this.state
        , _opacityStyle = (isOpacity)
               ? undefined
               : STYLE.ROOT__SHOW
        , _displayStyle = (isDisplay)
               ? undefined
               : STYLE.ROOT_HIDE;
    return (
      <div
         className="consent"
         style={Object.assign({}, _opacityStyle, _displayStyle)}
      >
         <p className="consent__msg">
             {MSG}
         </p>
         <div className="consent__row">
           <span
              className="consent__btn"
              onClick={this._handleClickOk}
           >
              {BTN_OK_TITLE}
           </span>
           <span
              className="consent__btn"
              onClick={this._handleClickNo}
           >
              {BTN_NO_TITLE}
           </span>
         </div>
      </div>
    );
  }
}

export default ConsentCookiePopup
