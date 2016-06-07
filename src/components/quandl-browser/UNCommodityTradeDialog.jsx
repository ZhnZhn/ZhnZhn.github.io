import React from 'react';

import ZhDialog from '../ZhDialog';
import WithLoadOptions from '../dialogs/WithLoadOptions';
import WithValidation from '../dialogs/WithValidation';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles';
const styles = DialogStyles;

const UNCommodityTradeDialog = React.createClass({
  ...WithLoadOptions,
  ...WithValidation,

  getInitialState(){
    this.nation = null;
    this.commodity = null;
    this.trade = null;

    return {
      isLoadingCountries : false,
      isLoadingCountriesFailed : false,
      optionCountries : [],

      isLoadingCommodities : false,
      isLoadingCommoditiesFailed : false,
      optionCommodities : [],

      optionTrades : [
        {caption: 'Import', value: 1},
        {caption: 'Export', value: 3}
      ],

      validationMessages: []
    }
  },

  componentDidMount(){
    this._handlerLoadNation();
    this._handlerLoadCommodity();
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
         this._handlerLoadNation();
       }
       if (this.state.isLoadingCommoditiesFailed && this.props.isShow){
         this._handlerLoadCommodity();
       }
    }
  },

  componetWillUnmount(){
    this._unmountWithLoadOptions();
  },

  _handlerLoadNation(){
    const {countryURI, countryJsonProp} = this.props;
    this._handlerWithLoadOptions(
          'optionCountries', 'isLoadingCountries', 'isLoadingCountriesFailed',
          countryURI, countryJsonProp
    );
  },
  _handlerLoadCommodity(){
    const {commodityURI, commodityJsonProp} = this.props;
    this._handlerWithLoadOptions(
         'optionCommodities', 'isLoadingCommodities', 'isLoadingCommoditiesFailed',
         commodityURI, commodityJsonProp
    );
  },
  _handlerSelectNation(nation){
    this.nation = nation;
  },
  _handlerSelectCommodity(commodity){
    this.commodity = commodity;
  },
  _handlerSelectTrade(trade){
    this.trade = trade;
  },
  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     let msg = [];
     if (!this.nation)    { msg.push(this.props.msgOnNotSelected('Nation'));}
     if (!this.commodity) { msg.push(this.props.msgOnNotSelected('Commodity'));}
     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , _dataColumn = (this.trade) ? this.trade.value : this.props.dataColumn
        , {fnValue} = this.props;
    return {
       value : fnValue(this.commodity.value, this.nation.value),
       fromDate: fromDate,
       toDate: toDate,
       dataColumn : _dataColumn
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
           optionCommodities, isLoadingCommodities, isLoadingCommoditiesFailed,
           optionTrades,
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

    return(
        <ZhDialog
             caption="United Nations Commodity Trade"
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
                onLoadOption={this._handlerLoadNation}
                onSelect={this._handlerSelectNation}
             />
             <RowInputSelect
                caption={'Commodity:'}
                options={optionCommodities}
                optionNames={'Commodities'}
                isLoading={isLoadingCommodities}
                isLoadingFailed={isLoadingCommoditiesFailed}
                onLoadOption={this._handlerLoadCommodity}
                onSelect={this._handlerSelectCommodity}
             />
             <RowInputSelect
               caption={'Trade:'}
               options={optionTrades}
               onSelect={this._handlerSelectTrade}
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

export default UNCommodityTradeDialog
