import {
  isNumber,
  parseIntBy10
} from '../../utils/isTypeFn';

import {
  useRef,
  useCallback,
  getRefValue,
  getInputValidValue
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import { useToggle } from '../hooks/useToggle';
import {
  useProperty,
  useRefBool
} from '../hooks/useProperty';
import useMenuMore from '../dialogs/hooks/useMenuMore';
import {
  TITLE_TOGGLE,
  useToolbar
} from '../dialogs/hooks/useToolbar';

import DraggableDialog from '../zhn-moleculs/DraggableDialog';
import ShowHide from '../zhn/ShowHide';
import Toolbar from '../dialogs/Toolbar';
import SelectWithLoad from '../dialogs/SelectWithLoad';
import RowPattern from '../dialogs/rows/RowPattern';
import RowCheckBox1 from '../dialogs/rows/RowCheckBox1';

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
    return !0;
  }
  const n = parseIntBy10((value+'').trim());
  return !isNumber(n)
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
  ] = useToggle(!0)
  , _toolbarButtons = useToolbar({
    titleToggle: TITLE_TOGGLE,
    toggleInputs: toggleLabels,
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
  ] = useRefBool(!1)
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
    <DraggableDialog
       isShow={isShow}
       caption={caption}
       menuModel={menuMoreModel}
       toTopLayer={toTopLayer}
       onLoad={_hLoad}
       onShow={onShow}
       onClose={onClose}
    >
      <Toolbar
        isShow={isToolbar}
        buttons={_toolbarButtons}
      />
      <RowPattern
        refEl={_refTicket}
        isShowLabels={isShowLabels}
        caption="Stock"
        placeholder="Nyse or Nasdaq Symbol"
        onTest={_testTicket}
        errorMsg="Not Empty"
      />
      <SelectWithLoad
        isShow={isShow}
        isShowLabels={isShowLabels}
        uri={oneURI}
        jsonProp={oneJsonProp}
        caption={oneCaption}
        optionNames="Items"
        placeholder={INDICATOR_PLACEHOLDER}
        onSelect={setIndicator}
      />
      <ShowHide isShow={isShowOptions}>
         <RowPattern
           ref={_refPeriod}
           isShowLabels={isShowLabels}
           caption="Period"
           placeholder={`Default: ${DF_PERIOD}`}
           onTest={_testPeriod}
           errorMsg="Number in range 1-200"
        />
        <RowPattern
           ref={_refForDays}
           isShowLabels={isShowLabels}
           caption="For Days"
           placeholder={`Default: ${DF_FOR_DAYS} (2 Years)`}
           onTest={_testForDays}
           errorMsg="Number in range 250-2500"
        />
      </ShowHide>
      <RowCheckBox1
         caption="Add Seria with YAxis2"
         onCheck={_hCheckSecondYAxis}
         onUnCheck={_hUnCheckSecondYAxis}
      />
    </DraggableDialog>
  );
});

export default AvIndicatorDialog
