import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

import SvgClose from '../zhn/SvgClose'
import FlatButton from '../zhn-m/FlatButton'

import STYLE from './Dialog.Style'

const TH_ID = 'MODAL_DIALOG';

const CL = {
  SHOWING : 'show-popup',
  HIDING : 'hide-popup'
};

const S = {
  ...STYLE,
  ROOT_DIV_MODAL: {
    position: 'absolute',
    top: '20%',
    left: '40%',
    display: 'block',
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
     commandButtons: PropTypes.arrayOf(PropTypes.element),
     timeout: PropTypes.number,
     caption: PropTypes.string,
     style: PropTypes.object,
     onClose: PropTypes.func
   }
   */
   static defaultProps = {
     isWithButton: true,
     isNotUpdate: false,
     timeout: 450
   }

   constructor(props){
     super()
     this.wasClosing = false
   }

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props){
       if (nextProps.isNotUpdate){
         return false;
       }
       if(!this.props.isShow && !nextProps.isShow){
         return false;
       }
     }
     return true;
   }

   componentDidUpdate(prevProps, prevState){
     if (this.wasClosing){
       setTimeout(
         () => { this.setState({}) },
         this.props.timeout
       )
     }
   }

  _handleClickDialog(event) {
    event.stopPropagation()
   }

  _renderCommandButton = () => {
    const { commandButtons, withoutClose, onClose } = this.props;
    return (
      <div style={S.COMMAND_DIV}>
        {commandButtons}
        { !withoutClose &&
            <FlatButton
              rootStyle={S.BT_ROOT}
              caption="Close"
              title="Close Modal Dialog"
              onClick={onClose}
            />
        }
      </div>
    );
  }

  render(){
    const {
            theme,
            isShow, isWithButton, style,
            caption, styleCaption,
            children, onClose
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
         <div
             className={_className}
             style={{
               ...S.ROOT_DIV, ...S.ROOT_DIV_MODAL,
               ...style, ..._style,
               ...TS.ROOT, ...TS.EL_BORDER
             }}
             onClick={this._handleClickDialog}
         >
             <div style={{...S.CAPTION_DIV, ...TS.EL}}>
                <span style={styleCaption}>{caption}</span>
                <SvgClose
                  style={S.SVG_CLOSE}
                  onClose={onClose}
                />
             </div>
             <div>
               {children}
             </div>
            {isWithButton && this._renderCommandButton()}
        </div>
    );
  }
}

export default withTheme(ModalDialog)
