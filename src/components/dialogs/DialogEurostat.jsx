import React, { Component } from 'react';

import createLoadOptions from '../../flux/creaters/eurostat'

import ZhDialog from '../ZhDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import ToolBarButton from '../ToolBarButton';

import ValidationMessagesFragment from '../ValidationMessagesFragment';

import withToolbar from './decorators/withToolbar';
import withValidationLoad from './decorators/withValidationLoad';

@withToolbar
@withValidationLoad
class DialogEurostat extends Component {

  state = {
    validationMessages: []
  }

  constructor(props){
    super();
    this.one = undefined;
    this.two = undefined;
    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar.bind(this) }
    ];
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
    return createLoadOptions(
      this.props,
      { one : this.one, two : this.two }
    )
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

  render(){
    const {
           caption, isShow, onShow,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp
          } = this.props
        , { validationMessages } = this.state
        , _commandButtons = [
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handleLoad}
       />
    ];

    return(
        <ZhDialog
             caption={caption}
             isShow={isShow}
             commandButtons={_commandButtons}
             onShowChart={onShow}
             onClose={this._handleClose}
         >
             <ToolbarButtonCircle
               buttons={this.toolbarButtons}
             />

             <SelectWithLoad
               isShow={isShow}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames={'Items'}
               onSelect={this._handleSelectOne}
             />

             <SelectWithLoad
               isShow={isShow}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames={'Items'}
               onSelect={this._handleSelectTwo}
             />

             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
}

DialogEurostat.displayName = 'DialogEurostat';

export default DialogEurostat;
