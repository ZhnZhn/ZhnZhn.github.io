import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils';
import ChartActions from '../../flux/actions/ChartActions';
import { LoadType } from '../../constants/Type';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import D from './DialogCell'

import withValidationLoad from './decorators/withValidationLoad';

const {
  getFromDate,
  getToDate,
  isYmd
} = DateUtils;

const STYLE = {
  CAPTION_SPAN : {
    display: 'inline-block',
    maxWidth: '295px'
  }
};

const sourceOptions = [
  { caption: "WIKI" , "value" : "WIKI/" }
]

@withValidationLoad
class UsStocksBySectorDialog extends Component {
  /*
   static propTypes = {
     isShow: PropTypes.bool.isRequired,
     data: PropTypes.object.isRequired,
     store: PropTypes.object,
     onClose: PropTypes.func.isRequired
   }
   */
   static defaultProps = {
     data: {}
   }

   constructor(props){
     super();
     this.dataSource = undefined;

     const {
       fromDate,
       initToDate,
       onTestDate
     } = props.data;

     this._commandButtons = [
       <D.Button.Load
         key="load"
         onClick={this._handleLoad}
       />,
       <D.Button.Show
         key="show"
         onClick={props.data.onShow}
       />
     ]
     
     this.state = {
       initFromDate: fromDate || getFromDate(2),
       initToDate: initToDate || getToDate(),
       onTestDate: onTestDate || isYmd,
       validationMessages: []
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
                  : 'WIKI/'
          , _value = `${_dataSource}${id}`
          , option = {
             title : text,
             value : _value,
             item: _value,
             fromDate: fromDate,
             toDate: toDate,
             loadId : LoadType.WL,
             id : _value,
             columnName : 'Close',
             seriaColumnNames : [ 'Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close' ],
             dataSource : `(Code: ${_dataSource})`
           };

      ChartActions.loadStock(
        { chartType: chartContainerType, browserType },
        option
      )
      onClose()
    }
    this._updateValidationMessages(validationMessages)
  }

  _getValidationMessages = () => {
    let   msg = [];
    const { isValid, datesMsg } = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg) }
    msg.isValid = (msg.length === 0) ? true : false
    return msg;
  }

  _handleClose = () => {
    if (this.state.validationMessages.length > 0){
      this.setState({ validationMessages : this._getValidationMessages() })
    }
    this.props.onClose()
  }

  render(){
    const { isShow, data={} } = this.props
        , { item={} } = data
        , { text } = item
        , {
            initFromDate, initToDate,
            onTestDate, validationMessages
          } = this.state;

    return (
      <ModalDialog
         caption={text}
         styleCaption={STYLE.CAPTION_SPAN}
         isShow={isShow}
         commandButtons={this._commandButtons}
         onClose={this._handleClose}
      >
        <D.RowInputSelect
           caption="Source"
           placeholder="Default: WIKI"
           options={sourceOptions}
           onSelect={this._handleSelectDataSource}
        />
        <D.DatesFragment
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            onTestDate={onTestDate}
        />
        <D.ValidationMessages
            validationMessages={validationMessages}
        />
      </ModalDialog>
    );
  }
}

export default UsStocksBySectorDialog
