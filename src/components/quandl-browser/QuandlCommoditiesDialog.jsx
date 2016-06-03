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
    this.type = null;
    this.commodity = null;
    return {
       optionTypes: QuandlCommodity.getCommodityTypes(),
       optionCommodities: [],
       validationMessages: [],
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

  _handlerSelectType(type){
     if (type && type.value){
       this.type = type;
       this.commodity = null;
       this.setState({optionCommodities: QuandlCommodity.getCommodities(type.value)});
    } else {
       this.type = null;
       this.commodity = null;
    }
  },

  _handlerSelectCommodity(commodity){
     this.commodity = commodity;
  },

  _handlerLoad(event){
    event.target.focus();
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      const {fromDate, toDate} = this.datesFragment.getValues()
          , {dataColumn} = this.props;
      const option = {
        value : this.commodity.value,
        type: this.type,
        commodity: this.commodity,
        fromDate: fromDate,
        toDate: toDate,
        dataColumn : dataColumn
      }
      this.props.onLoad(option);
    }
    this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
      const {msgOnNotSelected} = this.props;
      let   msg = [];

      if (!this.type)     { msg.push(msgOnNotSelected('Type')); }
      if (!this.commodity){ msg.push(msgOnNotSelected('Commodity')); }

      const {isValid, datesMsg} = this.datesFragment.getValidation();
      if (!isValid) { msg = msg.concat(datesMsg); }

      msg.isValid = (msg.length === 0) ? true : false;

      return msg;
   },

  render(){
    const {
           isShow, onShow, onClose,
           initFromDate, initToDate, msgOnNotValidFormat, onTestDate
          } = this.props
        , {optionTypes, optionCommodities, validationMessages} = this.state
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
             caption="Quandl Commodity Prices"
             isShow={isShow}
             commandButtons={_commandButtons}
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
                  options={optionTypes}
                />
             </div>
             <div style={styles.rowDiv} key="2">
               <span style={styles.labelSpan}>
                  Commodity:
               </span>
               <ZhSelect
                  width="250"
                  onSelect={this._handlerSelectCommodity}
                  options={optionCommodities}
                />
             </div>
             <DatesFragment
                 key="3"
                 ref={c => this.datesFragment = c}
                 initFromDate={initFromDate}
                 initToDate={initToDate}
                 msgOnNotValidFormat={msgOnNotValidFormat}
                 onTestDate={onTestDate}
             />
             <ValidationMessagesFragment
                 key="4"
                 validationMessages={validationMessages}
             />
        </ZhDialog>
    );
  }
});


export default QuandlCommoditiesDialog;
