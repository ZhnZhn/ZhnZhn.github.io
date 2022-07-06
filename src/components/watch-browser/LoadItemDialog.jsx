import { Component } from 'react';
//import PropTypes from "prop-types";

import {
  getFromDate,
  getToDate,
  isYmd,
  mlsToDmy
} from '../../utils/DateUtils';
import formatNumber from '../../utils/formatNumber';

import has from '../has';

import {
  CHAT_LOAD,
  ChartActions
} from '../../flux/actions/ChartActions';
import {
  LT_WL,
  LT_WATCH_LIST
} from '../../constants/LoadType';
import {
  BT_WATCH_LIST
} from '../../constants/BrowserType';

import ModalDialog from '../zhn-moleculs/ModalDialog'
import D from '../dialogs/DialogCell'
import ValidationMessages from '../zhn/ValidationMessages'

const S_DIALOG = { width: 365 }
, S_DIALOG_SHORT = { width: 265 }
, S_ITEM_TEXT = {
  display: 'inline-block',
  maxWidth: 250,
  height: 32,
  verticalAlign: 'middle'
};

const _crValue = (x='', y='') => (`${formatNumber(y)} ${mlsToDmy(x)}`).trim();

class LoadItemDialog extends Component {
   /*
   static propTypes = {
     isShow: PropTypes.bool,
     data: PropTypes.shape({
       fromDate: PropTypes.string,
       initToDate: PropTypes.string,
       onTestDate: PropTypes.func
     }),
     store: PropTypes.object,
     onClose: PropTypes.func
   }
   */

   static defaultProps = {
     data: {}
   }

   constructor(props){
     super(props)
     const {
       fromDate,
       initToDate,
       onTestDate,
       itemConf={}
     } = props.data
     , isValue = !!itemConf.x;

     this.toolbarButtons = [{
         caption: 'L',
         title: 'Click to toggle input labels',
         onClick: this._toggleIsShowLabels
       },{
         caption: 'V',
         title: 'Click to toggle row value',
         onClick: this._toggleIsValue
       },{
         caption: 'D',
         title: 'Click to toggle date input',
         onClick: this._toggleIsShowDate
     }]

     this._commandButtons = [
       <D.Button.Load
         key="load"
         onClick={this._handleLoad}
       />
     ]

    this.state = {
       isToolbar: true,
       isShowLabels: has.wideWidth(),
       validationMessages: [],

       isShowDate: false,
       isValue,

       initFromDate: fromDate || getFromDate(2),
       initToDate: initToDate || getToDate(),
       onTestDate: onTestDate || isYmd
    }
   }

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
       return false;
     }
     return true;
   }

   _toggleIsShowLabels = () => {
     this.setState(prevState => ({
       ...prevState,
       isShowLabels: !prevState.isShowLabels
     }))
   }

   _toggleIsValue = () => {
     this.setState(prevState => ({
       ...prevState,
       isValue: !prevState.isValue
     }))
   }

   _toggleIsShowDate = () => {
     this.setState(prevState => ({
       ...prevState,
       isShowDate: !prevState.isShowDate
     }))
   }

  _handleLoad = () => {
    const validationMessages = this._createValidationMessages();
    if (validationMessages.isValid){
      const { data, onClose } = this.props
          , {
              id,
              title, subtitle, caption,
              columnName, dataColumn, seriaColumnNames,
              itemConf={}
              /*
              _itemKey, url, loadId,
              optionFetch, items,
              itemCaption, seriaType,
              dataSource, dfId, timeId
              */
             } = data
          , { fromDate, toDate } = this.datesFragment.getValues()
          , option = {
             id, title, subtitle,
             value: caption,
             item: caption,
             fromDate, toDate,
             columnName, dataColumn, seriaColumnNames,
             loadId: itemConf.loadId || LT_WL,
             ...itemConf
           };
      ChartActions[CHAT_LOAD]({
        chartType: LT_WATCH_LIST,
        browserType: BT_WATCH_LIST
      }, option);
      onClose()
    }
    if (validationMessages.isValid){
      if (this.state.validationMessages.length > 0){
        this.setState({ validationMessages })
      }
    } else {
      this.setState({ validationMessages })
    }
  }

  _createValidationMessages = () => {
    let msg = [];
    const { isValid, datesMsg } = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg) }
    msg.isValid = (msg.length === 0) ? true : false
    return msg;
  }

  _handleClose = () => {
    this.props.onClose()
    this.setState({ validationMessages: []})
  }

  _refDates = c => this.datesFragment = c

  render(){
    const { isShow, data } = this.props
    , { caption, itemConf } = data
    , { dataSource, x, y } = itemConf || {}
    , {
        isShowLabels, isShowDate, isValue,
        initFromDate, initToDate,
        onTestDate, validationMessages
      } = this.state
    , _style = isShowLabels ? S_DIALOG : S_DIALOG_SHORT
    , _value = _crValue(x, y);

    return (
      <ModalDialog
         style={_style}
         isShow={isShow}
         caption="Load Item"
         commandButtons={this._commandButtons}
         onClose={this._handleClose}
      >
        <D.Toolbar
          isShow={true}
          buttons={this.toolbarButtons}
        />
        <D.Row.Text
          isShowLabels={isShowLabels}
          styleText={S_ITEM_TEXT}
          caption="Item:"
          text={caption}
        />
        <D.ShowHide isShow={isValue}>
          <D.Row.Text
            isShowLabels={isShowLabels}
            styleText={S_ITEM_TEXT}
            caption="Value:"
            text={_value}
          />
        </D.ShowHide>
        <D.ShowHide isShow={isShowDate}>
          <D.DatesFragment
            ref={this._refDates}
            isShowLabels={isShowLabels}
            initFromDate={initFromDate}
            initToDate={initToDate}
            onTestDate={onTestDate}
          />
        </D.ShowHide>
        <D.Row.Text
          isShowLabels={isShowLabels}
          styleText={S_ITEM_TEXT}
          caption="Source:"
          text={dataSource}
        />
        <ValidationMessages
            validationMessages={validationMessages}
        />
      </ModalDialog>
    )
  }
}

export default LoadItemDialog
