import React from 'react';

import ZhDialog from '../ZhDialog';
import WithToolbar from '../dialogs/WithToolbar';
import WithValidation from '../dialogs/WithValidation';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectWithLoad from '../dialogs/SelectWithLoad';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';
import ShowHide from '../zhn/ShowHide';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const BigMacDialog = React.createClass({
  ...WithToolbar,
  ...WithValidation,

  getInitialState(){
     this.country = null;
     this.metric =null;

     this.toolbarButtons = this._createType2WithToolbar();

     return {
        isShowDate : true,
        optionMetrics : [
          { caption : 'Local Price', value : 1},
          { caption : 'Dollar Exchange', value : 2},
          { caption : 'Dollar Price', value : 3},
          { caption : 'Dollar PPP', value : 4},
          { caption : 'Dollar Valuation', value : 5}
        ],

        validationMessages: []
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
  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     let msg = [];
     if (!this.country) { msg.push(this.props.msgOnNotSelected('Country'));}
     const { isValid, datesMsg } = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , _dataColumn = (this.metric) ? this.metric.value : 1
        , _subtitle = (this.metric)
              ? this.metric.caption
              : this.state.optionMetrics[0].caption
        , {loadId, fnValue} = this.props;
    return {
       value : fnValue(this.country.value),
       fromDate: fromDate,
       toDate: toDate,
       dataColumn : _dataColumn,
       itemCaption : this.country.caption,
       loadId : loadId,
       title : this.country.caption,
       subtitle : _subtitle
    }
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  render(){
    const {
           isShow, onShow,
           countryURI, countryJsonProp,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , { isShowDate, optionMetrics, validationMessages } = this.state
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
           <ToolbarButtonCircle
             buttons={this.toolbarButtons}
           />

           <SelectWithLoad
             isShow={isShow}
             uri={countryURI}
             jsonProp={countryJsonProp}
             caption={'Country:'}
             optionNames={'Countries'}
             onSelect={this._handlerSelectCountry}
           />
           <RowInputSelect
              caption={'Metric:'}
              options={optionMetrics}
              onSelect={this._handlerSelectMetric}
           />
           <ShowHide isShow={isShowDate}>
             <DatesFragment
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
             />
           </ShowHide>
           <ValidationMessagesFragment
               validationMessages={validationMessages}
           />
      </ZhDialog>
    );
  }
})

export default BigMacDialog
