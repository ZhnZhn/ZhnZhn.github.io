import React from 'react';

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
  getInitialState: function(){
    return {
      optionCountries: ISO3Country.getCountries(),
      optionMetrics: QuandlWorldBankEconomic.getMetrics(),
      itemCountry: null,
      itemMetric: null,
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

  _handlerSelectCountry: function(itemCountry){
    this.state.itemCountry = itemCountry;
  },

  _handlerSelectMetric: function(itemMetric){
    this.state.itemMetric = itemMetric;
  },



  _handlerLoad: function(event){
    event.target.focus();
    if (this._validateInput()){
      const {fromDate, toDate} = this.refs.datesFragment.getValues();
      const {itemCountry, itemMetric} = this.state;
      const option = {
        value: 'WWDI/' + itemCountry.value + '_' + itemMetric.value,
        country: itemCountry,
        metric: itemMetric,
        fromDate: fromDate,
        toDate: toDate,
      }
      this.props.onLoad(option);
    }
    this.setState(this.state);
  },

  _validateInput: function(){
    let result = true;
    this.state.validationMessages = [];

    if (!this.state.itemCountry){
      this.state.validationMessages.push("Country is Required to Select");
      result = false;
    }

    if (!this.state.itemMetric){
      this.state.validationMessages.push("Metric is Required to Select");
      result = false;
    }

    if (!this.refs.datesFragment.isValid()){
      this.state.validationMessages.push("Some Date is not in Valid Format");
      result = false;
    }

    return result;
  },

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
    return (
      <ZhDialog
            caption="World Bank Economic"
            isShow={isShow}
            commandButtons={commandButtons}
            onClose={onClose}
            onShowChart={onShow}
      >
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Country:
           </span>
           <ZhSelect
             width="250"
             onSelect={this._handlerSelectCountry}
             options={this.state.optionCountries}
          />
        </div>
        <div style={styles.rowDiv} key="2">
          <span style={styles.labelSpan}>
            Metric:
          </span>
          <ZhSelect
            width="250"
            onSelect={this._handlerSelectMetric}
            options={this.state.optionMetrics}
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

export default QuandlWorldBankEconomicDialog;
