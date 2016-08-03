import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import DateUtils from '../../utils/DateUtils';

import ChartActions from '../../flux/actions/ChartActions';
import {BrowserType} from '../../constants/Type';
import ChartType from '../../constants/ChartType';

import ModalDialog from '../zhn/ModalDialog';
import ToolBarButton from '../ToolBarButton';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

import DialogStyles from '../styles/DialogStyles'

const styles = DialogStyles;

const LoadItemDialog = React.createClass({
   ...WithValidation,
   propTypes : {
     isShow  : React.PropTypes.bool.isRequired,
     data    : React.PropTypes.object.isRequired,
     store   : React.PropTypes.object,
     onClose : React.PropTypes.func.isRequired
   },

   getInitialState(){
     const { fromDate, initToDate, onTestDate } = this.props.data
         , _initFromDate = (fromDate) ? fromDate : DateUtils.getFromDate(2)
         , _initToDate = (initToDate) ? initToDate : DateUtils.getToDate()
         , _onTestDate = (onTestDate) ? onTestDate : DateUtils.isValidDate

    return {
      initFromDate : _initFromDate,
      initToDate : _initToDate,
      onTestDate : _onTestDate,
      validationMessages : []
      }
   },

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
       return false;
     }
     return true;
   },

  _handlerLoad(){
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const { data, onClose } = this.props
          , { title, subtitle, caption, columnName, dataColumn, seriaColumnNames } = data
          , { fromDate, toDate } = this.datesFragment.getValues()
          , option = {
             title : title,
             subtitle : subtitle,
             value : caption,
             stock: caption,
             fromDate: fromDate,
             toDate: toDate,
             columnName,
             dataColumn,
             seriaColumnNames
          }
      ChartActions.loadStock(ChartType.WATCH_LIST, BrowserType.WATCH_LIST, option);
      onClose();
    }
    this._updateValidationMessages(validationMessages);
  },

  _getValidationMessages(){
    let   msg = [];
    const { isValid, datesMsg } = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },

  render(){
    const { isShow, data } = this.props
        , { caption } = data
        , { initFromDate, initToDate, onTestDate, validationMessages } = this.state
        , _commandButtons = [
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />
    ];
    return (
      <ModalDialog
         caption="Load Item"
         isShow={isShow}
         commandButtons={_commandButtons}
         onClose={this._handlerClose}
      >
        <div style={Object.assign({}, styles.rowDiv, {lineHeight: 2})} key="1">
          <span style={styles.labelSpan}>
            Item:
          </span>
          <span style={{fontWeight: 'bold'}}>
             {caption}
          </span>
        </div>

        <DatesFragment
            key="2"
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            onTestDate={onTestDate}
        />
        <ValidationMessagesFragment
            key="3"
            validationMessages={validationMessages}
        />

      </ModalDialog>
    )
  }
});

export default LoadItemDialog
