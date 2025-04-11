import {
  useRef,
  useCallback,
  getRefValue,
  getInputValidValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import { useToggle } from '../hooks/useToggle';
import useRefBool from '../hooks/useRefBool';
import useProperty from '../hooks/useProperty';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import useToolbar from '../dialogs/hooks/useToolbar';

import D from '../dialogs/DialogCell'

const _isNaN = Number.isNaN;

const DF_INDICATOR = 'SMA'
, DF_PERIOD = 30
, DF_FOR_DAYS = 501
, INDICATOR_PLACEHOLDER = `Default: ${DF_INDICATOR} (${DF_PERIOD})`;

const _isValueBlank = value => (value+'')
 .trim() === '';

const _testTicket = value => !_isValueBlank(value);

const _testInRangeOrEmpty = (
  min,
  max
) => (value) => {
  if (_isValueBlank(value)) {
    return true;
  }
  const n = parseInt((value+'').trim(), 10);
  return !_isNaN(n)
    && n>min
    && n<max;
}

const _testPeriod = _testInRangeOrEmpty(0, 201)
const _testForDays = _testInRangeOrEmpty(250, 2500)

const _crValue = (
  indicator,
  period
) => {
  switch(indicator) {
    case 'MACD': return 'MACD(12, 24, 9)';
    case 'STOCH': return 'STOCH(5, 3, 3, SMA)';
    default: return `${indicator} (${period})`;
  }
}


const AvIndicatorDialog = memoIsShow(({
  isShow,
  caption,
  oneURI,
  oneJsonProp,
  oneCaption,
  toTopLayer,
  onAbout,
  loadId,
  onLoad,
  onShow,
  onClose
}) => {
  const [
    isToolbar,
    menuMoreModel
  ] = useMenuMore(onAbout)
  , [
    isShowOptions,
    toggleOptions
  ] = useToggle()
  , [
    isShowLabels,
    toggleLabels
  ] = useToggle(true)
  , _toolbarButtons = useToolbar({
    toggleLabels,
    toggleOptions,
    onAbout
  })
  , _refTicket = useRef()
  , _refPeriod = useRef()
  , _refForDays = useRef()
  , [
    _refIsSecondYAxis,
    _hCheckSecondYAxis,
    _hUnCheckSecondYAxis
  ] = useRefBool(false)
  , [
    setIndicator,
    getIndicator
  ] = useProperty()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hLoad = useCallback(()=>{
     const period = getInputValidValue(_refPeriod) || DF_PERIOD
     , forDays = getInputValidValue(_refForDays) || DF_FOR_DAYS
     , ticket = getInputValidValue(_refTicket)
     , indicator = (getIndicator() || {}).value
        || DF_INDICATOR;
     onLoad({
       loadId,
       indicator,
       ticket,
       period,
       forDays,
       value: _crValue(indicator, period), //for label
       hasSecondYAxis: getRefValue(_refIsSecondYAxis)
     })
  }, [])
  // loadId, onLoad, getIndicator, getIsSecondYAxis
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <D.DraggableDialog
       isShow={isShow}
       caption={caption}
       menuModel={menuMoreModel}
       toTopLayer={toTopLayer}
       onLoad={_hLoad}
       onShow={onShow}
       onClose={onClose}
    >
      <D.Toolbar
        isShow={isToolbar}
        buttons={_toolbarButtons}
      />
      <D.RowPattern
        refEl={_refTicket}
        isShowLabels={isShowLabels}
        caption="Stock"
        placeholder="Nyse or Nasdaq Symbol"
        onTest={_testTicket}
        errorMsg="Not Empty"
      />
      <D.SelectWithLoad
        isShow={isShow}
        isShowLabels={isShowLabels}
        uri={oneURI}
        jsonProp={oneJsonProp}
        caption={oneCaption}
        optionNames="Items"
        placeholder={INDICATOR_PLACEHOLDER}
        onSelect={setIndicator}
      />
      <D.ShowHide isShow={isShowOptions}>
         <D.RowPattern
           ref={_refPeriod}
           isShowLabels={isShowLabels}
           caption="Period"
           placeholder={`Default: ${DF_PERIOD}`}
           onTest={_testPeriod}
           errorMsg="Number in range 1-200"
        />
        <D.RowPattern
           ref={_refForDays}
           isShowLabels={isShowLabels}
           caption="For Days"
           placeholder={`Default: ${DF_FOR_DAYS} (2 Years)`}
           onTest={_testForDays}
           errorMsg="Number in range 250-2500"
        />
      </D.ShowHide>
      <D.RowCheckBox1
         caption="Add Seria with Second YAxis"
         onCheck={_hCheckSecondYAxis}
         onUnCheck={_hUnCheckSecondYAxis}
      />
    </D.DraggableDialog>
  );
});

export default AvIndicatorDialog
