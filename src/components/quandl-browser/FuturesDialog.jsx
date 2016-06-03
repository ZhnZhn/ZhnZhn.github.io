import React from 'react';

import WithValidation from '../dialogs/WithValidation';
import WithLoadOptions from '../dialogs/WithLoadOptions';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const FuturesDialog = React.createClass({
  ...WithValidation,
  ...WithLoadOptions,

  displayName : 'QuandlFuturesChinaDceDialog',
  getInitialState(){
    this.code = null;
    this.OPTIONS_STATE_PROP = 'optionCodes';
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

  _handlerLoadOptions(){
     this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
  },

  _handlerSelectCode(code){
    this.code = code;
  },

  _handlerLoad(event){
     event.target.focus();
     const validationMessages = this._getValidationMessages();
     if (validationMessages.isValid){
       const {dataColumn} = this.props;
       const option = {
          value : this.code.value,
          code : this.code,
          dataColumn : dataColumn
       };
       this.props.onLoad(option);
     }
     this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    const {msgOnNotSelected} = this.props
        , msg = [];

    if (!this.code) { msg.push(msgOnNotSelected('Code')); }

    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
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
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Code:
           </span>
           <ZhSelect
             width="250"
             isLoading={isLoading}
             isLoadingFailed={isLoadingFailed}
             onLoadOption={this._handlerLoadOptions}
             options={optionCodes}
             optionNames={'Codes'}
             onSelect={this._handlerSelectCode}
           />
        </div>
        <ValidationMessagesFragment
            key="3"
            validationMessages={validationMessages}
        />
      </ZhDialog>
    );
  }
});

export default FuturesDialog;
