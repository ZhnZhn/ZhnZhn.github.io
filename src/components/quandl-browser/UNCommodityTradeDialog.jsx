import React from 'react';

import ZhDialog from '../ZhDialog';
import WithLoadOptions from '../dialogs/WithLoadOptions';
import WithValidation from '../dialogs/WithValidation';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const Placeholder = {
  TRADE : {
    INIT : 'First Load Meta',
    SELECT : 'Select...'
  }
};
const Filter = {
  DEFAULT : 'Default Empty'
};

const UNCommodityTradeDialog = React.createClass({
  ...WithLoadOptions,
  ...WithValidation,

  getInitialState(){
    this.nation = null;
    this.commodity = null;
    this.tradeFilter = null;
    this.trade = null;
    this.optionTrades = null;

    return {
      isLoadingCountries : false,
      isLoadingCountriesFailed : false,
      optionCountries : [],

      isLoadingCommodities : false,
      isLoadingCommoditiesFailed : false,
      optionCommodities : [],

      optionTradeFilter : [
        {caption: 'Default Empty Filter', value: Filter.DEFAULT},
        {caption: 'Import - Trade (USD)', value: 'Import - Trade (USD)'},
        {caption: 'Import - Weight (Kg)', value: 'Import - Weight (Kg)'},
        {caption: 'Export - Trade (USD)', value: 'Export - Trade (USD)'},
        {caption: 'Export - Weight (Kg)', value: 'Export - Weight (Kg)'},
        {caption: 'Re-Import - Trade (USD)', value: 'Re-Import - Trade (USD)'}

      ],

      isLoadingTrade : false,
      isLoadingTradeFailed : false,
      optionTrades : [],
      placeholderTrade : Placeholder.TRADE.INIT,

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

  _initTrade(){
    this.trade = null;
    this.optionTrades = null;
    this.setState({
      optionTrades: [],
      placeholderTrade: Placeholder.TRADE.INIT,
      isLoadingTradeFailed : false
    });
  },

  _filterTrade(){
    let options;
    if (this.tradeFilter && this.optionTrades){
      const filterValue = this.tradeFilter.value;
      if (filterValue !== Filter.DEFAULT){
        options = this.optionTrades.filter((item,index)=>{
           return item.caption.indexOf(filterValue) !== -1;
        })
      } else {
        options = this.optionTrades;
      }
    } else {
      options = this.optionTrades;
    }
    return options;
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
    this._initTrade();
  },
  _handlerSelectCommodity(commodity){
    this.commodity = commodity;
    this._initTrade();
  },
  _handlerSelectTradeFilter(filter){
     this.tradeFilter = filter;
     this.setState({optionTrades: this._filterTrade()});
  },
  _handlerSelectTrade(trade){
    this.trade = trade;
  },
  _handlerLoadMeta(){
    this._handlerWithValidationLoad(
      this._createMetaValidationMessages(),
      this._createLoadMetaOption,
      this._loadMeta
    );
  },
  _loadMeta(option){
    this.props.onLoad(option);
    this.setState({isLoadingTrade: true});
  },
  _createMetaValidationMessages(){
     let msg = [];
     if (!this.nation)    { msg.push(this.props.msgOnNotSelected('Nation'));}
     if (!this.commodity) { msg.push(this.props.msgOnNotSelected('Commodity'));}
     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadMetaOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , {fnValue} = this.props;
    return {
       value : fnValue(this.commodity.value, this.nation.value),
       fromDate: fromDate,
       toDate: toDate,
       isLoadMeta : true,
       onLoad : this._setOptionTrades,
       onFailed : this._loadMetaOptionFailed
    }
  },
  _setOptionTrades(optionTrades){
    this.optionTrades = optionTrades;
    this.setState({
      optionTrades: this._filterTrade(),
      isLoadingTrade: false,
      placeholderTrade: Placeholder.TRADE.SELECT
    });
  },
  _loadMetaOptionFailed(){
    this.setState({isLoadingTrade:false, isLoadingTradeFailed:true})
  },
  _handlerLoadData(){
    this._handlerWithValidationLoad(
      this._createDataValidationMessages(),
      this._createLoadDataOption
    );
  },
  _createDataValidationMessages(){
     let msg = [];
     if (!this.trade)  {msg.push(this.props.msgOnNotSelected('Trade'));}
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadDataOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , _dataColumn = (this.trade) ? this.trade.value : this.props.dataColumn
        , {fnValue} = this.props;
    return {
       value : fnValue(this.commodity.value, this.nation.value),
       fromDate: fromDate,
       toDate: toDate,
       dataColumn : _dataColumn,
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
           optionTradeFilter,
           isLoadingTrade, isLoadingTradeFailed, optionTrades, placeholderTrade,
           validationMessages
         } = this.state
        , _commandButtons = [
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load Meta"
          onClick={this._handlerLoadMeta}
       />,
       <ToolBarButton
          key="b"
          type="TypeC"
          caption="Load Data"
          onClick={this._handlerLoadData}
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
               caption={'Filter Trade:'}
               options={optionTradeFilter}
               placeholder={'Filter...'}
               onSelect={this._handlerSelectTradeFilter}
             />
             <RowInputSelect
               caption={'Trade:'}
               options={optionTrades}
               optionNames={'Meta'}
               isLoading={isLoadingTrade}
               isLoadingFailed={isLoadingTradeFailed}
               placeholder={placeholderTrade}
               onLoadOption={this._handlerLoadMeta}
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
