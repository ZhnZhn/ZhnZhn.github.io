import React, { Component } from 'react';

import { ChartType } from '../../constants/Type';

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators'

const S = {
  BT_ROOT: {
     color: 'rgb(35, 47, 59)'
  }
};

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

const TRADE_FILTER_OPTIONS = [
  { caption: 'Default : Empty Filter', value: Filter.DEFAULT },
  { caption: 'Import - Trade (USD)', value: 'Import - Trade (USD)' },
  { caption: 'Import - Weight (Kg)', value: 'Import - Weight (Kg)' },
  { caption: 'Export - Trade (USD)', value: 'Export - Trade (USD)' },
  { caption: 'Export - Weight (Kg)', value: 'Export - Weight (Kg)' },
  { caption: 'Re-Import - Trade (USD)', value: 'Re-Import - Trade (USD)' },
  { caption: 'Re-Export - Trade (USD)', value: 'Re-Export - Trade (USD)' }
]

const CHART_TYPE_OPTIONS = [
  { caption : 'Default : Area', value: ChartType.AREA },
  { caption : 'Semi Donut : Total Top90, On Every Year : Recent 2 Years', value: ChartType.SEMI_DONUT },
  { caption : 'Stacked Area : Total Top90, On Recent Year', value: ChartType.STACKED_AREA },
  { caption : 'Stacked Area Percent : Total Top90, On Recent Year', value: ChartType.STACKED_AREA_PERCENT },
  { caption : 'Stacked Column : Total Top90, On Recent Year', value: ChartType.STACKED_COLUMN },
  { caption : 'Stacked Column Percent : Total Top90, On Recent Year', value: ChartType.STACKED_COLUMN_PERCENT },
  { caption : 'Tree Map : On Recent Year', value: ChartType.TREE_MAP }
]

@Decor.withToolbar
@Decor.withValidationLoad
class UNCommodityTradeDialog extends Component {

  constructor(props){
    super()
    this.country = null
    this.chapter = null
    this.tradeFilter = null
    this.subheading = null
    this.optionTrades = null
    this.chartType = null

    this.toolbarButtons = this._createType2WithToolbar(
      props, { noDate: true }
    )
    this.toolbarButtons.push({
        caption:'A', title: 'Toggle All Input',
        onClick: this._handlerClickAll
      },{
        caption:'F', title: 'Toggle Filter Input',
        onClick: this._handlerClickFilter
      },{
        caption:'D', title: 'Toggle Date Input',
        onClick: this._handlerClickDate
      },{
        caption:'C', title: 'Toggle ChartType Input',
        onClick: this._handlerClickChartType
      })
    this._commandButtons = [
      <D.Button.Flat
        rootStyle={S.BT_ROOT}
        caption="Load Meta"
        title="First Load Meta, then Load Item"
        onClick={this._handlerLoadMeta}
      />,
      <D.Button.Load onClick={this._handlerLoadData} />
    ]
    this.state = {
      isShowLabels: true,
      isShowFilter : false,
      isShowDate : true,
      isShowChartType : false,
      isLoadingTrade : false,
      isLoadingTradeFailed : false,
      optionTrades : [],
      placeholderTrade : Placeholder.TRADE.INIT,
      validationMessages: []
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _initTrade = () => {
    this.subheading = null
    this.optionTrades = null
    this.setState({
      optionTrades: [],
      placeholderTrade: Placeholder.TRADE.INIT,
      isLoadingTradeFailed : false
    })
  }

  _filterTrade = () => {
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
        options = this.optionTrades
      }
    } else {
      options = this.optionTrades
    }
    return options;
  }

  _handlerClickAll = () => {
    const { isShowFilter, isShowDate, isShowChartType } = this.state
        , _isShow = (isShowFilter || isShowDate || isShowChartType) ? false : true;
    this.setState({
        isShowFilter : _isShow,
        isShowDate : _isShow,
        isShowChartType : _isShow
      })
  }
  _handlerClickFilter = () => {
    this.setState({ isShowFilter: !this.state.isShowFilter })
  }
  _handlerClickDate = () => {
    this.setState({ isShowDate: !this.state.isShowDate })
  }
  _handlerClickChartType = () => {
    this.setState({ isShowChartType: !this.state.isShowChartType })
  }

