import {
  useRef,
  getRefValue,
  setRefValue
} from '../uiApi';

import D from '../dialogs/DialogCell';

import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';
import InputText from '../zhn/InputText';
import OpenClose from '../zhn/OpenClose';

const DF_COLOR = '#2b908f'
, OC_COLOR = 'black'
, DF_PERIOD = 1
, DF_SERIA = 1

, S_ROOT_OC = {
  paddingBottom: 4,
  marginLeft: -8,
  lineHeight: 'unset'
}
, S_OC = {
  display: 'inline-block',
  width: 'auto',
  height: 32,
  paddingTop: 4,
  paddingRight: 8
}
, S_CAPTION = { color: OC_COLOR }
, S_PERIOD_INPUT = {
  width: 56,
  marginRight: 12
}
, S_CAPTION_SERIA_INPUT = {
  display: 'inline-block',
  color: 'black',
  width: 85,
  paddingLeft: 5,
  fontWeight: 'bold'
}
, S_SERIA_INPUT = { width: 36 }
, S_ROW_2 = { paddingBottom: 6 }
, S_VA_M = { verticalAlign: 'middle' }
, S_PL_6 = { paddingLeft: 6 }
, S_PL_8 = { paddingLeft: 8 }
, S_PL_10 = { paddingLeft: 10 }
, S_INLINE = { display: 'inline-block' }
, crSpanStyle = color => ({
  color,
  paddingLeft: 8,
  fontWeight: 'bold'
})
, S1_COLUMN = {
   ...S_INLINE,
   ...S_VA_M,
   ...S_PL_10
}
, S1_ON_TOP = {
   ...S_INLINE,
   ...S_VA_M,
   ...S_PL_10
};


const InputPlus = ({
  initValue,
  onChangePeriod,
  onPlus
}) => (
  <>
    <InputText
      style={S_PERIOD_INPUT}
      type="number"
      initValue={initValue}
      min={1}
      max={999}
      maxLength={3}
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
) => n => setRefValue(ref, parseInt(n, 10) || dfValue);

const RowType1 = ({
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
  , _refOnTop = useRef(false)
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
  <OpenClose
    caption={caption}
    style={S_ROOT_OC}
    ocStyle={S_OC}
    captionStyle={S_CAPTION}
    openColor={OC_COLOR}
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
      <D.RowInputColor
        style={S_INLINE}
        initValue={DF_COLOR}
        onEnter={_onColor}
      />
      <D.RowCheckBox
        caption="Column"
        style={S1_COLUMN}
        captionStyle={S_PL_6}
        checkedColor={OC_COLOR}
        initValue={true}
        onToggle={_onToggleColumn}
      />
      <div style={S_ROW_2}>
        <D.RowInputText
          rootStyle={S_INLINE}
          caption="For Seria"
          captionStyle={S_CAPTION_SERIA_INPUT}
          style={S_SERIA_INPUT}
          type="number"
          initValue={1}
          min={1}
          max={9}
          maxLength={1}
          onChange={_onChangeSeria}
          onEnter={_onPlus}
        />
        <D.RowCheckBox
          caption="OnTop"
          style={S1_ON_TOP}
          captionStyle={S_PL_6}
          checkedColor={OC_COLOR}
          initValue={false}
          onToggle={_onToggleTop}
        />
       </div>
    </div>
  </OpenClose>
  );
};


export default RowType1
