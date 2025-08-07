import {
  parseIntBy10
} from '../../utils/isTypeFn';

import {
  useRef,
  useMemo,
  getInputValue,
  setRefValue,
  getRefValue
} from '../uiApi';

import { crInputNumberProps } from '../inputFn';
import { S_INLINE } from '../styleFn';
import memoIsShow from '../hoc/memoIsShow';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import useCommandButtons from '../zhn-moleculs/useCommandButtons';
import InputSwitch from '../zhn/InputSwitch';
import RowInputText from '../dialogs/RowInputText';

const S_INPUT_SWITCH = {
  width: 'fit-content',
  padding: '16px 0 14px 28px'
}
, S_ROW_INPUT = {
  paddingLeft: 8,
  paddingBottom: 8
}
, S_CAPTION = { width: 100 }
, S_INPUT = { width: 40 };

// [n1,n2,fromIndex,toIndex]
const _getNames = s => {
  const n1 = s[0].name
  , n2 = s[1].name;
  return n1 <= n2
    ? [n1, n2, 0, 1]
    : [n2, n1, 1, 0];
};

const _getColor = (
  series,
  index
) => series[index].color;

const _setRadius = (
  value,
  seria
) => {
  const { options } = seria;
  options.marker.radius = value
  seria.update(options, !1)
};

const _getInputValue = (
  refInput,
  min,
  max,
  dfValue
) => {
  const value = parseIntBy10(getInputValue(refInput));
  return value>=min && value<=max
    ? value
    : dfValue;
};

const DF_R1 = 8
, DF_R2 = 5
, MIN_R = 1
, MAX_R = 15;

const RowInputRadius = ({
  refEl,
  color,
  caption,
  initValue
}) => (
  <RowInputText
     {...crInputNumberProps(initValue, MIN_R, MAX_R)}
     refEl={refEl}
     styleRoot={S_INLINE}
     styleCaption={{...S_CAPTION, ...{ color }}}
     styleInput={S_INPUT}
     caption={caption}
  />
);

const StyleDotSeriesDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const _refFromIndex = useRef()
  , _refToIndex = useRef()

  , _refInputR1 = useRef()
  , _refInputR2 = useRef()
  , _refIsLabels = useRef(!1)
  ,  _toggleEnableLabels = useMemo(() =>
      (is) => { setRefValue(_refIsLabels, is) }
  , [])
  , _hApply = useMemo(() => () => {
    const { chart } = data
    , _series = chart.series
    , _s1 = _series[getRefValue(_refFromIndex)]
    , _s2 = _series[getRefValue(_refToIndex)]
    , _r1 = _getInputValue(_refInputR1, MIN_R, MAX_R, DF_R1)
    , _r2 = _getInputValue(_refInputR2, MIN_R, MAX_R, DF_R2)

    _setRadius(_r1, _s1)
    _setRadius(_r2, _s2)
    chart.zhDataLabels(getRefValue(_refIsLabels))

    onClose()
  }, [data, onClose])
  , _commandButtons = useCommandButtons(() => [
    ["Apply", _hApply]
  ]);

  const { chart } = data
  , { series } = chart
  , [
    n1,
    n2,
    fromIndex,
    toIndex
  ] = _getNames(series)
  , c1 = _getColor(series, fromIndex)
  , c2 = _getColor(series, toIndex);

  setRefValue(_refFromIndex, fromIndex)
  setRefValue(_refToIndex, toIndex)

  return (
    <ModalDialog
      caption="Style Dot Series"
      isShow={isShow}
      commandButtons={_commandButtons}
      onClose={onClose}
    >

      <InputSwitch
        style={S_INPUT_SWITCH}
        caption="Enable Labels"
        onToggle={_toggleEnableLabels}
      />
      <div style={S_ROW_INPUT}>
        <RowInputRadius
           refEl={_refInputR1}
           color={c1}
           caption={`R ${n1}`}
           initValue={DF_R1}
        />
        <RowInputRadius
           refEl={_refInputR2}
           color={c2}
           caption={`R ${n2}`}
           initValue={DF_R2}
        />
     </div>
    </ModalDialog>
  );
})

export default StyleDotSeriesDialog
