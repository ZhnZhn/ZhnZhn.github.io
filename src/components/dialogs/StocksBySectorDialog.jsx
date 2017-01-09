import React from 'react';

import WithValidation from '../dialogs/WithValidation';

import DateUtils from '../../utils/DateUtils';

import ChartActions from '../../flux/actions/ChartActions';

import { LoadType } from '../../constants/Type';



import ModalDialog from '../zhn/ModalDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import RowText from './RowText';

import ShowHide from '../zhn/ShowHide';
import Row from './Row';
import NasdaqLink from '../native-links/NasdaqLink';

import DatesFragment from '../DatesFragment';
import ValidationMessagesFragment from '../ValidationMessagesFragment';
import ToolBarButton from '../ToolBarButton';

const ABSENT = "Absent"
    , ABSENT_VALIDATION_MSG = "Data Source for this item Absent"

const STYLE = {
  CAPTION_SPAN : {
    display: 'inline-block',
    maxWidth: '295px'
  },
  SOURCE_ROOT : {
    lineHeight: 1.5,
    marginBottom: '0px'
  },
  LINK_SHOW_HIDE : {
    marginBottom: '10px'
  },
  LINK_ROOT: {
    marginTop: '0px',
    marginBottom : '0px',
    lineHeight: 1.5,
    fontWeight: 'bold'
  },
  LINK_CAPTION : {
    color: '#1B75BB',
    display: 'inline-block',
    textAlign: 'right',
    width: '100px',
    paddingRight: '5px',
    fontSize: '16px'
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

   _createInitialState(props){
     const { data={} } = props
         , { item={}, fromDate, initToDate, onTestDate } = data
         , { id='' } = item
         , _isShowLink = (id.split('/').length>1) ? false : true
         , _initFromDate = (fromDate) ? fromDate : DateUtils.getFromDate(2)
         , _initToDate = (initToDate) ? initToDate : DateUtils.getToDate()
         , _onTestDate = (onTestDate) ? onTestDate : DateUtils.isValidDate

      return {
        isShowLink : _isShowLink,
        initFromDate : _initFromDate,
        initToDate : _initToDate,
        onTestDate : _onTestDate,
        validationMessages : []
      }
   },

   getInitialState(){
    this.toolbarButtons =  [{ caption: 'L', onClick: this._handleClickLink }];
    return this._createInitialState(this.props);
   },

   componentWillReceiveProps(nextProps){
     if ( this.props.data !== nextProps.data) {
       this.setState(this._createInitialState(nextProps));
     }
   },

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
       return false;
     }
     return true;
   },

  _handleClickLink(){
     this.setState({ isShowLink: !this.state.isShowLink })
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
             //stock: id,
             stock : item,
             fromDate: fromDate,
             toDate: toDate,
             loadId : LoadType.WL,
             id : id,
             linkFn : 'NASDAQ',
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
        , { text, id='' } = item
        , {
            isShowLink,
            initFromDate, initToDate, onTestDate,
            validationMessages
          } = this.state
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
        <ToolbarButtonCircle
          buttons={this.toolbarButtons}
        />
        <RowText
          caption="Source:"
          text={_text}
          styleRoot={STYLE.SOURCE_ROOT}
        />
        <ShowHide isShow={isShowLink} style={STYLE.LINK_SHOW_HIDE}>
          <Row style={STYLE.LINK_ROOT}>
            <span style={STYLE.LINK_CAPTION}>
              Link:
            </span>
            <NasdaqLink item={item} caption="NASDAQ" />
          </Row>
        </ShowHide>
        <DatesFragment
            ref={c => this.datesFragment = c}
            initFromDate={initFromDate}
            initToDate={initToDate}
            onTestDate={onTestDate}
        />
        <ValidationMessagesFragment
            validationMessages={validationMessages}
        />
      </ModalDialog>
    )
  }
});

export default StocksBySectorDialog
