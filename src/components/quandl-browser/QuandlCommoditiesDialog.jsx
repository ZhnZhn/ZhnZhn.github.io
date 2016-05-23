import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import QuandlCommodity from '../../services/qe/QuandlCommodity';

import DialogStyles from '../styles/DialogStyles';

const styles = DialogStyles;

const QuandlCommoditiesDialog = React.createClass({
  ...WithValidation,
  getInitialState(){
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

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
       if (this.props.isShow === nextProps.isShow){
          return false;
       }
    }
    return true;
  },

  _handlerSelectType(itemType){
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

  _handlerSelectCommodity(itemCommodity){
     this.state.itemCommodity = itemCommodity;
  },

  _handlerLoad(event){

    event.target.focus();
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
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
    this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
      const validationMessages = [];
      if (!this.state.itemType){
        validationMessages.push("Type is Required to Select");
      }
      if (!this.state.itemCommodity){
        validationMessages.push("Commodity is Required to Select");
      }
      if (!this.refs.datesFragment.isValid()){
        validationMessages.push("Some Date is not in Valid Format");
      }
      validationMessages.isValid = (validationMessages.length === 0) ? true : false;

      return validationMessages;
   },


  render(){
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
             onClose={this._handlerClose}
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
