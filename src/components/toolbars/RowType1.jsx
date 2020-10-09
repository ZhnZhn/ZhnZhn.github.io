
import React, { useRef } from 'react';

import D from '../dialogs/DialogCell';
import A from '../zhn/A'

const DF_COLOR = '#d2b772';
const OC_COLOR = 'black';
const DF_PERIOD = 1;
const DF_SERIA = 1;

const S = {
  ROOT_OC: {
    lineHeight: 'unset',
    paddingBottom: 4,
    marginLeft: -8
  },
  OC: {
    width: 'auto',
    paddingRight: 8
  },
  CAPTION: {
    color: OC_COLOR
  },
  PERIOD_INPUT: {
    width: 56,
    marginRight: 12
  },
  COLOR_INPUT: {
    marginBottom: 2
  },
  CAPTION_SERIA_INPUT: {
    width: 85,
    paddingLeft: 5,
    paddingRight: 5,
    color: 'black',
    fontWeight: 'bold'
  },
  SERIA_INPUT: {
    width: 36,
  },
  ROW_2: {
    paddingBottom: 6
  },
  VA_M: {
    verticalAlign: 'middle'
  },
  PL_6: {
    paddingLeft: 6
  },
  PL_8: {
    paddingLeft: 8
  },
  TEXT: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 4,
    fontWeight: 'bold'
  },
  INLINE: {
    display: 'inline-block'
  },
  NONE: {
    display: 'none'
  },
  fnSpan: color => ({
    color,
    paddingLeft: 8,
    fontWeight: 'bold'
  })
};

const S1 = {
  COLUMN: {
    ...S.INLINE,
    ...S.VA_M,
    ...S.PL_6
  },
  ON_TOP: {
    ...S.INLINE,
    ...S.VA_M,
    ...S.PL_8
  }
}

const InputPlus = ({ initValue, onChangePeriod, onPlus }) => (
  <>
    <A.InputText
      style={S.PERIOD_INPUT}
      type="number"
      initValue={initValue}
      min={1}
      max={999}
      maxLength={3}
      onChange={onChangePeriod}
      onEnter={onPlus}
    />
    <A.SvgPlus style={S.INLINE} onClick={onPlus} />
  </>
);
const MinusPeriod = ({ color, period, onMinus }) => (
  <>
    <A.SvgMinus
       style={S.INLINE}
       onClick={onMinus}
    />
    <span style={S.fnSpan(color)}>
      {period}
    </span>
  </>
);

/*
const Defenition = ({ Def }) => Def
 ? <div style={S.TEXT}>
     {Def}
   </div>
: null;
*/

const _fChangeNumber = (ref, dfValue) =>
  n => ref.current = parseInt(n, 10) || dfValue;

const RowType1 = ({
  is,
  caption,
  dfColor=DF_COLOR,
  //Def=null,
  onMinus,
  onPlus
}) => {
  const _refColor = useRef(dfColor)
  , _refPeriod = useRef(DF_PERIOD)
  , _refSeriaType = useRef('column')
  , _refSeria = useRef(DF_SERIA)
  , _refOnTop = useRef(false)
  , _onColor = color => _refColor.current = color
  , _onChangePeriod = _fChangeNumber(_refPeriod, DF_PERIOD)
  , _onToggleColumn = is => _refSeriaType.current = is ? 'column' : 'spline'
  , _onChangeSeria = _fChangeNumber(_refSeria, DF_SERIA)
  , _onToggleTop = is => _refOnTop.current = is
  , _onPlus = () => onPlus({
      s: _refSeria.current,
      color: _refColor.current,
      type: _refSeriaType.current,
      zIndex: _refOnTop.current ? void 0 : -1
     }, _refPeriod.current);

  return (
  <A.OpenClose
    caption={caption}
    style={S.ROOT_OC}
    ocStyle={S.OC}
    captionStyle={S.CAPTION}
    openColor={OC_COLOR}
    CompAfter={
      is ? <MinusPeriod
              color={_refColor.current}
              period={_refPeriod.current}
              onMinus={onMinus}
            />
         : <InputPlus
             initValue={_refPeriod.current}
             onChangePeriod={_onChangePeriod}
             onPlus={_onPlus}
           />
    }
  >
    <div style={S.PL_8}>
      <D.RowInputColor
        styleRoot={S.INLINE}
        styleCaption={S.NONE}
        styleInput={S.COLOR_INPUT}
        initValue={DF_COLOR}
        onEnter={_onColor}
      />
      <D.RowCheckBox
        caption="Column"
        rootStyle={S1.COLUMN}
        captionStyle={S.PL_6}
        checkedColor={OC_COLOR}
        initValue={true}
        onToggle={_onToggleColumn}
      />
      <div style={S.ROW_2}>
        <D.RowInputText
          rootStyle={S.INLINE}
          caption="For Seria"
          captionStyle={S.CAPTION_SERIA_INPUT}
          style={S.SERIA_INPUT}
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
          rootStyle={S1.ON_TOP}
          captionStyle={S.PL_6}
          checkedColor={OC_COLOR}
          initValue={false}
          onToggle={_onToggleTop}
        />
       </div>
       {/*<Defenition Def={Def} />*/}
    </div>
  </A.OpenClose>
  );
}


export default RowType1
