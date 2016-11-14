import React from 'react';

import { CompItemType } from '../../constants/Type';
import DateUtils from '../../utils/DateUtils';

import ZhDialog from '../ZhDialog';

import WithValidation from './WithValidation';
import WithToolbar from './WithToolbar';

import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import ToolBarButton from '../ToolBarButton';
import ShowHide from '../zhn/ShowHide';
import RowInputSelect from './RowInputSelect';

import ValidationMessagesFragment from '../ValidationMessagesFragment';

const chartTypeOptions = [
    {caption : 'Default : Area', value: 'AREA'},
    {caption : 'Map' , value: 'MAP', compType : CompItemType.EUROSTAT_MAP}
]

/*
let dateDefault = '2016Q1';
let dateOptions = [
  { caption: '2016Q1', value : '2016Q1' },
  { caption: '2016Q2', value : '2016Q2' }
]
*/

const DialogEurostat2 = React.createClass({
  ...WithValidation,
  ...WithToolbar,

  getInitialState(){
    this.one = null;
    this.two = null;
    this.date = null;
    this.chartType = null;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar }
    ];

    return {
      isShowDate : false,
      dateDefault : 'Before Select Indicator',
      dateOptions : [],
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

  _handlerSelectOne(one){
    this.one = one;
  },

  _updateForDate(){
    const frequency = (this.two)
             ? this.two.mapFrequency
             : undefined
         , config = (frequency)
             ? DateUtils.createEurostatSelect(frequency)
             : { dateDefault : 'Before Select Indicator' , options : [] };

    this.setState({
       isShowDate : true,
       dateDefault : config.dateDefault,
       dateOptions : config.options
    });
  },

  _handlerSelectTwo(two){
    this.two = two;
    if (this.chartType && this.chartType.value === 'MAP'){
      this._updateForDate();
    }
  },

  _handlerSelectChartType(chartType){
    this.chartType = chartType
    if (chartType && chartType.value === 'MAP'){
      this._updateForDate();
    } else {
      this.setState({ isShowDate : false });
    }
  },

  _handlerSelectDate(date){
    this.date = date;
  },

  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
     const { oneCaption, twoCaption } = this.props;
     let msg = [];

     if ( !(this.chartType && this.chartType.value === 'MAP') ){
        if (!this.one) { msg.push(this.props.msgOnNotSelected(oneCaption)); }
     }
     if (!this.two) { msg.push(this.props.msgOnNotSelected(twoCaption)); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const { loadId, group } = this.props
         , _countryValue = (this.one)
             ? this.one.value
             : 'EU 28'
         , _countryCaption = (this.one)
             ? this.one.caption
             : 'EU 28'

    let _zhCompType = undefined
    , _time = undefined;

    if (this.chartType && this.chartType.value !== 'AREA'){
      _zhCompType = this.chartType.compType;
      _time = (this.date)
         ? this.date.value
         : this.state.dateDefault
    }

    return {
      geo : _countryValue,
      group : group,
      metric : this.two.value,
      loadId : loadId,
      itemCaption: _countryCaption,
      title : _countryCaption,
      subtitle : this.two.caption,
      alertItemId : `${_countryCaption}:${this.two.caption}`,
      alertGeo : _countryCaption,
      alertMetric : this.two.caption,
      zhCompType : _zhCompType,
      mapValue : this.two.mapValue,
      zhMapSlice : { ...this.two.mapSlice, time : _time },
      time : _time
    }
  },

  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },


  render(){
    const {
           caption, isShow, onShow,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp
          } = this.props
        , { isShowDate, dateDefault, dateOptions, validationMessages } = this.state
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
             caption={caption}
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
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames={'Items'}
               onSelect={this._handlerSelectOne}
             />

             <SelectWithLoad
               isShow={isShow}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames={'Items'}
               onSelect={this._handlerSelectTwo}
             />

             <RowInputSelect
               caption={'Chart Type'}
               placeholder={'Default: Area'}
               options={chartTypeOptions}
               onSelect={this._handlerSelectChartType}
             />
             <ShowHide isShow={isShowDate}>
               <RowInputSelect
                  caption={'For Date'}
                  placeholder={dateDefault}
                  options={dateOptions}
                  onSelect={this._handlerSelectDate}
               />
             </ShowHide>

             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});

export default DialogEurostat2
