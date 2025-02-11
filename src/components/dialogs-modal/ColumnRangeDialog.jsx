import {
  useRef,
  useMemo,
  getInputValue,
  setRefValue,
  getRefValue
} from '../uiApi';

import { S_INLINE } from '../styleFn';
import memoIsShow from '../hoc/memoIsShow';

import { columnRange } from '../../charts/seriaFns';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import FlatButton from '../zhn-m/FlatButton';
import RowInputText from '../dialogs/RowInputText';
import RowInputColor from '../dialogs/RowInputColor';

const S_TEXT = {
  padding: '16px 0 0 16px',
  fontWeight: 600
}
, S_PL_8 = { paddingLeft: 8 }
, S_CAPTION_1 = { width: 60 }
, S_CAPTION_2 = { width: 100 }
, S_INPUT = { width: 40 };

const DF_POIN_WIDTH = 1
, DF_R1 = 4
, DF_R2 = 0;

const SERIA_OPTION = {
  name: 'Range',
  type: 'columnrange',
  borderWidth: 0,
  pointWidth: DF_POIN_WIDTH
};

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
  seria.update(options, false)
};

const _fHeValue = (
  ref,
  min,
  max
) => (v) => {
  const _ = parseInt(v, 10);
  if ( _>min && _<max) {
    setRefValue(ref, v)
  }
};

const _crSeriaOptions = (
  pointWidth
) => ({
  ...SERIA_OPTION,
  ...{ pointWidth }
});

const ColumnRangeDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const _refPointWidth = useRef(DF_POIN_WIDTH)
  , _refR1 = useRef(DF_R1)
  , _refR2 = useRef(DF_R2)

  , _refColor = useRef()
  , _refFromIndex = useRef()
  , _refToIndex = useRef()

  , _refInputWidth = useRef()
  , _refInputR1 = useRef()
  , _refInputR2 = useRef()

  , [
    _heWidth,
    _heRadius1,
    _heRadius2,
    _heColor
  ] = useMemo(() => [
    _fHeValue(_refPointWidth, -1, 7),
    _fHeValue(_refR1, -1, 9),
    _fHeValue(_refR2, -1, 9),
    (color) => {
      setRefValue(_refColor, color)
    }
  ], [])
  , _hAdd = useMemo(() => () => {
    const { chart } = data
    , _series = chart.series
    , _s1 = _series[getRefValue(_refFromIndex)]
    , _s2 = _series[getRefValue(_refToIndex)]
    , _d = columnRange(_s1.data, _s2.data);

    _heWidth(getInputValue(_refInputWidth))
    _heRadius1(getInputValue(_refInputR1))
    _heRadius2(getInputValue(_refInputR2))

    _setRadius(getRefValue(_refR1), _s1)
    _setRadius(getRefValue(_refR2), _s2)    

    chart.zhAddSeriaToYAxis({
      data: _d,
      color: getRefValue(_refColor),
      yIndex: 0,
    }, _crSeriaOptions(getRefValue(_refPointWidth)))

    chart.zhDataLabels(true)
    onClose()
  }, [
    data, onClose,
    _heWidth, _heRadius1, _heRadius2
  ])
  , _commandButtons = useMemo(() => [
     <FlatButton
        key="yes"
        caption="Yes, Connect"
        isPrimary={true}
        onClick={_hAdd}
     />
  ], [_hAdd]);

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
  setRefValue(_refColor, c1)

  return (
    <ModalDialog
      caption="Add ColumnRange"
      isShow={isShow}
      commandButtons={_commandButtons}
      onClose={onClose}
    >
      <div style={S_TEXT}>
        Connect dots series by column range?
      </div>
      <div style={S_PL_8}>
        <RowInputColor
          style={S_INLINE}
          captionStyle={S_CAPTION_1}
          caption="Color"
          initValue={c1}
          onEnter={_heColor}
        />
        <RowInputText
           refEl={_refInputWidth}
           styleRoot={S_INLINE}
           styleCaption={S_CAPTION_1}
           styleInput={S_INPUT}
           caption="Width"
           initValue={DF_POIN_WIDTH}
           maxLength={2}
           type="number"
           min={0}
           max={6}
           step={1}
        />
      </div>
      <div style={S_PL_8}>
        <RowInputText
           refEl={_refInputR1}
           styleRoot={S_INLINE}
           styleCaption={{...S_CAPTION_2, ...{ color: c1 }}}
           styleInput={S_INPUT}
           caption={`R ${n1}`}
           initValue={DF_R1}
           type="number"
           maxLength={2}
        />
        <RowInputText
           refEl={_refInputR2}
           styleRoot={S_INLINE}
           styleCaption={{...S_CAPTION_2, ...{ color: c2 }}}
           styleInput={S_INPUT}
           caption={`R ${n2}`}
           initValue={DF_R2}
           type="number"
           maxLength={2}
        />
     </div>
    </ModalDialog>
  );
})

export default ColumnRangeDialog
