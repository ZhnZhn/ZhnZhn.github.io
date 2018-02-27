import React, { Component } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils';
import ChartActions from '../../flux/actions/ChartActions';
import { LoadType } from '../../constants/Type';

import D from './DialogCell'
import ModalDialog from '../zhn-moleculs/ModalDialog';
import NasdaqLink from '../native-links/NasdaqLink';

import withValidationLoad from './decorators/withValidationLoad';

const {
  getFromDate,
  getToDate,
  isYmd
} = DateUtils;

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
  /*
   static propTypes = {
     isShow  : PropTypes.bool.isRequired,
     data    : PropTypes.object.isRequired,
     store   : PropTypes.object,
     onClose : PropTypes.func.isRequired
   }
  */

   constructor(props){
     super()
     this.toolbarButtons =  [
       { caption: 'L', onClick: this._handleClickLink }
     ]
     this._commandButtons = [
       <D.Button.Load onClick={this._handleLoad} />,
       <D.Button.Show onClick={props.data.onShow} />
     ]
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
              : true;

      return {
        isShowLink: _isShowLink,
        initFromDate: fromDate || getFromDate(2),
        initToDate: initToDate || getToDate(),
        onTestDate: onTestDate || isYmd,
        validationMessages: []
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
             value : id,
             item: item,
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

      ChartActions.loadStock(
        { chartType: chartContainerType, browserType },
        option
      )
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
        , { item={} } = data
        , { text } = item
        , {
            isShowLink,
            initFromDate, initToDate, onTestDate,
            validationMessages
          } = this.state
        , _source = this._getItemSource(this.props);

    return (
      <ModalDialog
         caption={text}
         styleCaption={STYLE.CAPTION_SPAN}
         isShow={isShow}
         commandButtons={this._commandButtons}
         onClose={this._handleClose}
      >
        <D.ToolbarButtonCircle
          buttons={this.toolbarButtons}
        />
        <D.Row.Text
          styleRoot={STYLE.SOURCE_ROOT}
          caption="Source:"
          text={_source}
        />
        <D.ShowHide isShow={isShowLink} style={STYLE.LINK_SHOW_HIDE}>
          <D.Row.Plain style={STYLE.LINK_ROOT}>
            <span style={STYLE.LINK_CAPTION}>
              Link:
            </span>
            <NasdaqLink item={item} caption="NASDAQ" />
          </D.Row.Plain>
        </D.ShowHide>
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

export default StocksBySectorDialog
