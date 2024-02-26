import {
  useRef,
  getRefValue,
  setRefValue
} from '../uiApi';
import {
  CL_OPEN_CLOSE_BLACK,
  CL_CHB_BLACK,
  CL_BLACK
} from '../styleFn';

import D from '../dialogs/DialogCell';
import RowCheckBox2 from '../dialogs/rows/RowCheckBox2';

import {
  SvgMinus,
  SvgPlus
} from '../zhn/BtSvgCircle';
import InputText from '../zhn/InputText';
import OpenClose from '../zhn/OpenClose';
import {
  S_ROOT_OC,
  S_OC
} from './Row.Style'

const DF_COLOR = '#2b908f'

, DF_PERIOD = 1
, DF_SERIA = 1

, S_PERIOD_INPUT = {
  width: 56,
  marginRight: 12
}
, S_SERIA_INPUT = { width: 36 }
, S_ROW_2 = { paddingBottom: 6 }
, S_VA_M = { verticalAlign: 'middle' }
, S_PL_6 = { paddingLeft: 6 }
, S_PL_8 = { paddingLeft: 8 }
, S_PL_10 = { paddingLeft: 10 }
, S_INLINE = { display: 'inline-block' }
, S_CAPTION_STYLE = {
   display: 'inline-block',
   width: 85,
   paddingLeft: 5,
   fontWeight: 'bold'
}
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
    className={CL_OPEN_CLOSE_BLACK}
    style={S_ROOT_OC}
    ocStyle={S_OC}
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
      <RowCheckBox2
        style={S1_COLUMN}
        caption="Column"
        captionStyle={S_PL_6}
        chbCn={CL_CHB_BLACK}
        btCn={CL_BLACK}
        initialValue={true}
        onToggle={_onToggleColumn}
      />
      <div style={S_ROW_2}>
        <D.RowInputText
          rootStyle={S_INLINE}
          caption="For Seria"
          captionCn={CL_BLACK}
          captionStyle={S_CAPTION_STYLE}
          style={S_SERIA_INPUT}
          type="number"
          initValue={1}
          min={1}
          max={9}
          maxLength={1}
          onChange={_onChangeSeria}
          onEnter={_onPlus}
        />
        <RowCheckBox2
          style={S1_ON_TOP}
          caption="OnTop"
          captionStyle={S_PL_6}
          chbCn={CL_CHB_BLACK}
          btCn={CL_BLACK}
          onToggle={_onToggleTop}
        />
       </div>
    </div>
  </OpenClose>
  );
};


export default RowType1
