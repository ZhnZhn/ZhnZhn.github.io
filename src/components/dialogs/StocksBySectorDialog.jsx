import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import DateUtils from '../../utils/DateUtils';

import ChartActions from '../../flux/actions/ChartActions';

import { LoadType } from '../../constants/Type';

import ModalDialog from '../zhn/ModalDialog';
import RowText from './RowText';
import ToolBarButton from '../ToolBarButton';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';

const ABSENT = "Absent"
    , ABSENT_VALIDATION_MSG = "Data Source for this item Absent"

const STYLE = {
  CAPTION_SPAN : {
    display: 'inline-block',
    maxWidth: '295px'
  }
}

const StocksBySectorDialog = React.createClass({
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

   componentWillReceiveProps(nextProps){
     if ( this.props.data !== nextProps.data &&
          this.state.validationMessages.length !== 0)
     {
       this.setState({ validationMessages: []})
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
          , { item={}, browserType, chartContainerType } = data
          , { id, text } = item
          , { fromDate, toDate } = this.datesFragment.getValues()
          , option = {
             title : text,
             //subtitle : subtitle,
             value : id,
             stock: id,
             fromDate: fromDate,
             toDate: toDate,
             loadId : LoadType.WL,
             id : id,
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
    const { data } = this.props
        , { item } = data
        , { id } = item
        , _arr = id.split('/');

    if (!(_arr.length>1)) { msg.push(ABSENT_VALIDATION_MSG);}

    const { isValid, datesMsg } = this.datesFragment.getValidation();
    if (!isValid) { msg = msg.concat(datesMsg); }
    msg.isValid = (msg.length === 0) ? true : false;
    return msg;
  },

  render(){
    const { isShow, data={} } = this.props
        , { item={}, onShow } = data
        , { text, id } = item
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
          ]
        , _arr = id.split('/')
        , _text = (_arr.length>1) ? id.split('/')[0] : ABSENT ;

    return (
      <ModalDialog
         caption={text}
         styleCaption={STYLE.CAPTION_SPAN}
         isShow={isShow}
         commandButtons={_commandButtons}
         onClose={this._handlerClose}
      >
        <RowText
          key="1"
          caption="Source:"
          text={_text}
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

export default StocksBySectorDialog
