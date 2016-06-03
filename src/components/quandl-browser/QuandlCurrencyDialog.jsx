import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import QuandlCurrency from '../../services/qe/QuandlCurrency';

import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

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
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const {fromDate, toDate} = this.datesFragment.getValues()
          , {dataColumn} = this.props;
      const option = {
        value : this.source.value + '/' + this.currency.value,
        source: this.source,
        currency: this.currency,
        fromDate: fromDate,
        toDate: toDate,
        dataColumn : dataColumn
      }
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    const {msgOnNotSelected} = this.props;
    let   msg = [];

    if (!this.source)   { msg.push(msgOnNotSelected('Source')); }
    if (!this.currency) { msg.push(msgOnNotSelected('Currency')); }

    const {isValid, datesMsg} = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }

    msg.isValid = (msg.length === 0) ? true : false;

    return msg;
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
             <div style={styles.rowDiv} key="1">
               <span style={styles.labelSpan}>
                  Source:
               </span>
               <ZhSelect
                  width="250"
                  onSelect={this._handlerSelectSource}
                  options={optionCurrencySources}
                />
             </div>
             <div style={styles.rowDiv} key="2">
               <span style={styles.labelSpan}>
                  Currency:
               </span>
               <ZhSelect
                  width="250"
                  onSelect={this._handlerSelectCurrency}
                  options={optionCurrencies}
                />
             </div>
             <DatesFragment
                 key="3"
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
             />
             <ValidationMessagesFragment
                 key="4"
                 validationMessages={validationMessages}
             />
       </ZhDialog>
    );
  }
});

export default QuandlCurrencyDialog;
