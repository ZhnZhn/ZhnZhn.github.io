import React from 'react';

import {ChartType} from '../../constants/Type';

import ZhDialog from '../ZhDialog';
import WithLoadOptions from '../dialogs/WithLoadOptions';
import WithValidation from '../dialogs/WithValidation';
import Row from '../dialogs/Row';
import RowInputSelect from '../dialogs/RowInputSelect';
import ButtonCircle from '../zhn/ButtonCircle';
import ShowHide from '../zhn/ShowHide';
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
  DEFAULT : 'Default Empty',
  IMPORT : 'Import - Trade (USD)',
  EXPORT : 'Export - Trade (USD)',
  REIMPORT : 'Re-Import - Trade (USD)',
  REEXPORT : 'Re-Export - Trade (USD)'
};
const Styles = {
  ROW : {
    paddingTop: '4px',
    paddingBottom: '8px'
  },
  BUTTON_CIRCLE : {
    marginLeft: '20px'
  }
}

const UNCommodityTradeDialog = React.createClass({
  ...WithLoadOptions,
  ...WithValidation,

  getInitialState(){
    this.country = null;
    this.chapter = null;
    this.tradeFilter = null;
    this.subheading = null;
    this.optionTrades = null;
    this.chartType = null;

    return {
      isShowFilter : false,
      isShowDate : true,
      isShowChartType : false,

      isLoadingCountries : false,
      isLoadingCountriesFailed : false,
      optionCountries : [],

      isLoadingCommodities : false,
      isLoadingCommoditiesFailed : false,
      optionCommodities : [],

      optionTradeFilter : [
        {caption: 'Default : Empty Filter', value: Filter.DEFAULT},
        {caption: 'Import - Trade (USD)', value: 'Import - Trade (USD)'},
        {caption: 'Import - Weight (Kg)', value: 'Import - Weight (Kg)'},
        {caption: 'Export - Trade (USD)', value: 'Export - Trade (USD)'},
        {caption: 'Export - Weight (Kg)', value: 'Export - Weight (Kg)'},
        {caption: 'Re-Import - Trade (USD)', value: 'Re-Import - Trade (USD)'},
        {caption: 'Re-Export - Trade (USD)', value: 'Re-Export - Trade (USD)'},
      ],
      isLoadingTrade : false,
      isLoadingTradeFailed : false,
      optionTrades : [],
      placeholderTrade : Placeholder.TRADE.INIT,

      optionChartTypes : [
        {caption : 'Default : Area', value: ChartType.AREA},
        {caption : 'Semi Donut : Total Top90, On Every Year : Recent 2 Years', value: ChartType.SEMI_DONUT},
        {caption : 'Stacked Area : Total Top90, On Recent Year', value: ChartType.STACKED_AREA},
        {caption : 'Stacked Column : Total Top90, On Recent Year', value: ChartType.STACKED_COLUMN},
        {caption : 'Tree Map : On Recent Year', value: ChartType.TREE_MAP}
      ],

      validationMessages: []
    }
  },

  componentDidMount(){
    this._handlerLoadCountry();
    this._handlerLoadChapter();
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
       if (this.state.isLoadingCommoditiesFailed && this.props.isShow){
         this._handlerLoadChapter();
       }
    }
  },

  componetWillUnmount(){
    this._unmountWithLoadOptions();
  },

  _initTrade(){
    this.subheading = null;
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
        if (filterValue === Filter.IMPORT){
           options = options.filter((item,index)=>{
              return item.caption.indexOf(Filter.REIMPORT) === -1;
           })
        }
        if (filterValue === Filter.EXPORT){
           options = options.filter((item,index)=>{
             return item.caption.indexOf(Filter.REEXPORT) === -1;
           })
        }
      } else {
        options = this.optionTrades;
      }
    } else {
      options = this.optionTrades;
    }
    return options;
  },

  _handlerClickAll(){
    const {isShowFilter, isShowDate, isShowChartType} = this.state
        , _isShow = (isShowFilter || isShowDate || isShowChartType) ? false : true;
    this.setState({
        isShowFilter : _isShow,
        isShowDate : _isShow,
        isShowChartType : _isShow
      })
  },
  _handlerClickFilter(){
    this.setState({isShowFilter: !this.state.isShowFilter});
  },
  _handlerClickDate(){
    this.setState({isShowDate: !this.state.isShowDate});
  },
  _handlerClickChartType(){
    this.setState({isShowChartType: !this.state.isShowChartType});
  },
  _handlerLoadCountry(){
    const {countryURI, countryJsonProp} = this.props;
    this._handlerWithLoadOptions(
          'optionCountries', 'isLoadingCountries', 'isLoadingCountriesFailed',
          countryURI, countryJsonProp
    );
  },
  _handlerLoadChapter(){
    const {commodityURI, commodityJsonProp} = this.props;
    this._handlerWithLoadOptions(
         'optionCommodities', 'isLoadingCommodities', 'isLoadingCommoditiesFailed',
         commodityURI, commodityJsonProp
    );
  },
  _handlerSelectCountry(country){
    this.country = country;
    this._initTrade();
  },
  _handlerSelectChapter(chapter){
    this.chapter = chapter;
    this._initTrade();
  },
  _handlerSelectTradeFilter(filter){
     this.tradeFilter = filter;
     this.setState({optionTrades: this._filterTrade()});
  },
  _handlerSelectTrade(trade){
    this.subheading = trade;
  },
  _handlerSelectChartType(chartType){
    this.chartType = chartType;
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
     if (!this.country)    { msg.push(this.props.msgOnNotSelected('Country'));}
     if (!this.chapter) { msg.push(this.props.msgOnNotSelected('Subheading'));}
     const {isValid, datesMsg} = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadMetaOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , {fnValue} = this.props;
    return {
       value : fnValue(this.chapter.value, this.country.value),
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
      isLoadingTradeFailed: false,
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
     if ( !this.chartType || this.chartType.value === ChartType.AREA){
       if (!this.subheading)  {msg.push(this.props.msgOnNotSelected('Subheading'));}
     } else {
       if (!this.tradeFilter) {msg.push(this.props.msgOnNotSelected('Trade Filter'));}
     }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadDataOption(){
    const {fromDate, toDate} = this.datesFragment.getValues()
        , _dataColumn = (this.subheading) ? this.subheading.value : this.props.dataColumn
        , {fnValue} = this.props
        , _chartType = (this.chartType) ? this.chartType.value : undefined
        , _title = (this.tradeFilter) ?
                   `${this.country.caption}:${this.tradeFilter.caption}` :
                   `${this.country.caption}`
    return {
       value : fnValue(this.chapter.value, this.country.value),
       fromDate: fromDate,
       toDate: toDate,
       dataColumn : _dataColumn,
       seriaType : _chartType,
       sliceItems : this._createSpliceItems(),
       title : _title,
       subtitle: this.chapter.caption
    }
  },
  _createSpliceItems(){
     const _filterLength = this.tradeFilter.value.length + 2;
     return this.state.optionTrades.map((item, index) => {
        let {value, caption} = item;
        caption = caption.substring( 0, (caption.length - _filterLength) );
        return { caption, value }
     })
  },
  _handlerClose(){
    this._handlerWithValidationClose(this._createMetaValidationMessages);
    this.props.onClose();
  },


  render(){
    const {
           isShow, onShow, onClose,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
           isShowFilter, isShowDate, isShowChartType,
           optionCountries, isLoadingCountries, isLoadingCountriesFailed,
           optionCommodities, isLoadingCommodities, isLoadingCommoditiesFailed,
           optionTradeFilter,
           isLoadingTrade, isLoadingTradeFailed, optionTrades, placeholderTrade,
           optionChartTypes,
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
             <Row style={Styles.ROW}>
               <ButtonCircle
                 caption={'A'}
                 style={Styles.BUTTON_CIRCLE}
                 onClick={this._handlerClickAll}
               />
               <ButtonCircle
                 caption={'F'}
                 style={Styles.BUTTON_CIRCLE}
                 onClick={this._handlerClickFilter}
               />
               <ButtonCircle
                 caption={'D'}
                 style={Styles.BUTTON_CIRCLE}
                 onClick={this._handlerClickDate}
               />
               <ButtonCircle
                 caption={'C'}
                 style={Styles.BUTTON_CIRCLE}
                 onClick={this._handlerClickChartType}
               />
             </Row>

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
                caption={'Chapter:'}
                options={optionCommodities}
                optionNames={'Chapters'}
                isLoading={isLoadingCommodities}
                isLoadingFailed={isLoadingCommoditiesFailed}
                onLoadOption={this._handlerLoadChapter}
                onSelect={this._handlerSelectChapter}
             />
             <ShowHide isShow={isShowFilter}>
               <RowInputSelect
                 caption={'Filter Trade:'}
                 options={optionTradeFilter}
                 placeholder={'Filter...'}
                 onSelect={this._handlerSelectTradeFilter}
               />
             </ShowHide>
             <RowInputSelect
               caption={'Subheading:'}
               options={optionTrades}
               optionNames={'Meta'}
               isLoading={isLoadingTrade}
               isLoadingFailed={isLoadingTradeFailed}
               placeholder={placeholderTrade}
               onLoadOption={this._handlerLoadMeta}
               onSelect={this._handlerSelectTrade}

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
             <ShowHide isShow={isShowChartType}>
               <RowInputSelect
                 caption={'Chart Type:'}
                 options={optionChartTypes}
                 onSelect={this._handlerSelectChartType}
               />
             </ShowHide>
             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});

export default UNCommodityTradeDialog
