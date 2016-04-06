import React from 'react';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles.js'
const styles = DialogStyles;


const DialogType3 = React.createClass({
  getInitialState: function(){
    return {
      stock: null,
      validationMessages: [],
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

  _handlerSelectStock: function(stock){
    this.state.stock = stock;
  },

  _handlerLoad: function(event){
     event.target.focus();
     if (this._validateInput()){
       const {fromDate, toDate} = this.refs.datesFragment.getValues();
       const option = {
         value : this.state.stock.value,
         stock: this.state.stock,
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

    if (!this.state.stock){
      this.state.validationMessages.push("Stock is Required to Select");
      result = false;
    }

    if (!this.refs.datesFragment.isValid()){
      this.state.validationMessages.push("Some Date is not in Valid Format");
      result = false;
    }

    return result;
  },


  render: function(){
    let commandButtons =[
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];

    const {
            caption, isShow, onShow, onClose,
            optionStocks,
            initFromDate, initToDate, onTestDate
          } = this.props;

    const {validationMessages} = this.state;

    return (

       <ZhDialog
           caption={caption}
           isShow={isShow}
           commandButtons={commandButtons}
           onShowChart={onShow}
           onClose={onClose}
       >
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Stock:
           </span>
           <ZhSelect
             width="250"
             onSelect={this._handlerSelectStock}
             options={optionStocks}
           />
        </div>
        <DatesFragment
            key="2"
            ref="datesFragment"
            initFromDate={initFromDate}
            initToDate={initToDate}
            onTestDate={onTestDate}
        />
        <ValidationMessagesFragment
            key="3"
            validationMessages={validationMessages}
        />
      </ZhDialog>
    );
  }
});

export default DialogType3;
