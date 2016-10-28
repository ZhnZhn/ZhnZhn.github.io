import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import DateUtils from '../../utils/DateUtils';

import ChartActions from '../../flux/actions/ChartActions';

import { LoadType } from '../../constants/Type';


import ModalDialog from '../zhn/ModalDialog';

import ToolBarButton from '../ToolBarButton';
import RowInputSelect from './RowInputSelect';
import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';


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

const UsStocksBySectorDialog = React.createClass({
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

    this.dataSource = undefined;
    //this.toolbarButtons =  [{ caption: 'I', onClick: this._handlerClickInfo }];

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


   _handlerSelectDataSource(dataSource){
     this.dataSource = dataSource
   },

  _handlerLoad(){
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
             seriaColumnNames : [ 'Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close' ]
          }

      ChartActions.loadStock(chartContainerType, browserType, option);
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
    const { isShow, data={} } = this.props
        , { item={}, onShow } = data
        , { text } = item
        , { initFromDate, initToDate, onTestDate, validationMessages } = this.state
        , _commandButtons = [
       <ToolBarButton
          key="a"
          type="TypeC"
          caption="Load"
          onClick={this._handlerLoad}
       />,
       <ToolBarButton
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
         onClose={this._handlerClose}
      >

        <RowInputSelect
           caption="Data Source"
           placeholder="Default: YAHOO"
           options={sourceOptions}
           onSelect={this._handlerSelectDataSource}
        />
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

export default UsStocksBySectorDialog
