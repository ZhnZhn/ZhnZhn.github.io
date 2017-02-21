import React, { Component, PropTypes} from 'react';

import SvgClose from '../SvgClose.js';
import ToolBarButton from '../ToolBarButton.js';

const ClassNames = {
  SHOWING : 'show-popup',
  HIDING : 'hide-popup'
};

const Styles = {
  SHOW : {
    display : 'block'
  },
  HIDE : {
    display : 'none'
  },
  HIDE_POPUP : {
    opacity: 0,
    transform : 'scaleY(0)'
  },
  ROOT_DIV: {
    position: 'absolute',
    top: '20%',
    left: '40%',
    display: 'block',
    backgroundColor: '#4D4D4D',
    border: 'solid 2px #232F3B',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10
  },
  CAPTON_DIV:{
    padding: '5px',
    color: 'rgba(164, 135, 212,1)',
    backgroundColor: '#232F3B',
    textAlign: 'center',
    fontSize: '18px'
  },
  COMMAND_DIV : {
     cursor: 'default',
     float: 'right',
     marginTop: '8px',
     marginBottom: '10px',
     marginRight: '4px'
  }
};

class ModalDialog extends Component {
   static propTypes = {
     isShow : PropTypes.bool,
     isWithButton : PropTypes.bool,
     timeout : PropTypes.number,
     caption : PropTypes.string,
     style : PropTypes.object,
     onClose : PropTypes.func
   }
   static defaultProps = {
     isWithButton : true,
     isNotUpdate : false,
     timeout : 450
   }

   constructor(props){
     super()
     this.wasClosing = false;
   }

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props){
       if (nextProps.isNotUpdate){
         return false;
       }
     }
     return true;
   }

   componentDidUpdate(prevProps, prevState){
     if (this.wasClosing){
       setTimeout(()=>{
         this.setState({});
       }, this.props.timeout)
     }
   }

  _handleClickDialog = (event) => {
    event.stopPropagation();
   }

  _renderCommandButton = () => {
    const {commandButtons, onClose} = this.props;
    return (
      <div style={Styles.COMMAND_DIV}>
        {commandButtons}
        <ToolBarButton
           type="TypeC"
           caption="Close"
           onClick={onClose}
        />
      </div>
    );
  }

  render(){
    const {
            isShow, isWithButton, style,
            caption, styleCaption,
            children, onClose
          } = this.props;

    let _className, _style;

    if (this.wasClosing){
      _style = Styles.HIDE;
      this.wasClosing = false;
    } else {
      _className = isShow ? ClassNames.SHOWING : ClassNames.HIDING;
      _style = isShow ? Styles.SHOW : Styles.HIDE_POPUP;
      if (!isShow){
        this.wasClosing = true;
      }
    }

    return (
         <div
             className={_className}
             style={Object.assign({}, Styles.ROOT_DIV, style, _style)}
             onClick={this._handleClickDialog}
         >
             <div style={Styles.CAPTON_DIV}>
                <span style={styleCaption}>{caption}</span>
                <SvgClose onClose={onClose} />
             </div>
             <div>
               {children}
             </div>
            {isWithButton && this._renderCommandButton()}
        </div>
    );
  }
}

export default ModalDialog;
