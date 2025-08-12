import { parseIntBy10 } from '../../utils/isTypeFn';

import {
  useRef,
  getRefValue,
  setRefValue
} from '../uiApi';
import { crInputNumberProps } from '../inputFn';
import {
  S_INLINE,
  CL_BLACK
} from '../styleFn';

import RowInputColor from '../dialogs/RowInputColor';
import RowInputText from '../dialogs/RowInputText';

import {
  SvgMinus,
  SvgPlus
} from '../zhn/BtSvgCircle';
import InputText from '../zhn/InputText';
import InputSwitch from '../zhn/InputSwitch';
import { RowOpenClose } from './RowOpenClose';

const DF_COLOR = '#2b908f'

, DF_PERIOD = 1
, DF_SERIA = 1

, S_PERIOD_INPUT = {
  width: 56,
  marginLeft: 0,
  marginRight: 12
}
, S_SERIA_INPUT = { width: 36 }
, S_ROW_2 = { paddingBottom: 6 }
, S_PL_8 = { paddingLeft: 8 }
, S_CAPTION_STYLE = {
   width: 85,
   paddingLeft: 5,
   display: 'inline-block',
   fontWeight: 'bold'
}
, crSpanStyle = color => ({
  color,
  paddingLeft: 8,
  fontWeight: 'bold'
})
, S_INLINE_INPUT_SWITCH = {
  display: 'inline-flex',
  width: '50%',
  paddingLeft: 14
};

const InputPlus = ({
  initValue,
  onChangePeriod,
  onPlus
}) => (
  <>
    <InputText
      {...crInputNumberProps(initValue, 1, 999)}
      style={S_PERIOD_INPUT}
      onChange={onChangePeriod}
      onEnter={onPlus}
    />
    <SvgPlus
      style={S_INLINE}
      onClick={onPlus}
    />
  </>
);

const MinusPeriod = ({
  color,
  period,
  onMinus
}) => (
  <>
    <SvgMinus
       style={S_INLINE}
       onClick={onMinus}
    />
    <span style={crSpanStyle(color)}>
      {period}
    </span>
  </>
);

const _fChangeNumber = (
  ref,
  dfValue
) => n => setRefValue(ref, parseIntBy10(n) || dfValue);

const RowType1 = ({
  refEl,
  is,
  caption,
  dfColor=DF_COLOR,
  onMinus,
  onPlus
}) => {
  const _refColor = useRef(dfColor)
  , _refPeriod = useRef(DF_PERIOD)
  , _refSeriaType = useRef('column')
  , _refSeria = useRef(DF_SERIA)
  , _refOnTop = useRef(!1)
  , _onColor = color => setRefValue(_refColor, color)
  , _onChangePeriod = _fChangeNumber(_refPeriod, DF_PERIOD)
  , _onToggleColumn = is => setRefValue(_refSeriaType, is ? 'column' : 'spline')
  , _onChangeSeria = _fChangeNumber(_refSeria, DF_SERIA)
  , _onToggleTop = is => setRefValue(_refOnTop, is)
  , _onPlus = () => onPlus({
      s: getRefValue(_refSeria),
      color: getRefValue(_refColor),
      type: getRefValue(_refSeriaType),
      zIndex: getRefValue(_refOnTop) ? void 0 : -1
    }, getRefValue(_refPeriod));

  return (
  <RowOpenClose
    refEl={refEl}
    caption={caption}
    CompAfter={
      is ? <MinusPeriod
              color={getRefValue(_refColor)}
              period={getRefValue(_refPeriod)}
              onMinus={onMinus}
           />
         : <InputPlus
              initValue={getRefValue(_refPeriod)}
              onChangePeriod={_onChangePeriod}
              onPlus={_onPlus}
           />
    }
  >
    <div style={S_PL_8}>
      <RowInputColor
        style={S_INLINE}
        initValue={DF_COLOR}
        onEnter={_onColor}
      />
      <InputSwitch
        style={S_INLINE_INPUT_SWITCH}
        caption="Column"
        initialValue={!0}
        onToggle={_onToggleColumn}
      />
      <div style={S_ROW_2}>
        <RowInputText
          rootStyle={S_INLINE}
          caption="For Seria"
          captionCn={CL_BLACK}
          captionStyle={S_CAPTION_STYLE}
          inputStyle={S_SERIA_INPUT}
          type="number"
          initValue={1}
          min={1}
          max={9}
          maxLength={1}
          onChange={_onChangeSeria}
          onEnter={_onPlus}
        />
        <InputSwitch
          style={S_INLINE_INPUT_SWITCH}
          caption="OnTop"
          onToggle={_onToggleTop}
        />
       </div>
    </div>
  </RowOpenClose>
  );
};

export default RowType1
