import React, { Component } from 'react';

const HIDE_PERIOD = 300000
    , ANIMATION_PERIOD = 1100
    , MSG = "Can web app ERC collect Your general user's session statistics by applying Google Analytics with anonymizing IP address?"
    , BT_YES = "Yes"
    , BT_NO = "No, not today";

const CL = {
  ROOT: "consent",
  ROW: "consent__row",
  MSG: "consent__msg",
  BT: "consent__btn"
};
const S = {
  SHOW: {
    opacity: "0.9",
    bottom: "0px"
  },
  HIDE: {
     display: "none"
  }
};

class ConsentCookiePopup extends Component {
  constructor(){
    super();
    this.timeID = undefined;
    this.hideID = undefined;
    this.state = {
      isOpacity: true,
      isDisplay: true
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

  _hClickOk = () => {
    if (!this.hideId) {
      clearTimeout(this.timeID);
      this.props.onAnswerYes();
      this._startHidingAnimation();
    }
  }

  _hClickNo = () => {
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
               : S.SHOW
        , _displayStyle = (isDisplay)
               ? undefined
               : S.HIDE;
    return (
      <div
         className={CL.ROOT}
         style={{ ..._opacityStyle, ..._displayStyle }}
      >
         <p className={CL.MSG}>
             {MSG}
         </p>
         <div className={CL.ROW}>
           <button
              className={CL.BT}
              onClick={this._hClickOk}
           >
              {BT_YES}
           </button>
           <button
              className={CL.BT}
              onClick={this._hClickNo}
           >
              {BT_NO}
           </button>
         </div>
      </div>
    );
  }
}

export default ConsentCookiePopup
