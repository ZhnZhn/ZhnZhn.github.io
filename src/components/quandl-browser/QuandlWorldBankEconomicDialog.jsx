import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import ZhDialog from '../ZhDialog';
import ToolBarButton from '../ToolBarButton';
import ZhSelect from '../ZhSelect';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import ISO3Country from '../../services/qe/ISO3Country'
import QuandlWorldBankEconomic from '../../services/qe/QuandlWorldBankEconomic';

import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const QuandlWorldBankEconomicDialog = React.createClass({
  ...WithValidation,

  displayName : 'QuandlWorldBankEconomicDialog',

  getInitialState(){
    this.country = null;
    this.metric = null;
    return {
      optionCountries: ISO3Country.getCountries(),
      optionMetrics: QuandlWorldBankEconomic.getMetrics(),
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

  _handlerSelectCountry(country){
    this.country = country;
  },

  _handlerSelectMetric(metric){
    this.metric = metric;
  },

  _handlerLoad(event){
    event.target.focus();
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const {fromDate, toDate} = this.datesFragment.getValues()
          , {dataColumn} = this.props;
      const option = {
        value: 'WWDI/' + this.country.value + '_' + this.metric.value,
        country: this.country,
        metric: this.metric,
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

    if (!this.country) { msg.push(msgOnNotSelected('Country')); }
    if (!this.metric)  { msg.push(msgOnNotSelected('Metric')); }

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
       , {optionCountries, optionMetrics, validationMessages} = this.state
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
            caption="World Bank Economic"
            isShow={isShow}
            commandButtons={_commandButtons}
            onClose={this._handlerClose}
            onShowChart={onShow}
      >
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Country:
           </span>
           <ZhSelect
             width="250"
             onSelect={this._handlerSelectCountry}
             options={optionCountries}
          />
        </div>
        <div style={styles.rowDiv} key="2">
          <span style={styles.labelSpan}>
            Metric:
          </span>
          <ZhSelect
            width="250"
            onSelect={this._handlerSelectMetric}
            options={optionMetrics}
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

export default QuandlWorldBankEconomicDialog;
