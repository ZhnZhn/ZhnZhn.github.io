import React from 'react';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import QuandlCurrency from '../../services/qe/QuandlCurrency';

import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const QuandlCurrencyDialog = React.createClass({

  getInitialState: function(){
    return {
       currencySource: null,
       currency: null,
       optionCurrencySources: QuandlCurrency.getCurrencySource(),
       optionCurrencies: [],
       validationMessages: [],
    }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },

  _handlerSelectSource: function(currencySource){
     this.state.currencySource = currencySource;
     this.state.currency = null;
     this.state.optionCurrencies = QuandlCurrency.getCurrencies(currencySource);
     this.setState(this.state);
  },

  _handlerSelectCurrency: function(currency){
     this.state.currency = currency;
  },


  _handlerLoad: function(event){
    event.target.focus();

    if (this._validateInput()){
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
    this.setState(this.state);
  },

  _validateInput: function(){
    let result = true;
    this.state.validationMessages = [];

    if (!this.state.currencySource){
      this.state.validationMessages.push("Source is Required to Select");
      result = false;
    }

    if (!this.state.currency){
      this.state.validationMessages.push("Currency is Required to Select");
      result = false;
    }

    if (!this.refs.datesFragment.isValid()){
      this.state.validationMessages.push("Some Date is not in Valid Format");
      result = false;
    }

    return result;
  },

 /*
  _handlerShowChart: function(){
    QuandlCurrencyActions.showChart();
  },
  */


  render: function(){
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
            onClose={onClose}
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
