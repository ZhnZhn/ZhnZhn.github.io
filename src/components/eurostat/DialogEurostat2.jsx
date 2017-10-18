import React, { Component } from 'react';
//import PropTypes from "prop-types";

import { CompItemType } from '../../constants/Type';
import DateUtils from '../../utils/DateUtils';
import ArrayUtil from '../../utils/ArrayUtil';

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators';

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
  return ArrayUtil.isStrInArr(chartType.value)(categoryTypes);
}


@Decor.withToolbar
@Decor.withValidationLoad
class DialogEurostat2 extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,

    oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,

    twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,

    mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,

    msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
 */
  constructor(props){
    super();
    this.one = undefined;
    this.two = undefined;
    this.date = undefined;
    this.chartType = undefined;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar.bind(this) }
    ];
    this._commandButtons = [
      <D.Button.Load onClick={this._handleLoad} />
    ];
    this.state = {
      isShowDate : false,
      dateDefault : DATE_PLACEHOLDER,
      dateOptions : [],
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

  _handleSelectOne = (one) => {
    this.one = one;
  }

  _updateForDate = () => {
    this.date = null;
    const frequency = (this.two)
             ? (this.props.mapFrequency)
                  ? this.props.mapFrequency
                  : (this.two.mapFrequency)
                       ? this.two.mapFrequency
                       : MAP_FREQUENCY_DF
             : null
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
    return this.props.loadFn(
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
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp
          } = this.props
        , {
            isShowDate,
            dateDefault, dateOptions,
            validationMessages
          } = this.state;

    return(
        <D.DraggableDialog
             caption={caption}
             isShow={isShow}
             commandButtons={this._commandButtons}
             onShowChart={onShow}
             onFront={onFront}
             onClose={this._handleClose}
         >
             <D.ToolbarButtonCircle
               buttons={this.toolbarButtons}
             />
             <D.SelectWithLoad
               isShow={isShow}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames="Items"
               onSelect={this._handleSelectOne}
             />
             <D.SelectWithLoad
               isShow={isShow}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames="Items"
               onSelect={this._handleSelectTwo}
             />
             <D.RowInputSelect
               caption="Chart Type"
               placeholder="Default: Area"
               options={chartTypeOptions}
               onSelect={this._handleSelectChartType}
             />
             <D.ShowHide isShow={isShowDate}>
               <D.RowInputSelect
                  caption="For Date"
                  placeholder={dateDefault}
                  options={dateOptions}
                  onSelect={this._handleSelectDate}
               />
             </D.ShowHide>
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default DialogEurostat2
