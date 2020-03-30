import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withThemeRef from '../hoc/withThemeRef'

import {
  isKeyEscape,
  focusNode
} from '../zhn-utils/utils'

import SvgClose from '../zhn/SvgClose'
import FlatButton from '../zhn-m/FlatButton'

import STYLE from './Dialog.Style'

const TH_ID = 'MODAL_DIALOG';

const CL = {
  MD: 'modal-dialog',
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};

const S = {
  ...STYLE,
  ROOT_DIV_MODAL: {
    display: 'block',
    position: 'absolute',
    top: '20%',
    //left: '30%',
    left: '50%',
    width: 380,
    marginLeft: -190,
    zIndex: 10
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  },
};

class ModalDialog extends Component {
  /*
   static propTypes = {
     isShow: PropTypes.bool,
     isWithButton: PropTypes.bool,
     isNotUpdate: PropTypes.bool,
     withoutClose: PropTypes.bool,
     style: PropTypes.object,
     caption: PropTypes.string,
     timeout: PropTypes.number,
     commandButtons: PropTypes.arrayOf(PropTypes.element),
     onClose: PropTypes.func
   }
   */
   static defaultProps = {
     isWithButton: true,
     isNotUpdate: false,
     timeout: 450,
     onClose: () => {}
   }

   wasClosing = false

   constructor(props){
     super(props)

     this.wasClosing = false

     this._rootNode = null
     this._refRootNode = this._refRootNode.bind(this)

     this._hKeyDown = this._hKeyDown.bind(this)
     this._hClose = this._hClose.bind(this)
   }

   componentDidMount(){
     this.focus()
   }


   _hasHiddenStill(nextProps) {
     return !this.props.isShow
       && !nextProps.isShow
   }

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props){
       if (nextProps.isNotUpdate
          || this._hasHiddenStill(nextProps) ){
         return false;
       }
     }
     return true;
   }

   _hasShowed(prevProps){
      return !prevProps.isShow
        && this.props.isShow;
    }

   componentDidUpdate(prevProps, prevState){
     if (this.wasClosing){
       setTimeout(
         () => { this.setState({}) },
         this.props.timeout
       )
     } else if (this._hasShowed(prevProps)) {
       this.focus()
     }
   }

  _hClick(event) {
    event.stopPropagation()
   }

  _hKeyDown(evt) {
    if ( isKeyEscape(evt) ) {
      evt.preventDefault()
      evt.stopPropagation()
      this._hClose()
    }
  }

  _hClose() {
     this.props.onClose()
     this.focusPrev()
  }

  _renderCommandButton = () => {
    const {
      commandButtons,
      withoutClose
    } = this.props;
    return (
      <div style={S.COMMAND_DIV}>
        {commandButtons}
        { !withoutClose &&
            <FlatButton
              key="close"
              style={S.BT}
              caption="Close"
              title="Close Modal Dialog"
              onClick={this._hClose}
            />
        }
      </div>
    );
  }

  _refRootNode(n) {
    this._rootNode = n
  }

  render(){
    const {
      theme,
      isShow, isWithButton, style,
      caption, styleCaption,
      children
    } = this.props
    , TS = theme.getStyle(TH_ID);

    let _className, _style;

    if (this.wasClosing){
      _style = S.HIDE
      this.wasClosing = false
    } else {
      _className = isShow ? CL.SHOWING : CL.HIDING
      _style = isShow ? S.SHOW : S.HIDE_POPUP
      if (!isShow){
        this.wasClosing = true
      }
    }
    return (
      /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
       <div
          ref={this._refRootNode}
          role="dialog"
          tabIndex="-1"
          aria-label={caption}
          aria-hidden={!isShow}
          className={`${CL.MD} ${_className}`}
          style={{
            ...S.ROOT_DIV, ...S.ROOT_DIV_MODAL,
            ...style, ..._style,
            ...TS.ROOT, ...TS.EL_BORDER
          }}
          onClick={this._hClick}
          onKeyDown={this._hKeyDown}
       >
      {/*eslint-enable jsx-a11y/no-noninteractive-element-interactions*/}
           <div style={{...S.CAPTION_DIV, ...TS.EL}}>
              <span style={styleCaption}>{caption}</span>
              <SvgClose
                style={S.SVG_CLOSE}
                onClose={this._hClose}
              />
           </div>
           <div>
             {children}
           </div>
          {isWithButton && this._renderCommandButton()}
      </div>
    );
  }

  focus() {
    this._prevFocused = document.activeElement
    focusNode(this._rootNode)
  }

  focusPrev() {
    focusNode(this._prevFocused)
    this._prevFocused = null
  }
}

export default withThemeRef(ModalDialog)
