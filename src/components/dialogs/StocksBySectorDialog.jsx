import React, { Component, PropTypes } from 'react';

import DateUtils from '../../utils/DateUtils';
import ChartActions from '../../flux/actions/ChartActions';
import { LoadType } from '../../constants/Type';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import ToolbarButtonCircle from './ToolbarButtonCircle';
import RowText from './RowText';
import ShowHide from '../zhn/ShowHide';
import Row from './Row';
import NasdaqLink from '../native-links/NasdaqLink';
import DatesFragment from '../zhn-moleculs/DatesFragment';
import ValidationMessages from '../zhn/ValidationMessages';
import ActionButton from '../zhn/ActionButton';

import withValidationLoad from './decorators/withValidationLoad';

const ABSENT = "Absent"
    , ABSENT_VALIDATION_MSG = "Data Source for this item Absent";

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

@withValidationLoad
class StocksBySectorDialog extends Component {
   static propTypes = {
     isShow  : PropTypes.bool.isRequired,
     data    : PropTypes.object.isRequired,
     store   : PropTypes.object,
     onClose : PropTypes.func.isRequired
   }

   constructor(props){
     super()
     this.toolbarButtons =  [{ caption: 'L', onClick: this._handleClickLink }]
     this.state = this._createInitialState(props)
   }

   _getItemSource = (props) => {
     const { data={} } = props
         , { item={} } = data
         , { id='' } = item
         , arr = id.split('/');
      if (arr.length<2){
        return ABSENT;
      } else {
        return arr[0];
      }
   }

   _createInitialState = (props) => {
     const { data={} } = props
         , { fromDate, initToDate, onTestDate } = data
         , _isShowLink = (this._getItemSource(props) !== ABSENT)
              ? false
              : true
         , _initFromDate = (fromDate) ? fromDate : DateUtils.getFromDate(2)
         , _initToDate = (initToDate) ? initToDate : DateUtils.getToDate()
         , _onTestDate = (onTestDate) ? onTestDate : DateUtils.isValidDate;

      return {
        isShowLink : _isShowLink,
        initFromDate : _initFromDate,
        initToDate : _initToDate,
        onTestDate : _onTestDate,
        validationMessages : []
      };
   }

   componentWillReceiveProps(nextProps){
     if ( this.props.data !== nextProps.data) {
       this.setState(this._createInitialState(nextProps))
     }
   }

   shouldComponentUpdate(nextProps, nextState){
     if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
       return false;
     }
     return true;
   }

  _handleClickLink = () => {
     this.setState({ isShowLink: !this.state.isShowLink })
  }

  _handleLoad = () => {
    const validationMessages = this._getValidationMessages();
    if (validationMessages.isValid){
      const { data, onClose } = this.props
          , { item={}, browserType, chartContainerType, dialogProps } = data
          , { id, text } = item
          , { fromDate, toDate } = this.datesFragment.getValues()
          , _source = this._getItemSource(this.props)
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
             seriaColumnNames : [ 'Open', 'High', 'Low', 'Volume', 'Adjusted Close', 'Adj. Close' ],
             dataSource : `(Code: ${_source})`,
             ...dialogProps
           };

      ChartActions.loadStock(chartContainerType, browserType, option)
      onClose()
    }
    this._updateValidationMessages(validationMessages)
  }

  _getValidationMessages = () => {
    let  msg = [];

    if (this._getItemSource(this.props) === ABSENT) {
      msg.push(ABSENT_VALIDATION_MSG)
    }

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
        , { item={}, onShow } = data
        , { text } = item
        , {
            isShowLink,
            initFromDate, initToDate, onTestDate,
            validationMessages
          } = this.state
        , _commandButtons = [
             <ActionButton
                type="TypeC"
                caption="Load"
                onClick={this._handleLoad}
             />,
             <ActionButton
                type="TypeC"
                caption="Show"
                onClick={onShow}
             />
          ]
        , _source = this._getItemSource(this.props);


    return (
      <ModalDialog
         caption={text}
         styleCaption={STYLE.CAPTION_SPAN}
         isShow={isShow}
         commandButtons={_commandButtons}
         onClose={this._handleClose}
      >
        <ToolbarButtonCircle
          buttons={this.toolbarButtons}
        />
        <RowText
          caption="Source:"
          text={_source}
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
        <ValidationMessages
            validationMessages={validationMessages}
        />
      </ModalDialog>
    );
  }
}

export default StocksBySectorDialog
