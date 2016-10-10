import React from 'react';

const HIDE_PERIOD = 30000
    , ANIMATION_PERIOD = 1100
    , MSG = 'This website uses cookies from Google Analytics with anonymizeIp to collect statistics for better experience.'
    , BTN_TITLE = 'Got it!';

const STYLE = {
  ROOT__SHOW : {
     opacity: '1',
     top : '52px'
  },
  ROOT_HIDE : {
     display: 'none'
  }
}

const ConsentCookiePopup = React.createClass({

  getInitialState(){
    this.timeID = undefined;
    this.hideID = undefined;
    return {
      isOpacity : true,
      isDisplay : true
    }
  },

  componentDidMount(){
    this.timeID = setTimeout( () => {
      this._startHidingAnimation();
    }, HIDE_PERIOD);

    setTimeout(()=>{
      this.setState({ isOpacity: false });
    }, 0);
  },

  _startHidingAnimation(){
    this.hideID = setTimeout(this._hidePopup, ANIMATION_PERIOD);
    this.setState({ isOpacity: true });
  },
  _hidePopup(){
     this.setState({ isDisplay : false });
  },

  _handlerClickBtn(){
    if (!this.hideId) {
      clearTimeout(this.timeID);
      this._startHidingAnimation();
    }
  },

  render(){
    const { isOpacity, isDisplay } = this.state
        , _opacityStyle = (isOpacity)
               ? undefined
               : STYLE.ROOT__SHOW
        , _displayStyle = (isDisplay)
               ? undefined
               : STYLE.ROOT_HIDE

    return (
      <div
         className="consent"
         style={Object.assign({}, _opacityStyle, _displayStyle)}
      >
         <p className="consent__msg">
             {MSG}
         </p>
         <p className="consent__row">
           <span
              className="consent__btn"
              onClick={this._handlerClickBtn}
           >
              {BTN_TITLE}
           </span>
         </p>
      </div>
    );
  }
});

export default ConsentCookiePopup
