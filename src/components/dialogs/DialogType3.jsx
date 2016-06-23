import React from 'react';

import WithValidation from './WithValidation';
import WithLoadOptions from './WithLoadOptions';

import ZhDialog from '../ZhDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import RowInputSelect from './RowInputSelect';
import ToolBarButton from '../ToolBarButton';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const DialogType3 = React.createClass({
  ...WithValidation,
  ...WithLoadOptions,

  displayName : 'DialogType3',

  getInitialState(){
    this.stock = null;
    this.OPTIONS_STATE_PROP = 'optionStocks';
    const { optionURI, optionStocks, descrUrl} = this.props
        , _isLoading = (optionURI) ? true : false
        , _optionStocks = (optionURI) ? [] : optionStocks;

    this.toolbarButtons = (descrUrl)
         ?  [{ caption: 'I', onClick: this._handlerClickInfo }] : [];

    return {
      isLoading : _isLoading,
      isLoadingFailed : false,
      optionStocks : _optionStocks,
      validationMessages: [],
    }
  },

  componentDidMount(){
    if (this.props.optionURI){
       this._handlerWithLoadOptions(this.OPTIONS_STATE_PROP);
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

  _handlerSelectStock(stock){
    this.stock = stock
  },

  _handlerLoad(event){
    event.target.focus();
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },

  _createValidationMessages(){
    const {itemCaption='Stock'} = this.props;
    let msg = [];
    if (!this.stock) { msg.push(this.props.msgOnNotSelected(itemCaption));}
    const {isValid, datesMsg} = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },
  _createLoadOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , {dataColumn, fnItemCaption} = this.props
        , _itemCaption = (typeof fnItemCaption === 'function') ?
                       fnItemCaption(this.stock.value) : undefined;
    return {
      value : this.stock.value,
      stock: this.stock,
      fromDate: fromDate,
      toDate: toDate,
      dataColumn : dataColumn,
      itemCaption : _itemCaption
    }
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose()
  },

  render(){
    const {
            caption, isShow, onShow, onClose,
            itemCaption='Stock:', optionNames='Stocks',
            initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {isLoading, isLoadingFailed, optionStocks, validationMessages} = this.state
        , _commandButtons = [
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
            caption={itemCaption}
            options={optionStocks}
            optionNames={optionNames}
            isLoading={isLoading}
            isLoadingFailed={isLoadingFailed}
            onLoadOption={this._handlerLoadOptions}
            onSelect={this._handlerSelectStock}
         />
        <DatesFragment
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            msgOnNotValidFormat={msgOnNotValidFormat}
            onTestDate={onTestDate}
        />
        <ValidationMessagesFragment
            validationMessages={validationMessages}
        />
      </ZhDialog>
    );
  }
});

export default DialogType3;
