import React, { Component } from 'react';

import createLoadOptions from '../../flux/creaters/eurostat2'

import { CompItemType } from '../../constants/Type';
import DateUtils from '../../utils/DateUtils';
import { isStrInArr } from '../../utils/is';

import ZhDialog from '../ZhDialog';

import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import ToolBarButton from '../ToolBarButton';
import ShowHide from '../zhn/ShowHide';
import RowInputSelect from './RowInputSelect';

import ValidationMessagesFragment from '../ValidationMessagesFragment';

import withToolbar from './decorators/withToolbar';
import withValidationLoad from './decorators/withValidationLoad';

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


@withToolbar
@withValidationLoad
class DialogEurostat2 extends Component {

  state = {
    isShowDate : false,
    dateDefault : DATE_PLACEHOLDER,
    dateOptions : [],
    validationMessages: []
  }

  constructor(props){
    super();
    this.one = undefined;
    this.two = undefined;
    this.date = undefined;
    this.chartType = undefined;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar.bind(this) }
    ];
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  }

  _handleSelectOne = (one) => {
    this.one = one;
  }

  _updateForDate = () => {
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
  }

  _handleSelectTwo = (two) => {
    this.two = two;
    if(isCategoryType(this.chartType)){
      this._updateForDate();
    }
  }

  _handleSelectChartType = (chartType) => {
    this.chartType = chartType;
    if(isCategoryType(this.chartType)){
      this._updateForDate();
    } else {
      this.setState({ isShowDate : false });
    }
  }

  _handleSelectDate = (date) => {
    this.date = date;
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const { oneCaption, twoCaption } = this.props;
     let msg = [];

     if(!isCategoryType(this.chartType)){
        if (!this.one) { msg.push(this.props.msgOnNotSelected(oneCaption)); }
     }
     if (!this.two) { msg.push(this.props.msgOnNotSelected(twoCaption)); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  }
  _createLoadOption = () => {
    const { one, two, chartType, date } = this
        , { dateDefault } = this.state;
    return createLoadOptions(
      this.props,
      { one, two, chartType, date, dateDefault }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  }

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
          onClick={this._handleLoad}
       />
    ];

    return(
        <ZhDialog
             caption={caption}
             isShow={isShow}
             commandButtons={_commandButtons}
             onShowChart={onShow}
             onClose={this._handleClose}
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
               onSelect={this._handleSelectOne}
             />
             <SelectWithLoad
               isShow={isShow}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames={'Items'}
               onSelect={this._handleSelectTwo}
             />
             <RowInputSelect
               caption={'Chart Type'}
               placeholder={'Default: Area'}
               options={chartTypeOptions}
               onSelect={this._handleSelectChartType}
             />
             <ShowHide isShow={isShowDate}>
               <RowInputSelect
                  caption={'For Date'}
                  placeholder={dateDefault}
                  options={dateOptions}
                  onSelect={this._handleSelectDate}
               />
             </ShowHide>
             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
}

DialogEurostat2.displayName = 'DialogEurostat2';

export default DialogEurostat2
