import React from 'react';

import WithValidation from '../dialogs/WithValidation';
import WithLoadOptions from '../dialogs/WithLoadOptions';

import ZhDialog from '../ZhDialog';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const FuturesDialog = React.createClass({
  ...WithValidation,
  ...WithLoadOptions,

  displayName : 'FuturesDialog',
  getInitialState(){
    this.code = null;
    this.OPTIONS_STATE_PROP = 'optionCodes';
    this.toolbarButtons = [
      { caption: 'I', onClick: this._handlerClickInfo }
    ];
    const _isLoading = (this.props.optionURI) ? true : false;
    return {
      isLoading : _isLoading,
      isLoadingFailed : false,
      optionCodes : [],
      validationMessages: [],
    }
  },

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },

  componentDidMount(){
    this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
  },
  componentDidUpdate(prevProps, prevState){
    if (prevProps !== this.props){
       if (this.state.isLoadingFailed && this.props.optionURI && this.props.isShow){
         this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
       }
    }
  },
  componetWillUnmount(){
    this._unmountWithLoadOptions();
  },

  _handlerClickInfo(){
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  },

  _handlerLoadOptions(){
     this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
  },

  _handlerSelectCode(code){
    this.code = code;
  },
  _handlerLoad(event){
    event.target.focus();
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
    const {msgOnNotSelected} = this.props
        , msg = [];

    if (!this.code) { msg.push(msgOnNotSelected('Code')); }

    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },
  _createLoadOption(){
    const {dataColumn} = this.props;
    return {
       value : this.code.value,
       code : this.code,
       dataColumn : dataColumn
    };
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  render(){
    const {isShow, caption, onShow, onClose} = this.props
        , {isLoading, isLoadingFailed, optionCodes, validationMessages} = this.state
        , _commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    return (
       <ZhDialog
           caption={caption}
           isShow={isShow}
           commandButtons={_commandButtons}
           onShowChart={onShow}
           onClose={this._handlerClose}
       >
          <ToolbarButtonCircle
            buttons={this.toolbarButtons}
          />
          <RowInputSelect
             caption={'Code:'}
             isLoading={isLoading}
             isLoadingFailed={isLoadingFailed}
             options={optionCodes}
             optionNames={'Codes'}
             onLoadOption={this._handlerLoadOptions}
             onSelect={this._handlerSelectCode}
          />
          <ValidationMessagesFragment
            validationMessages={validationMessages}
          />
      </ZhDialog>
    );
  }
});

export default FuturesDialog;
