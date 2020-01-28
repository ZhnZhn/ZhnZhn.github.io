import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils'

import ChartActions from '../../flux/actions/ChartActions'
import { BrowserType as BT, LoadType as LT } from '../../constants/Type'
import CHT from '../../constants/ChartType'

import ModalDialog from '../zhn-moleculs/ModalDialog'
import D from '../dialogs/DialogCell'
import ValidationMessages from '../zhn/ValidationMessages'

import withValidationLoad from '../dialogs/decorators/withValidationLoad'

const {
  getFromDate,
  getToDate,
  isYmd
} = DateUtils;

const S = {
  ITEM_TEXT: {
    display: 'inline-block',
    maxWidth: 200,
    height: 32,
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
};

@withValidationLoad
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
       onTestDate
     } = props.data;

     this._commandButtons = [
       <D.Button.Load
         key="load"
         onClick={this._handleLoad}
       />
     ]

    this.state = {
       initFromDate: fromDate || getFromDate(2),
       initToDate: initToDate || getToDate(),
       onTestDate: onTestDate || isYmd,
       validationMessages : []
    }
   }

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
       return false;
     }
     return true;
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
             loadId: itemConf.loadId || LT.WL,
             ...itemConf
           };
      ChartActions.loadStock({
        chartType: CHT.WATCH_LIST,
        browserType: BT.WATCH_LIST
      }, option);
      onClose()
    }
    this._updateValidationMessages(validationMessages)
  }

  _createValidationMessages = () => {
    let msg = [];
    const { isValid, datesMsg } = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg) }
    msg.isValid = (msg.length === 0) ? true : false
    return msg;
  }

  _handleClose = () => {
    this._handleWithValidationClose(this._createValidationMessages)
    this.props.onClose()
  }

  _refDates = c => this.datesFragment = c

  render(){
    const { isShow, data } = this.props
        , { caption } = data
        , {
            initFromDate, initToDate,
            onTestDate, validationMessages
          } = this.state;

    return (
      <ModalDialog
         caption="Load Item"
         isShow={isShow}
         commandButtons={this._commandButtons}
         onClose={this._handleClose}
      >
        <D.Row.Text
          styleText={S.ITEM_TEXT}
          caption="Item:"
          text={caption}
        />
        <D.DatesFragment
            ref={this._refDates}
            initFromDate={initFromDate}
            initToDate={initToDate}
            onTestDate={onTestDate}
        />
        <ValidationMessages
            validationMessages={validationMessages}
        />
      </ModalDialog>
    )
  }
}

export default LoadItemDialog
