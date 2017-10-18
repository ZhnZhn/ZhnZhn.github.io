import React, { Component } from 'react';

import D from '../dialogs/DialogCell'
import Decor from '../dialogs/decorators/Decorators'

const unitOptions = [
  { "caption" : "Thousand Barrels per day (kb/d)", "value" : "KD" },
  { "caption" : "Thousand Barrels (kbbl)", "value" : "KB" },
  { "caption" : "Thousand Kilolitres (kl)", "value" : "KL" },
  { "caption" : "Thousand Metric Tons (kmt)", "value" : "KT" },
  { "caption" : "Conversion factor barrels/ktons", "value" : "BK" }
];

const chartTypes = [
  { caption: "AreaSpline", value: "AREA" },
  { caption: "Yearly by Month", value: "YEARLY" }
];

@Decor.withToolbar
@Decor.withValidationLoad
class JodiWorldOilDialog extends Component {

   constructor(props){
     super()
     this.country = null
     this.product = null
     this.flow = null
     this.units = null
     this.chartType = undefined

     this.toolbarButtons = this._createType2WithToolbar(props)
     this.toolbarButtons.push({
       caption: 'O', title: 'Toggle Options Input',
       onClick: this._hClickOptions
     })

     this._commandButtons = [
       <D.Button.Load onClick={this._handleLoad} />
     ]
     this.state = {
       isShowDate: false,
       isShowOptions: false,
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

   _hClickOptions = () => {
     this.setState({ isShowOptions: !this.state.isShowOptions })
   }

   _hSelectCountry = (country) => {
     this.country = country
   }
   _hSelectUnits = (units) => {
     this.units = units
   }
   _hSelectChartType = (chartType) => {
     this.chartType = chartType
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
          , seriaType = this.chartType ? this.chartType.value: undefined
          , { fnValue, dataColumn, loadId, dataSource } = this.props;
      return {
        value : fnValue(this.country.value, product.value, flow.value, this.units.value),
        title : `${this.country.caption}: ${product.caption}`,
        subtitle : `${flow.caption}: ${this.units.caption}`,
        fromDate, toDate,
        dataColumn, seriaType, loadId,
        dataSource
      };
   }
   _handleClose = () => {
     this._handleWithValidationClose(this._createValidationMessages)
     this.props.onClose()
   }

   render(){
     const {
             caption, isShow, onShow, onFront,
             oneCaption, oneURI, oneJsonProp,
             parentCaption, parentChildURI, parentJsonProp, childCaption, msgOnNotSelected,
             initFromDate, initToDate, msgOnNotValidFormat, onTestDate
           } = this.props
         , {
             isShowDate, isShowOptions,
             validationMessages
           } = this.state;

     return (
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
             onSelect={this._hSelectCountry}
          />
          <D.SelectParentChild
             ref={c => this.productFlow = c}
             isShow={isShow}
             uri={parentChildURI}
             parentCaption={parentCaption}
             parentOptionNames="Items"
             parentJsonProp={parentJsonProp}
             childCaption={childCaption}
             msgOnNotSelected={msgOnNotSelected}
          />
          <D.RowInputSelect
            caption="Units"
            options={unitOptions}
            onSelect={this._hSelectUnits}
          />

          <D.ShowHide isShow={isShowDate}>
            <D.DatesFragment
              ref={c => this.datesFragment = c}
              initFromDate={initFromDate}
              initToDate={initToDate}
              msgOnNotValidFormat={msgOnNotValidFormat}
              onTestDate={onTestDate}
            />
          </D.ShowHide>

          <D.ShowHide isShow={isShowOptions}>
            <D.RowInputSelect
              caption="Chart Type"
              placeholder="Default: AreaSpline"
              options={chartTypes}
              onSelect={this._hSelectChartType}
            />
          </D.ShowHide>

          <D.ValidationMessages
              validationMessages={validationMessages}
          />
       </D.DraggableDialog>
     );
   }
}

export default JodiWorldOilDialog
