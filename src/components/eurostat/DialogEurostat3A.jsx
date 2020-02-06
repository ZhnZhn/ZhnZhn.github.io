import React, { Component } from 'react';
//import PropTypes from "prop-types";

import crDateConfig from './crDateConfig'

import D from '../dialogs/DialogCell'
import crMenuMore from '../dialogs/MenuMore'
import Decor from '../dialogs/decorators/Decorators';
import withForDate from './withForDate'

import RouterOptions from './RouterOptions';
import ModalOptions from './ModalOptions'

const  MAP_FREQUENCY_DF = 'M';

const _isCategory = (chartType) => RouterOptions
 .isCategory(chartType);


@Decor.dialog
@withForDate
class DialogEurostat3A extends Component {
  /*
  static propTypes = {
    isShow: PropTypes.bool,
    caption: PropTypes.string,

    oneCaption: PropTypes.string,
    oneURI: PropTypes.string,
    oneJsonProp: PropTypes.string,

    twoCaption: PropTypes.string,
    twoURI: PropTypes.string,
    twoJsonProp: PropTypes.string,

    threeCaption: PropTypes.string,
    threeURI: PropTypes.string,
    threeJsonProp: PropTypes.string,

    noDate: PropTypes.string,

    mapFrequency: PropTypes.oneOf(['M', 'Q', 'Y']),
    mapDateDf: PropTypes.number,

    msgOnNotSelected: PropTypes.func,
    onShow: PropTypes.func,
    loadFn: PropTypes.func
  }
 */

  static defaultProps = {
    oneCaption: 'Country',
    oneJsonProp: 'countries',
    twoCaption: 'Item',
    twoJsonProp: 'items',
    threeCaption: 'Metric',
    threeJsonProp: 'items',
  }

  constructor(props){
    super(props);
    //this.one = undefined;
    //this.two = undefined;
    //this.three = undefined;
    //this.date = undefined;

    this._menuMore = crMenuMore(this, {
      toggleToolBar: this._toggleWithToolbar,
      onAbout: this._clickInfoWithToolbar
    })

    this.toolbarButtons = this._createType2WithToolbar(
      props, { isOptions: true }
    )
    this._commandButtons = this._crCommandsWithLoad(this)
    this._chartOptions = RouterOptions.crOptions(props)

    this.state = {
      ...this._isWithInitialState(),
      isOptions: false,
      isShowDate: false,
      ...crDateConfig('EMPTY')
      //chartType
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

  _updateForDate = (chartType) => {
    this.date = undefined;
    const { dfProps={} } = this.props
    , { mapFrequency, mapDateDf } = dfProps
    , _frequency = (this.two)
       ? mapFrequency
       : MAP_FREQUENCY_DF
    , dateConfig = (_frequency)
       ? crDateConfig(_frequency, mapDateDf)
       : crDateConfig('EMPTY')

    this.setState({
       isShowDate: true,
       ...dateConfig,
       chartType
    });
  }

  _handleSelectOne = (one) => {
    this.one = one;
  }
  _handleSelectTwo = (two) => {
    this.two = two;
    const { chartType } = this.state;
    if (_isCategory(chartType)) {
      this._updateForDate(chartType);
    }
  }
  _handleSelectThree = (three) => {
    this.three = three;
  }

  _handleSelectChartType = (chartType) => {
    if (_isCategory(chartType)) {
      this._updateForDate(chartType);
    } else {
      this.setState({
        chartType,
        isShowDate: false
      });
    }
  }
  _onRegColor = (comp) => {
    this.colorComp = comp
  }

  _handleSelectDate = (date) => {
    this.date = date;
  }

  _handleLoad = () => {
    this._handleWithValidationLoad(
      this._createValidationMessages(),
      this._createLoadOption
    );
  }
  _createValidationMessages = () => {
     const {
       oneCaption, twoCaption, threeCaption,
       msgOnNotSelected
     } = this.props
     , { chartType } = this.state;
     const msg = [];

     if (!_isCategory(chartType) && !this.one) {
       msg.push(msgOnNotSelected(oneCaption));
     }
     if (!this.two) {
       msg.push(msgOnNotSelected(twoCaption));
     }
     if (!this.three) {
       msg.push(msgOnNotSelected(threeCaption));
     }

     msg.isValid = (msg.length === 0)
       ? true : false;
     return msg;
  }
  _createLoadOption = () => {
    const {
      one, two, three, dialogOptions,
      colorComp,
      compSelect1, compSelect2
    } = this
    , { chartType } = this.state
    , { seriaColor, seriaWidth } = colorComp
        ? colorComp.getConf()
        : {}
    , date = this._getDateWithForDate();

    return this.props.loadFn(
      this.props, {
        one: one,
        group: two,
        metric: three,
        dialogOptions,
        chartType, seriaColor, seriaWidth,
        date,
        selectOptions: [
          compSelect1.getOptions(),
          compSelect2.getOptions()
        ]
      }
    );
  }

  _handleClose = () => {
    this._handleWithValidationClose()
  }

  _refSelect1 = (comp) => {
    this.compSelect1 = comp
  }
  _refSelect2 = (comp) => {
    this.compSelect2 = comp
  }

  render(){
    const {
           caption, isShow, onShow, onFront,
           oneCaption, oneURI, oneJsonProp,
           twoCaption, twoURI, twoJsonProp,
           threeCaption, threeURI, threeJsonProp,
           noDate
          } = this.props
        , {
            chartType,
            isToolbar, isOptions,
            isShowLabels, isShowDate,
            dateDefault, dateOptions,
            validationMessages
          } = this.state;
    return(
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
             <ModalOptions
               isShow={isOptions}
               toggleOption={this._toggleOptionWithToolbar}
               onClose={this._hideOptionsWithToolbar}
             />
             <D.SelectWithLoad
               ref={this._refSelect1}
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={oneURI}
               jsonProp={oneJsonProp}
               caption={oneCaption}
               optionNames="Countries"
               onSelect={this._handleSelectOne}
             />
             <D.SelectWithLoad
               ref={this._refSelect2}
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={twoURI}
               jsonProp={twoJsonProp}
               caption={twoCaption}
               optionNames="Items"
               onSelect={this._handleSelectTwo}
             />
             <D.SelectWithLoad
               isShow={isShow}
               isShowLabels={isShowLabels}
               uri={threeURI}
               jsonProp={threeJsonProp}
               caption={threeCaption}
               optionNames="Metrics"
               onSelect={this._handleSelectThree}
             />
             <D.RowChart
               chartType={chartType}
               isShowLabels={isShowLabels}
               options={this._chartOptions}
               onSelectChart={this._handleSelectChartType}
               onRegColor={this._onRegColor}
             />
             {
               !noDate &&
               <D.ShowHide isShow={isShowDate}>
                 <D.RowInputSelect
                    isShowLabels={isShowLabels}
                    caption="For Date"
                    placeholder={dateDefault}
                    options={dateOptions}
                    onSelect={this._handleSelectDate}
                 />
               </D.ShowHide>
             }
             <D.ValidationMessages
                 validationMessages={validationMessages}
             />
        </D.DraggableDialog>
    );
  }
}

export default DialogEurostat3A
