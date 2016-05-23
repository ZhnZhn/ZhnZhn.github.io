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
  getInitialState(){
    return {
       currencySource: null,
       currency: null,
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

  _handlerSelectSource(currencySource){
     this.state.currencySource = currencySource;
     this.state.currency = null;
     this.state.optionCurrencies = QuandlCurrency.getCurrencies(currencySource);
     this.setState(this.state);
  },

  _handlerSelectCurrency(currency){
     this.state.currency = currency;
  },


  _handlerLoad(event){
    event.target.focus();
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const {fromDate, toDate} = this.refs.datesFragment.getValues();
      const {currencySource, currency} = this.state;
      const option = {
        value : currencySource.value + '/' + currency.value,
        source: currencySource,
        currency: currency,
        fromDate: fromDate,
        toDate: toDate
      }
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    const validationMessages = [];

    if (!this.state.currencySource){
      validationMessages.push("Source is Required to Select");
    }
    if (!this.state.currency){
      validationMessages.push("Currency is Required to Select");
    }
    if (!this.refs.datesFragment.isValid()){
      validationMessages.push("Some Date is not in Valid Format");
    }
    validationMessages.isValid = (validationMessages.length === 0) ? true : false;

    return validationMessages;
  },


  render(){
    let commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    const {isShow, onShow, onClose} = this.props;

    return(
         <ZhDialog
            caption="Quandl Currency Histories"
            isShow={isShow}
            commandButtons={commandButtons}
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
                  options={this.state.optionCurrencySources}
                />
             </div>
             <div style={styles.rowDiv} key="2">
               <span style={styles.labelSpan}>
                  Currency:
               </span>
               <ZhSelect
                  width="250"
                  onSelect={this._handlerSelectCurrency}
                  options={this.state.optionCurrencies}
                />
             </div>
             <DatesFragment
                 key="3"
                 ref="datesFragment"
                 initFromDate={this.props.initFromDate}
                 initToDate={this.props.initToDate}
                 onTestDate={this.props.onTestDate}
             />
             <ValidationMessagesFragment
                 key="4"
                 validationMessages={this.state.validationMessages}
             />
       </ZhDialog>

    );
  }
});

export default QuandlCurrencyDialog;
