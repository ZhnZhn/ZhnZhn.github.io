//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useEffect,
  getRefValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useToggle from '../hooks/useToggle';

import {
  getFromDate,
  getToDate,
  isYmd,
  mlsToDmy
} from '../../utils/DateUtils';
import formatNumber from '../../utils/formatNumber';

import has from '../has';

import {
  CHAT_LOAD,
  ChartActions
} from '../../flux/actions/ChartActions';
import {
  LT_WL,
  LT_WATCH_LIST
} from '../../constants/LoadType';
import {
  BT_WATCH_LIST
} from '../../constants/BrowserType';

import ModalDialog from '../zhn-moleculs/ModalDialog'
import D from '../dialogs/DialogCell'
import { ButtonLoad } from '../dialogs/Buttons';
import ValidationMessages from '../zhn/ValidationMessages'

const S_DIALOG = { width: 365 }
, S_DIALOG_SHORT = { width: 265 }
, S_ITEM_TEXT = {
  display: 'inline-block',
  maxWidth: 250,
  height: 32,
  verticalAlign: 'middle'
};

const _isNumber = n => typeof n === 'number'
 && n-n === 0;

const _crValue = (
  x='',
  y=''
) => (`${formatNumber(y)} ${mlsToDmy(x)}`).trim();

const HAS_WIDE_WIDTH = has.wideWidth()
, DF_DATA = {}
, DF_FROM_DATE = getFromDate(2)
, DF_TO_DATE = getToDate();

const LoadItemDialog = memoIsShow(({
  isShow,
  data=DF_DATA,
  onClose
}) => {
  const _refDates = useRef()
  , {
    caption,
    fromDate,
    initToDate,
    onTestDate,
    itemConf
  } = data
  , {
    dataSource,
    x,
    y
  } = itemConf || {}
  , [
    isShowLabels,
    _toggleIsShowLabels
  ] = useToggle(HAS_WIDE_WIDTH)
  , [
    isValue,
    _toggleIsValue
  ] = useToggle(_isNumber(x))
  , [
    isShowDate,
    _toggleIsShowDate
  ] = useToggle()
  , _toolbarButtons = getRefValue(useRef([{
      caption: 'L',
      title: 'Click to toggle input labels',
      onClick: _toggleIsShowLabels
    },{
      caption: 'V',
      title: 'Click to toggle row value',
      onClick: _toggleIsValue
    },{
      caption: 'D',
      title: 'Click to toggle date input',
      onClick: _toggleIsShowDate
  }]))
  , [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , _hLoad = () => {
    const _datesInst = getRefValue(_refDates)
    , {
      isValid,
      datesMsg
    } = _datesInst.getValidation()
    , _validationMessages = isValid
        ? []
        : datesMsg;

    if (_validationMessages.length === 0){
      const {
          id,
          title,
          subtitle,
          caption,
          columnName,
          dataColumn,
          seriaColumnNames,
          itemConf={}

          //_itemKey, url, loadId,
          //optionFetch, items,
          //itemCaption, seriaType,
          //dataSource, dfId, timeId

        } = data
      , {
          fromDate,
          toDate
        } = _datesInst.getValues()
      , option = {
          id,
          title,
          subtitle,
          value: caption,
          item: caption,
          fromDate,
          toDate,
          columnName,
          dataColumn,
          seriaColumnNames,
          loadId: itemConf.loadId || LT_WL,
          ...itemConf
       };
      ChartActions[CHAT_LOAD]({
        chartType: LT_WATCH_LIST,
        browserType: BT_WATCH_LIST
      }, option);
      onClose()

      setValidationMessages(
        prevVms => prevVms.length > 0
          ? []
          : prevVms
      )
    } else {
      setValidationMessages(_validationMessages)
    }
  }
  , _commandButtons = [
     <ButtonLoad
       key="load"
       onClick={_hLoad}
     />
  ]
  , _hClose = () => {
    onClose()
    setValidationMessages([])
  }

  useEffect(() => {
    _toggleIsValue(_isNumber(x))
  }, [x, _toggleIsValue])


  const _initFromDate = fromDate || DF_FROM_DATE
  , _initToDate = initToDate || DF_TO_DATE
  , _onTestDate = onTestDate || isYmd
  , _style = isShowLabels
      ? S_DIALOG
      : S_DIALOG_SHORT
  , _value = _crValue(x, y);

  return (
    <ModalDialog
       style={_style}
       isShow={isShow}
       caption="Load Item"
       commandButtons={_commandButtons}
       onClose={_hClose}
    >
      <D.Toolbar
        isShow={true}
        buttons={_toolbarButtons}
      />
      <D.RowText
        isShowLabels={isShowLabels}
        textStyle={S_ITEM_TEXT}
        caption="Item:"
        text={caption}
      />
      <D.ShowHide isShow={isValue}>
        <D.RowText
          isShowLabels={isShowLabels}
          textStyle={S_ITEM_TEXT}
          caption="Value:"
          text={_value}
        />
      </D.ShowHide>
      <D.ShowHide isShow={isShowDate}>
        <D.DatesFragment
          ref={_refDates}
          isShowLabels={isShowLabels}
          initFromDate={_initFromDate}
          initToDate={_initToDate}
          onTestDate={_onTestDate}
        />
      </D.ShowHide>
      <D.RowText
        isShowLabels={isShowLabels}
        textStyle={S_ITEM_TEXT}
        caption="Source:"
        text={dataSource}
      />
      <ValidationMessages
          validationMessages={validationMessages}
      />
    </ModalDialog>
  );
});

/*
LoadItemDialog.propTypes = {
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

export default LoadItemDialog
