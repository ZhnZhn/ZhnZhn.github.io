import React from 'react';

import ZhDialog from '../ZhDialog';
import WithLoadOptions from '../dialogs/WithLoadOptions';
import WithValidation from '../dialogs/WithValidation';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const BigMacDialog = React.createClass({
  ...WithLoadOptions,
  ...WithValidation,

  getInitialState(){
     this.country = null;
     this.metric =null;
     return {
        isLoadingCountries : false,
        isLoadingCountriesFailed : false,
        optionCountries : [],
        optionMetrics : [
          { caption : 'Local Price', value : 1},
          { caption : 'Dollar Exchange', value : 2},
          { caption : 'Dollar Price', value : 3},
          { caption : 'Dollar PPP', value : 4},
          { caption : 'Dollar Valuation', value : 5},
        ],

        validationMessages: []
     }
  },

  componentDidMount(){
    this._handlerLoadCountry();
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
       if (this.state.isLoadingCountriesFailed && this.props.isShow){
         this._handlerLoadCountry();
       }
    }
  },

  componetWillUnmount(){
    this._unmountWithLoadOptions();
  },

  _handlerLoadCountry(){
    const {countryURI, countryJsonProp} = this.props;
    this._handlerWithLoadOptions(
          'optionCountries', 'isLoadingCountries', 'isLoadingCountriesFailed',
          countryURI, countryJsonProp
    );
  },
  _handlerSelectCountry(country){
    this.country = country;
  },
  _handlerSelectMetric(metric){
    this.metric = metric;
  },
  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     let msg = [];
     if (!this.country) { msg.push(this.props.msgOnNotSelected('Country'));}
     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , _dataColumn = (this.metric) ? this.metric.value : 1
        , {fnValue} = this.props;
    return {
       value : fnValue(this.country.value),
       fromDate: fromDate,
       toDate: toDate,
       dataColumn : _dataColumn,
       itemCaption : this.country.caption
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
        , {
           optionCountries, isLoadingCountries, isLoadingCountriesFailed,
           optionMetrics,
           validationMessages
         } = this.state
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
           caption="Economist Big Mac Index"
           isShow={isShow}
           commandButtons={_commandButtons}
           onShowChart={onShow}
           onClose={this._handlerClose}
       >
           <RowInputSelect
              caption={'Country:'}
              options={optionCountries}
              optionNames={'Countries'}
              isLoading={isLoadingCountries}
              isLoadingFailed={isLoadingCountriesFailed}
              onLoadOption={this._handlerLoadCountry}
              onSelect={this._handlerSelectCountry}
           />
           <RowInputSelect
              caption={'Metric:'}
              options={optionMetrics}
              onSelect={this._handlerSelectMetric}
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
})

export default BigMacDialog
