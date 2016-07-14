import React from 'react';

import ZhDialog from '../ZhDialog';
import WithValidation from '../dialogs/WithValidation';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectParentChild from '../dialogs/SelectParentChild';
import RowInputSelect from '../dialogs/RowInputSelect';
import ToolBarButton from '../ToolBarButton';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const yearOptions = [
  { caption: '2017', value: 2017 },
  { caption: '2016', value: 2016 },
  { caption: '2015', value: 2015 },
  { caption: '2014', value: 2014 },
  { caption: '2013', value: 2013 },
  { caption: '2012', value: 2012 }
]

const Futures3Dialog = React.createClass({
  ...WithValidation,

  getInitialState(){
    this.year = null;

    this.toolbarButtons = [
      { caption: 'I', onClick: this._handlerClickInfo }
    ];

    return {
      validationMessages : []
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

  _handlerClickInfo(){
    const {descrUrl, onClickInfo} = this.props;
    onClickInfo({ descrUrl });
  },

  _handlerSelectYear(year){
    this.year = year;
  },

  _handlerLoad(){
    this._handlerWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  },
  _createValidationMessages(){
    const { msgOnNotSelected } = this.props
    let   msg = [];

    const { isValid:isValid1, msg:msg1 } = this.itemMonth.getValidation();
    if (!isValid1) { msg = msg.concat(msg1); }

    if (!this.year) { msg.push(msgOnNotSelected('Year')); }

    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },
  _createLoadOption(){
    const { parent:item, child:month } = this.itemMonth.getValues()
        , { fnValue, columnName, dataColumn, loadId } = this.props
        , _subtitle = ( columnName )
              ? `${month.caption}:${this.year.caption}:${columnName}`
              : `${month.caption}:${this.year.caption}`;
    return {
       value : fnValue(item.value, month.value, this.year.value ),
       title : item.caption,
       subtitle : _subtitle,
       columnName : columnName,
       dataColumn : dataColumn,
       loadId : loadId
    };
  },

  _handlerClose(){
    this._handlerWithValidationClose(this._createValidationMessages);
    this.props.onClose();
  },

  render(){
    const {
            isShow, caption, onShow,
            futuresURI, msgOnNotSelected
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

    return (
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

           <SelectParentChild
               ref={c => this.itemMonth = c}
               isShow={isShow}
               uri={futuresURI}
               parentCaption="Commodity"
               parentOptionNames="Commodities"
               parentJsonProp="futures"
               childCaption="Month"
               msgOnNotSelected={msgOnNotSelected}
           />
           <RowInputSelect
              caption="Year"
              options={yearOptions}
              onSelect={this._handlerSelectYear}
           />
           <ValidationMessagesFragment
              validationMessages={validationMessages}
           />

      </ZhDialog>
    );
  }
});

export default Futures3Dialog;
