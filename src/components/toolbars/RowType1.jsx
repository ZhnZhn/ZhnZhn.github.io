
import React, { useRef } from 'react';

import D from '../dialogs/DialogCell';
import A from '../zhn/A'

const DF_COLOR = '#d2b772';
const OC_COLOR = 'black';
const DF_PERIOD = 1;

const S = {
  ROOT_OC: {
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
  ROW_CHB: {
    lineHeight: 'initial',
    paddingBottom: 4
  },
  PL_6: {
    paddingLeft: 6
  },
  PL_8: {
    paddingLeft: 8
  },
  PL_24: {
    paddingLeft: 24
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
  , _refOnTop = useRef(false)
  , _onColor = color => _refColor.current = color
  , _onChangePeriod = n => _refPeriod.current = parseInt(n, 10) || DF_PERIOD
  , _onToggleColumn = is => _refSeriaType.current = is ? 'column' : 'spline'
  , _onToggleTop = is => _refOnTop.current = is
  , _onPlus = () => onPlus({
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
        styleCaption={S.NONE}
        initValue={DF_COLOR}
        onEnter={_onColor}
      />
      <div style={S.ROW_CHB}>
        <D.RowCheckBox
          caption="Column"
          rootStyle={{ ...S.INLINE, ...S.PL_6 }}
          captionStyle={S.PL_6}
          checkedColor={OC_COLOR}
          initValue={true}
          onToggle={_onToggleColumn}
        />
        <D.RowCheckBox
          caption="OnTop"
          rootStyle={{ ...S.INLINE, ...S.PL_24 }}
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
