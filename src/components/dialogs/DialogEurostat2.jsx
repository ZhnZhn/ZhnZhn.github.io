import React from 'react';


import createLoadOptions from '../../flux/creaters/eurostat2'

import { CompItemType } from '../../constants/Type';
import DateUtils from '../../utils/DateUtils';
import { isStrInArr } from '../../utils/is';

import ZhDialog from '../ZhDialog';
import WithValidation from './WithValidation';
import WithToolbar from './WithToolbar';

import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import ToolBarButton from '../ToolBarButton';
import ShowHide from '../zhn/ShowHide';
import RowInputSelect from './RowInputSelect';

import ValidationMessagesFragment from '../ValidationMessagesFragment';

const  DATE_PLACEHOLDER = 'Before Select Indicator'
     , MAP_FREQUENCY_DF = 'M'
     , AREA = 'AREA'
     , MAP = 'MAP'
     , categoryTypes = [ 'MAP', 'COLUMN', 'BAR'];

const chartTypeOptions = [
    { caption : 'Default : Area', value: AREA },
    { caption : 'Map : All Countries' , value: MAP, compType : CompItemType.EUROSTAT_MAP },
    { caption : 'Column : All Countries', value: 'COLUMN' },
    { caption : 'Bar : All Countries', value: 'BAR' }
]

const isCategoryType = (chartType) => {
  if (!chartType){
    return false;
  }
  return isStrInArr(chartType.value)(categoryTypes);
}

const DialogEurostat2 = React.createClass({
  ...WithValidation,
  ...WithToolbar,

  getInitialState(){
    this.one = undefined;
    this.two = undefined;
    this.date = undefined;
    this.chartType = undefined;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar }
    ];

    return {
      isShowDate : false,
      dateDefault : DATE_PLACEHOLDER,
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
    this.date = undefined;
    const frequency = (this.two)
             ? (this.props.mapFrequency)
                  ? this.props.mapFrequency
                  : (this.two.mapFrequency)
                       ? this.two.mapFrequency
                       : MAP_FREQUENCY_DF
             : undefined
         , { mapDateDf } = this.props
         , config = (frequency)
             ? DateUtils.createEurostatSelect(frequency, mapDateDf)
             : { dateDefault : DATE_PLACEHOLDER , options : [] };

    this.setState({
       isShowDate : true,
       dateDefault : config.dateDefault,
       dateOptions : config.options
    });
  },

  _handlerSelectTwo(two){
    this.two = two;
    if(isCategoryType(this.chartType)){
      this._updateForDate();
    }
  },

  _handlerSelectChartType(chartType){
    this.chartType = chartType;
    if(isCategoryType(this.chartType)){
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

     if(!isCategoryType(this.chartType)){
        if (!this.one) { msg.push(this.props.msgOnNotSelected(oneCaption)); }
     }
     if (!this.two) { msg.push(this.props.msgOnNotSelected(twoCaption)); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const { one, two, chartType, date } = this
        , { dateDefault } = this.state;
    return createLoadOptions(
      this.props,
      { one, two, chartType, date, dateDefault }
    );
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
