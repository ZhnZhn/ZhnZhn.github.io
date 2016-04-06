import React from 'react';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import QuandlCommodity from '../../services/qe/QuandlCommodity';

import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const QuandlCommoditiesDialog = React.createClass({

  getInitialState: function(){
    return {
       itemType: null,
       itemCommodity: null,
       optionTypes: QuandlCommodity.getCommodityTypes(),
       optionCommodities: [],
       inputErrMsg: null,
       validationMessages: [],
       isFirstRender: true,
    }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },

  _handlerSelectType: function(itemType){
      if (itemType!==null){
        this.state.itemType = itemType;
        this.state.itemCommodity = null;
        this.state.optionCommodities = QuandlCommodity.getCommodities(itemType.value);
        this.setState(this.state);
      } else {
        this.state.itemType = null;
        this.state.itemCommodity = null;
      }
  },

  _handlerSelectCommodity: function(itemCommodity){
     this.state.itemCommodity = itemCommodity;
  },

  _handlerLoad: function(event){

    event.target.focus();

    if (this._validateInput()){
      const {fromDate, toDate} = this.refs.datesFragment.getValues();
      const {itemType, itemCommodity} = this.state;
      const option = {
        value : itemCommodity.value,
        type: itemType,
        commodity: itemCommodity,
        fromDate: fromDate,
        toDate: toDate,
      }
      this.props.onLoad(option);      
    }
    this.setState(this.state);
  },

  _validateInput: function(){
      let result = true;
      this.state.validationMessages = [];

      if (!this.state.itemType){
        this.state.validationMessages.push("Type is Required to Select");
        result = false;
      }

      if (!this.state.itemCommodity){
        this.state.validationMessages.push("Commodity is Required to Select");
        result = false;
      }

      if (!this.refs.datesFragment.isValid()){
        this.state.validationMessages.push("Some Date is not in Valid Format");
        result = false;
      }

      return result;
   },

/*
  _handlerShowChart: function(){
    QuandlActions.showChart();
  },
  */

  render: function(){
    let commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    let optionTypes, optionCommodities;
    if (this.state.isFirstRender){
      optionTypes = this.state.optionTypes;
      optionCommodities = this.state.optionCommodities;
    } else {
      optionTypes = [];
      optionCommodities = [];
      this.state.isFirstRender = false;
    }

    const {isShow, onShow, onClose} = this.props;

    return(
        <ZhDialog
             caption="Quandl Commodity Prices"
             isShow={isShow}
             commandButtons={commandButtons}
             onShowChart={onShow}
             onClose={this.props.onClose}
         >

             <div style={styles.rowDiv} key="1">
               <span style={styles.labelSpan}>
                  Type:
               </span>
               <ZhSelect
                  width="250"
                  onSelect={this._handlerSelectType}
                  //options={optionTypes}
                  options={this.state.optionTypes}
                />
             </div>

             <div style={styles.rowDiv} key="2">
               <span style={styles.labelSpan}>
                  Commodity:
               </span>
               <ZhSelect
                  width="250"
                  onSelect={this._handlerSelectCommodity}
                  //options={optionCommodities}
                  options={this.state.optionCommodities}
                />
             </div>
             <DatesFragment
                 key="3"
                 ref="datesFragment"
                 initFromDate={this.props.initFromDate}
                 initToDate={this.props.initToDate}
                 onTestDate={this.props.onTestDate}
             />
             <ValidationMessagesFragment
                 key="4"
                 validationMessages={this.state.validationMessages}
             />

        </ZhDialog>
    );
  }
});


export default QuandlCommoditiesDialog;
