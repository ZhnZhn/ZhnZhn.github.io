import React from 'react';

import { CompItemType } from '../../constants/Type';

import ZhDialog from '../ZhDialog';

import WithValidation from './WithValidation';
import WithToolbar from './WithToolbar';

import ToolbarButtonCircle from './ToolbarButtonCircle';
import SelectWithLoad from './SelectWithLoad';
import ToolBarButton from '../ToolBarButton';
import RowInputSelect from './RowInputSelect';

import ValidationMessagesFragment from '../ValidationMessagesFragment';

const chartTypeOptions = [
    {caption : 'Default : Area', value: 'AREA'},
    {caption : 'Map' , value: 'MAP', compType : CompItemType.EUROSTAT_MAP}
]

const DialogEurostat2 = React.createClass({
  ...WithValidation,
  ...WithToolbar,

  getInitialState(){
    this.one = null;
    this.two = null;
    this.chartType = null;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._clickInfoWithToolbar }
    ];

    return {
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
  _handlerSelectTwo(two){
    this.two = two;
  },

  _handlerSelectChartType(chartType){
    this.chartType = chartType
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

     if (!this.one) { msg.push(this.props.msgOnNotSelected(oneCaption)); }
     if (!this.two) { msg.push(this.props.msgOnNotSelected(twoCaption)); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
  },
  _createLoadOption(){
    const { loadId, group } = this.props
        , _zhCompType = ( this.chartType && this.chartType.value !== 'AREA')
             ? this.chartType.compType
             : undefined;
    return {
      geo : this.one.value,
      group : group,
      metric : this.two.value,
      loadId : loadId,
      itemCaption: this.one.caption,
      title : this.one.caption,
      subtitle : this.two.caption,
      alertItemId : `${this.one.caption}:${this.two.caption}`,
      alertGeo : this.one.caption,
      alertMetric : this.two.caption,
      zhCompType : _zhCompType,
      mapValue : this.two.mapValue,
      zhMapSlice : this.two.mapSlice
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
        , { validationMessages } = this.state
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

             <ValidationMessagesFragment
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});

export default DialogEurostat2
