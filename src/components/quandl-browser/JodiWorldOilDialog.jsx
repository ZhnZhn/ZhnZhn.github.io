import React, { Component } from 'react';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ToolbarButtonCircle from '../dialogs/ToolbarButtonCircle';
import SelectWithLoad from '../dialogs/SelectWithLoad';
import RowInputSelect from '../dialogs/RowInputSelect';
import SelectParentChild from '../dialogs/SelectParentChild';
import ActionButton from '../zhn/ActionButton';

import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';
import ShowHide from '../zhn/ShowHide';

import withToolbar from '../dialogs/decorators/withToolbar'
import withValidationLoad from '../dialogs/decorators/withValidationLoad'

const unitOptions = [
  { "caption" : "Thousand Barrels per day (kb/d)", "value" : "KD" },
  { "caption" : "Thousand Barrels (kbbl)", "value" : "KB" },
  { "caption" : "Thousand Kilolitres (kl)", "value" : "KL" },
  { "caption" : "Thousand Metric Tons (kmt)", "value" : "KT" },
  { "caption" : "Conversion factor barrels/ktons", "value" : "BK" }
]

@withToolbar
@withValidationLoad
class JodiWorldOilDialog extends Component {

   constructor(props){
     super()
     this.country = null
     this.product = null
     this.flow = null
     this.units = null

     this.toolbarButtons = this._createType2WithToolbar(props)
     this.state = {
       isShowDate : true,
       validationMessages : []
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

   _handleSelectCountry = (country) => {
     this.country = country
   }
   _handleSelectUnits = (units) => {
     this.units = units
   }

   _handleLoad = () => {
     this._handleWithValidationLoad(
       this._createValidationMessages(),
       this._createLoadOption
     );
   }
   _createValidationMessages = () => {
     const { msgOnNotSelected } = this.props;
     let msg = [];

     if (!this.country) { msg.push(msgOnNotSelected('Country')); }

     const { isValid:isValid1, msg:msg1 } = this.productFlow.getValidation();
     if (!isValid1) { msg = msg.concat(msg1); }

     if (!this.units) {
       this.units = unitOptions[0];
     }

     const { isValid, datesMsg } = this.datesFragment.getValidation();
     if (!isValid) { msg = msg.concat(datesMsg); }

     msg.isValid = (msg.length === 0) ? true : false;
     return msg;
   }
   _createLoadOption = () => {
      const { parent:product, child:flow } = this.productFlow.getValues()
          , { fromDate, toDate } = this.datesFragment.getValues()
          , { fnValue, dataColumn, loadId, dataSource } = this.props;
      return {
        value : fnValue(this.country.value, product.value, flow.value, this.units.value),
        fromDate: fromDate,
        toDate: toDate,
        dataColumn : dataColumn,
        loadId : loadId,
        title : `${this.country.caption}:${product.caption}`,
        subtitle : `${flow.caption}:${this.units.caption}`,
        dataSource : dataSource
      };
   }
   _handleClose = () => {
     this._handleWithValidationClose(this._createValidationMessages)
     this.props.onClose()
   }

   render(){
     const {
             caption, isShow, onShow,
             oneCaption, oneURI, oneJsonProp,
             parentCaption, parentChildURI, parentJsonProp, childCaption, msgOnNotSelected,
             initFromDate, initToDate, msgOnNotValidFormat, onTestDate
           } = this.props
         , { isShowDate, validationMessages } = this.state
         , _commandButtons = [
               <ActionButton
                  key="a"
                  type="TypeC"
                  caption="Load"
                  onClick={this._handleLoad}
               />
          ];

     return (
       <DraggableDialog
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
             onSelect={this._handleSelectCountry}
          />
          <SelectParentChild
             ref={c => this.productFlow = c}
             isShow={isShow}
             uri={parentChildURI}
             parentCaption={parentCaption}
             parentOptionNames="Items"
             parentJsonProp={parentJsonProp}
             childCaption={childCaption}
             msgOnNotSelected={msgOnNotSelected}
          />
          <RowInputSelect
            caption="Units"
            options={unitOptions}
            onSelect={this._handleSelectUnits}
          />

          <ShowHide isShow={isShowDate}>
            <DatesFragment
              ref={c => this.datesFragment = c}
              initFromDate={initFromDate}
              initToDate={initToDate}
              msgOnNotValidFormat={msgOnNotValidFormat}
              onTestDate={onTestDate}
            />
          </ShowHide>
          <ValidationMessages
              validationMessages={validationMessages}
          />
       </DraggableDialog>
     );
   }
}

export default JodiWorldOilDialog
