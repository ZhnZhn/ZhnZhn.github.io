import React, { Component } from 'react';

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators'

const unitOptions = [
  { "caption" : "Thousand Barrels per day (kb/d)", "value" : "KD" },
  { "caption" : "Thousand Barrels (kbbl)", "value" : "KB" },
  { "caption" : "Thousand Kilolitres (kl)", "value" : "KL" },
  { "caption" : "Thousand Metric Tons (kmt)", "value" : "KT" },
  { "caption" : "Conversion factor barrels/ktons", "value" : "BK" }
];

const chartOptions = [
  { caption: "AreaSpline", value: "AREA" },
  { caption: "Yearly by Month", value: "YEARLY" }
];

@Decor.dialog
class JodiWorldOilDialog extends Component {

   constructor(props){
     super(props)

     //this.country = null
     //this.product = null
     //this.flow = null
     //this.units = null
     //this.chartType = undefined

     this._menuMore = crMenuMore(this, {
       toggleToolBar: this._toggleWithToolbar,
       onAbout: this._clickInfoWithToolbar
     })

     this.toolbarButtons = this._createType2WithToolbar(
       props, { isShowOptions: true }
     )

     this._commandButtons = this._crCommandsWithLoad(this)

     this.state = {
       ...this._isWithInitialState(),
       isShowDate: false,
       isShowOptions: false
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
      const { one:product, two:flow } = this.productFlow.getValues()
          , { fromDate, toDate } = this.datesFragment.getValues()
          , seriaType = this.chartType
              ? this.chartType.value
              : void 0
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
     this._handleWithValidationClose()
   }

   _refProductFlow = c => this.productFlow = c
   _refDates = c => this.datesFragment = c

   render(){
     const {
             caption, isShow, onShow, onFront,
             oneCaption, oneURI, oneJsonProp,
             parentCaption, parentChildURI, parentJsonProp, childCaption, msgOnNotSelected,
             initFromDate, initToDate, msgOnNotValidFormat, onTestDate
           } = this.props
         , {
             isToolbar,
             isShowLabels,
             isShowDate, isShowOptions,
             validationMessages
           } = this.state;

     return (
       <D.DraggableDialog
         isShow={isShow}
         caption={caption}
         menuModel={this._menuMore}
         commandButtons={this._commandButtons}
         onShowChart={onShow}
         onFront={onFront}
         onClose={this._handleClose}
       >
          <D.Toolbar
            isShow={isToolbar}
            buttons={this.toolbarButtons}
          />

          <D.SelectWithLoad
             isShow={isShow}
             isShowLabels={isShowLabels}
             uri={oneURI}
             jsonProp={oneJsonProp}
             caption={oneCaption}
             optionNames="Items"
             onSelect={this._hSelectCountry}
          />
          <D.SelectOneTwo
             ref={this._refProductFlow}
             isShow={isShow}
             isShowLabels={isShowLabels}
             uri={parentChildURI}
             oneCaption={parentCaption}
             oneJsonProp={parentJsonProp}
             twoCaption={childCaption}
             msgOnNotSelected={msgOnNotSelected}
          />
          <D.RowInputSelect
            isShowLabels={isShowLabels}
            caption="Units"
            options={unitOptions}
            onSelect={this._hSelectUnits}
          />

          <D.ShowHide isShow={isShowDate}>
            <D.DatesFragment
              ref={this._refDates}
              isShowLabels={isShowLabels}
              initFromDate={initFromDate}
              initToDate={initToDate}
              msgOnNotValidFormat={msgOnNotValidFormat}
              onTestDate={onTestDate}
            />
          </D.ShowHide>

          <D.ShowHide isShow={isShowOptions}>
            <D.RowInputSelect
              isShowLabels={isShowLabels}
              caption="Chart Type"
              placeholder="Default: AreaSpline"
              options={chartOptions}
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
