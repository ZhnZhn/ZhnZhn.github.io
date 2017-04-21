import React, { Component, PropTypes } from 'react';

import DateUtils from '../../utils/DateUtils';

import ChartActions from '../../flux/actions/ChartActions';
import { BrowserType, LoadType } from '../../constants/Type';
import ChartType from '../../constants/ChartType';

import ModalDialog from '../zhn/ModalDialog';
import ActionButton from '../zhn/ActionButton';
import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';
import RowText from '../dialogs/RowText';

import withValidationLoad from '../dialogs/decorators/withValidationLoad';

@withValidationLoad
class LoadItemDialog extends Component {
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

   constructor(props){
     super()
     const { fromDate, initToDate, onTestDate } = props.data
         , _initFromDate = (fromDate) ? fromDate : DateUtils.getFromDate(2)
         , _initToDate = (initToDate) ? initToDate : DateUtils.getToDate()
         , _onTestDate = (onTestDate) ? onTestDate : DateUtils.isValidDate;

    this.state = {
        initFromDate : _initFromDate,
        initToDate : _initToDate,
        onTestDate : _onTestDate,
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
          , { id, title, subtitle, caption, columnName, dataColumn, seriaColumnNames } = data
          , { fromDate, toDate } = this.datesFragment.getValues()
          , option = {
             title : title,
             subtitle : subtitle,
             value : caption,
             stock: caption,
             fromDate: fromDate,
             toDate: toDate,
             loadId : LoadType.WL,
             id,
             columnName,
             dataColumn,
             seriaColumnNames
           };
      ChartActions.loadStock(ChartType.WATCH_LIST, BrowserType.WATCH_LIST, option);
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

  render(){
    const { isShow, data } = this.props
        , { caption } = data
        , { initFromDate, initToDate, onTestDate, validationMessages } = this.state
        , _commandButtons = [
             <ActionButton
                type="TypeC"
                caption="Load"
                onClick={this._handleLoad}
             />
          ];
    return (
      <ModalDialog
         caption="Load Item"
         isShow={isShow}
         commandButtons={_commandButtons}
         onClose={this._handleClose}
      >
        <RowText
          caption="Item:"
          text={caption}
        />
        <DatesFragment
            ref={c => this.datesFragment = c}
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