  _handlerSelectCountry = (country) => {
    this.country = country
    this._initTrade()
  }
  _handlerSelectChapter = (chapter) => {
    this.chapter = chapter
    this._initTrade()
  }
  _handlerSelectTradeFilter = (filter) => {
     this.tradeFilter = filter
     this.setState({ optionTrades: this._filterTrade() })
  }
  _handlerSelectTrade = (trade) => {
    this.subheading = trade
  }
  _handlerSelectChartType = (chartType) => {
    this.chartType = chartType
  }
  _handlerLoadMeta = () => {
    this._handleWithValidationLoad(
      this._createMetaValidationMessages(),
      this._createLoadMetaOption,
      this._loadMeta
    );
  }
  _loadMeta = (option) => {
    this.props.onLoad(option)
    this.setState({ isLoadingTrade: true })
  }
  _createMetaValidationMessages = () => {
     let msg = [];
     if (!this.country)  { msg.push(this.props.msgOnNotSelected('Country'));}
     if (!this.chapter)  { msg.push(this.props.msgOnNotSelected('Subheading'));}
     const { isValid, datesMsg } = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  _createLoadMetaOption = () => {
    const { fromDate, toDate } = this.datesFragment.getValues()
        , { loadId, fnValue } = this.props;
    return {
       value : fnValue(this.chapter.value, this.country.value),
       fromDate: fromDate,
       toDate: toDate,
       isLoadMeta : true,
       onLoad : this._setOptionTrades,
       onCancel : this._loadMetaOptionCancel,
       onFailed : this._loadMetaOptionFailed,
       loadId : loadId
    }
  }
  _setOptionTrades = (optionTrades) => {
    this.optionTrades = optionTrades
    this.setState({
      optionTrades: this._filterTrade(),
      isLoadingTrade: false,
      isLoadingTradeFailed: false,
      placeholderTrade: Placeholder.TRADE.SELECT
    })
  }
  _loadMetaOptionCancel = () => {
    this.setState({
      isLoadingTrade: false,
      isLoadingTradeFailed: false,
      placeholderTrade: Placeholder.TRADE.SELECT
    })
  }
  _loadMetaOptionFailed = () => {
    this.setState({ isLoadingTrade:false, isLoadingTradeFailed:true })
  }
  _handlerLoadData = () => {
    this._handleWithValidationLoad(
      this._createDataValidationMessages(),
      this._createLoadDataOption
    );
  }
  _createDataValidationMessages = () => {
     let msg = [];
     if ( !this.chartType || this.chartType.value === ChartType.AREA){
       if (!this.subheading)  {
         msg.push(this.props.msgOnNotSelected('Subheading'));
       }
     } else {
       const { placeholderTrade } = this.state;
       if (placeholderTrade === Placeholder.TRADE.INIT){
         msg.push(Placeholder.TRADE.INIT);
       }
       if (!this.tradeFilter) {
         msg.push(this.props.msgOnNotSelected('Trade Filter'));
       }
     }
     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  _createLoadDataOption = () => {
    const { fromDate, toDate } = this.datesFragment.getValues()
        , _dataColumn = (this.subheading) ? this.subheading.value : this.props.dataColumn
        , { loadId, fnValue, dataSource } = this.props
        , _chartType = (this.chartType) ? this.chartType.value : ChartType.AREA
        , _title = (this.tradeFilter) ?
                   `${this.country.caption}:${this.tradeFilter.caption}` :
                   `${this.country.caption}`
        , _sliceItems = ( !(!this.chartType || this.chartType.value === ChartType.AREA) )
              ? this._createSpliceItems()
              : undefined;
    return {
       value : fnValue(this.chapter.value, this.country.value),
       fromDate: fromDate,
       toDate: toDate,
       dataColumn : _dataColumn,
       seriaType : _chartType,
       sliceItems : _sliceItems,
       title : _title,
       subtitle: this.chapter.caption,
       loadId : loadId,
       dataSource : dataSource
    };
  }
  _createSpliceItems = () => {
     const _filterLength = this.tradeFilter.value.length + 2;
     return this.state.optionTrades.map((item, index) => {
        let {value, caption} = item;
        caption = caption.substring( 0, (caption.length - _filterLength) );
        return { caption, value };
    });
  }
  _handlerClose = () => {
    this._handleWithValidationClose()
  }

  render(){
    const {
           isShow, onShow, onFront,
           countryURI, countryJsonProp,
           commodityURI, commodityJsonProp,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {
           isShowLabels,
           isShowFilter, isShowDate, isShowChartType,
           isLoadingTrade, isLoadingTradeFailed, optionTrades, placeholderTrade,
           validationMessages
         } = this.state;

    return(
        <D.DraggableDialog
             caption="United Nations Commodity Trade"
             isShow={isShow}
             commandButtons={this._commandButtons}
             onShowChart={onShow}
             onFront={onFront}
             onClose={this._handlerClose}
         >
             <D.ToolbarButtonCircle
               buttons={this.toolbarButtons}
             />

             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={countryURI}
               jsonProp={countryJsonProp}
               caption="Country:"
               optionNames="Countries"
               onSelect={this._handlerSelectCountry}
             />
             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={commodityURI}
               jsonProp={commodityJsonProp}
               caption="Chapter:"
               optionNames="Chapters"
               onSelect={this._handlerSelectChapter}
             />

             <D.ShowHide isShow={isShowFilter}>
               <D.RowInputSelect
                 isShowLabels={isShowLabels}
                 caption="Filter Trade:"
                 options={TRADE_FILTER_OPTIONS}
                 placeholder="Filter..."
                 onSelect={this._handlerSelectTradeFilter}
               />
             </D.ShowHide>
             <D.RowInputSelect
               isShowLabels={isShowLabels}
               caption="Subheading:"
               options={optionTrades}
               optionNames="Meta"
               isLoading={isLoadingTrade}
               isLoadingFailed={isLoadingTradeFailed}
               placeholder={placeholderTrade}
               onLoadOption={this._handlerLoadMeta}
               onSelect={this._handlerSelectTrade}
             />
             <D.ShowHide isShow={isShowDate}>
               <D.DatesFragment
                   ref={c => this.datesFragment = c}
                   isShowLabels={isShowLabels}
                   initFromDate={initFromDate}
                   initToDate={initToDate}
                   msgOnNotValidFormat={msgOnNotValidFormat}
                   onTestDate={onTestDate}
               />
             </D.ShowHide>
             <D.ShowHide isShow={isShowChartType}>
               <D.RowInputSelect
                 isShowLabels={isShowLabels}
                 caption="Chart Type:"
                 options={CHART_TYPE_OPTIONS}
                 onSelect={this._handlerSelectChartType}
               />
             </D.ShowHide>
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default UNCommodityTradeDialog
