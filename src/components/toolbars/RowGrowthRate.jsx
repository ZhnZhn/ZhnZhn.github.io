
import React, { useRef } from 'react';

import D from '../dialogs/DialogCell';
import A from '../zhn/A'

const INITIAL_COLOR = '#d2b772';
//const OC_COLOR = '#1b2836';
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
    color, paddingLeft: 8
  })
};

const InputPlus = ({ initValue, onChangePeriod, onPlus }) => (
  <React.Fragment>
    <A.InputText
      style={S.PERIOD_INPUT}
      type="number"
      initValue={initValue}
      min={1}
      max={999}
      maxLength={3}
      onInputChange={onChangePeriod}
      onEnter={onPlus}
    />
    <A.SvgPlus style={S.INLINE} onClick={onPlus} />
  </React.Fragment>
);
const MinusPeriod = ({ color, period, onMinus }) => (
  <React.Fragment>
    <A.SvgMinus
       style={S.INLINE}
       onClick={onMinus}
    />
    <span style={S.fnSpan(color)}>
      {period}
    </span>
  </React.Fragment>
);

const RowGrowthRate = ({
  is,
  onMinus,
  onPlus
}) => {
  const _refColor = useRef(INITIAL_COLOR)
  , _refPeriod = useRef(DF_PERIOD)
  , _refSeriaType = useRef('column')
  , _refOnTop = useRef(false)
  , _onColor = color => _refColor.current = color
  , _onChangePeriod = n => _refPeriod.current = parseInt(n, 10) || DF_PERIOD
  , _onCheckColumn = () => _refSeriaType.current = 'column'
  , _onUnCheckColumn = () => _refSeriaType.current = 'spline'
  , _onCheckTop = () => _refOnTop.current = true
  , _onUnCheckTop = () => _refOnTop.current = false
  , _onPlus = () => onPlus({
      color: _refColor.current,
      type: _refSeriaType.current,
      zIndex: _refOnTop.current ? undefined : -1
     }, _refPeriod.current);

  return (
  <A.OpenClose
    isClose={true}
    rootStyle={S.ROOT_OC}
    ocStyle={S.OC}
    caption="Growth Rate"
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
        initValue={INITIAL_COLOR}
        onEnter={_onColor}
      />
      <div>
        <D.RowCheckBox
          caption="Column"
          rootStyle={{ ...S.INLINE, ...S.PL_6 }}
          styleCaption={S.PL_6}
          checkedColor={OC_COLOR}
          initValue={true}
          onCheck={_onCheckColumn}
          onUnCheck={_onUnCheckColumn}
        />
        <D.RowCheckBox
          caption="OnTop"
          rootStyle={{ ...S.INLINE, ...S.PL_24 }}
          styleCaption={S.PL_6}
          checkedColor={OC_COLOR}
          initValue={false}
          onCheck={_onCheckTop}
          onUnCheck={_onUnCheckTop}
        />
       </div>
       <div style={S.TEXT}>
          Def: 100*(&Delta;y<sub>t1-t0</sub>/y<sub>t0</sub>)
      </div>
    </div>
  </A.OpenClose>
  );
}

export default RowGrowthRate
