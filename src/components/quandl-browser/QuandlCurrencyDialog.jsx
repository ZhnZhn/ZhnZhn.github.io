import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import ZhDialog from '../ZhDialog';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import QuandlCurrency from '../../services/qe/QuandlCurrency';


const QuandlCurrencyDialog = React.createClass({
  ...WithValidation,

  displayName : 'QuandlCurrencyDialog',

  getInitialState(){
    this.source = null;
    this.currency = null;
    return {
       optionCurrencySources: QuandlCurrency.getCurrencySource(),
       optionCurrencies: [],
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

  _handlerSelectSource(source){
     if (source && source.value){
       this.source = source;
       this.currency = null;
       this.setState({optionCurrencies:QuandlCurrency.getCurrencies(source)})
     } else {
       this.source = null;
       this.currency = null;
     }
  },

  _handlerSelectCurrency(currency){
     this.currency = currency;
  },

  _handlerLoad(event){
    event.target.focus();
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
    const {msgOnNotSelected} = this.props;
    let   msg = [];

    if (!this.source)   { msg.push(msgOnNotSelected('Source')); }
    if (!this.currency) { msg.push(msgOnNotSelected('Currency')); }

    const {isValid, datesMsg} = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }

    msg.isValid = (msg.length === 0) ? true : false;

    return msg;
  },
  _createLoadOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , {dataColumn, fnValue} = this.props;
    return {
      value : fnValue(this.source.value, this.currency.value),
      source: this.source,
      currency: this.currency,
      fromDate: fromDate,
      toDate: toDate,
      dataColumn : dataColumn
    }
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  render(){
    const {
           isShow, onShow, onClose,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
       , {optionCurrencySources, optionCurrencies, validationMessages} = this.state
       , _commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    return(
         <ZhDialog
            caption="Quandl Currency Histories"
            isShow={isShow}
            commandButtons={_commandButtons}
            onShowChart={onShow}
            onClose={this._handlerClose}
         >
             <RowInputSelect
                caption={'Source:'}
                options={optionCurrencySources}
                onSelect={this._handlerSelectSource}
             />
             <RowInputSelect
                caption={'Currency:'}
                options={optionCurrencies}
                onSelect={this._handlerSelectCurrency}
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

export default QuandlCurrencyDialog;
