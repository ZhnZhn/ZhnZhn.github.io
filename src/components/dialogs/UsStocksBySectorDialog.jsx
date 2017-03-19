import React, { Component, PropTypes } from 'react';

import DateUtils from '../../utils/DateUtils';
import ChartActions from '../../flux/actions/ChartActions';
import { LoadType } from '../../constants/Type';

import ModalDialog from '../zhn/ModalDialog';
import ActionButton from '../zhn/ActionButton';
import RowInputSelect from './RowInputSelect';
import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';

import withValidationLoad from './decorators/withValidationLoad';

const STYLE = {
  CAPTION_SPAN : {
    display: 'inline-block',
    maxWidth: '295px'
  }
};

const sourceOptions = [
  { caption: "YAHOO" , "value" : "YAHOO/" },
  { caption: "WIKI" , "value" : "WIKI/" },
  { caption: "GOOG/NYSE" , "value" : "GOOG/NYSE_" },
  { caption: "GOOG/NASDAQ" , "value" : "GOOG/NASDAQ_" }
]


@withValidationLoad
class UsStocksBySectorDialog extends Component {

   constructor(props){
     super();
     this.dataSource = undefined;

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

   _handleSelectDataSource = (dataSource) => {
     this.dataSource = dataSource
   }

  _handleLoad = () => {
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const { data, onClose } = this.props
          , { item={}, chartContainerType, browserType } = data
          , { id, text } = item
          , { fromDate, toDate } = this.datesFragment.getValues()
          , _dataSource = (this.dataSource)
                  ? this.dataSource.value
                  : 'YAHOO/'
          , _value = `${_dataSource}${id}`
          , option = {
             title : text,
             //subtitle : subtitle,
             value : _value,
             stock: _value,
             fromDate: fromDate,
             toDate: toDate,
             loadId : LoadType.WL,
             id : _value,
             columnName : 'Close',
             seriaColumnNames : [ 'Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close' ],
             dataSource : `(Code: ${_dataSource})`
          }

      ChartActions.loadStock(chartContainerType, browserType, option);
      onClose();
    }
    this._updateValidationMessages(validationMessages);
  }

  _getValidationMessages = () => {
    let   msg = [];
    const { isValid, datesMsg } = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  }

  _handleClose = () => {
    if (this.state.validationMessages.length > 0){
      this.setState({validationMessages : this._getValidationMessages()});
    }
    this.props.onClose();
  }

  render(){
    const { isShow, data={} } = this.props
        , { item={}, onShow } = data
        , { text } = item
        , { initFromDate, initToDate, onTestDate, validationMessages } = this.state
        , _commandButtons = [
       <ActionButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handleLoad}
       />,
       <ActionButton
          key="b"
          type="TypeC"
          caption="Show"
          onClick={onShow}
       />
    ];

    return (
      <ModalDialog
         caption={text}
         styleCaption={STYLE.CAPTION_SPAN}
         isShow={isShow}
         commandButtons={_commandButtons}
         onClose={this._handleClose}
      >
        <RowInputSelect
           caption="Data Source"
           placeholder="Default: YAHOO"
           options={sourceOptions}
           onSelect={this._handleSelectDataSource}
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

UsStocksBySectorDialog.propTypes = {
  isShow  : PropTypes.bool.isRequired,
  data    : PropTypes.object.isRequired,
  store   : PropTypes.object,
  onClose : PropTypes.func.isRequired
};
UsStocksBySectorDialog.defaultProps = {
  data : {}
};
UsStocksBySectorDialog.displaName = 'UsStocksBySectorDialog';

export default UsStocksBySectorDialog
