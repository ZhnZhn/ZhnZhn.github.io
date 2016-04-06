import React from 'react';

import ZhDialog from '../ZhDialog';
import ZhSelect from '../ZhSelect';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import QuandlChinaDceFuture from '../../services/qe/QuandlChinaDceFuture';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const QuandlFuturesChinaDceDialog = React.createClass({
  getInitialState: function(){
    return {
      optionCodes: QuandlChinaDceFuture.getTickets(),
      code: null,
      validationMessages: [],
      firstNotValidedInput: null,
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

  _setInputFocus: function(){
    if (this.state.firstNotValidedInput){
      this.refs.selectStock.focusInput();
    }
  },

  componentDidUpdate: function(){
    if (this.props.isShow){
      this._setInputFocus();
    }
  },

  _handlerSelectCode: function(code){
    this.state.code = code;
  },


  _handlerLoad: function(event){
     event.target.focus();
     if (this._validateInput()){
       const option = {
          value : this.state.code.value,
          code : this.state.code
       };
       this.props.onLoad(option);

     }
     this.setState(this.state);
  },

  _validateInput: function(){
    let result = true;
    this.state.validationMessages = [];

    this.state.firstNotValidedInput = null;

    if (!this.state.code){
      this.state.validationMessages.push("Code is Required to Select");
      this.state.firstNotValidedInput = 'selectStock';
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

    const {isShow, onShow, onClose} = this.props;

    return (
       <ZhDialog
           caption="Futures China DCE"
           isShow={isShow}
           commandButtons={commandButtons}
           onShowChart={onShow}
           onClose={onClose}
       >
         <div style={styles.rowDiv} key="1">
           <span style={styles.labelSpan}>
             Code:
           </span>
           <ZhSelect
             ref="selectStock"
             width="250"
             onSelect={this._handlerSelectCode}
             options={this.state.optionCodes}
           />
        </div>
        <ValidationMessagesFragment
            key="3"
            validationMessages={this.state.validationMessages}
        />
      </ZhDialog>
    );
  }
});

export default QuandlFuturesChinaDceDialog;
