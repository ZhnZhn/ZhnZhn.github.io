import React, { Component } from 'react';
//import PropTypes from "prop-types";

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators'

@Decor.withToolbar
@Decor.withValidationLoad
class DialogEurostat extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,

    oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,

    twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,

    msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
  */
  
  constructor(props){
    super();
    this.one = undefined;
    this.two = undefined;
    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar.bind(this) }
    ];
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
      validationMessages: []
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _handleSelectOne = (one) => {
    this.one = one;
  }
  _handleSelectTwo = (two) => {
    this.two = two;
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const { oneCaption, twoCaption } = this.props;
     let msg = [];

     if (!this.one) { msg.push(this.props.msgOnNotSelected(oneCaption)); }
     if (!this.two) { msg.push(this.props.msgOnNotSelected(twoCaption)); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  _createLoadOption = () => {
    return this.props.loadFn(
      this.props,
      { one : this.one, two : this.two }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp
          } = this.props
        , { validationMessages } = this.state;

    return(
        <D.DraggableDialog
             caption={caption}
             isShow={isShow}
             commandButtons={this._commandButtons}
             onShowChart={onShow}
             onFront={onFront}
             onClose={this._handleClose}
         >
             <D.ToolbarButtonCircle
               buttons={this.toolbarButtons}
             />

             <D.SelectWithLoad
               isShow={isShow}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames="Items"
               onSelect={this._handleSelectOne}
             />

             <D.SelectWithLoad
               isShow={isShow}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames="Items"
               onSelect={this._handleSelectTwo}
             />

             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default DialogEurostat
