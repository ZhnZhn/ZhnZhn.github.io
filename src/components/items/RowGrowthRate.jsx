
import React, { useRef } from 'react';

import D from '../dialogs/DialogCell';
import OpenClose from '../zhn/OpenClose';
import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';

const INITIAL_COLOR = '#d2b772';

const S = {
  OC: {
    width: 'auto',
    paddingRight: 8
  },
  CAPTION: {
    color: 'black'
  },
  PL_8: {
    paddingLeft: 8
  },
  PL_24: {
    paddingLeft: 24
  },
  TEXT: {
    color: 'grey',
    fontWeight: 'bold'
  },
  OPTIONS: {
    paddingLeft: 6
  },
  INLINE: {
    display: 'inline-block'
  },
  NONE: {
    display: 'none'
  }
};

const RowGrowthRate = ({
  is,
  onMinus,
  onPlus,
}) => {
  const _refColor = useRef(INITIAL_COLOR)
  , _refSeriaType = useRef('column')
  , _refOnTop = useRef(false)
  , _onColor = color => _refColor.current = color
  , _onCheckColumn = () => _refSeriaType.current = 'column'
  , _onUnCheckColumn = () => _refSeriaType.current = 'spline'
  , _onCheckTop = () => _refOnTop.current = true
  , _onUnCheckTop = () => _refOnTop.current = false
  , _onPlus = () => onPlus({
      color: _refColor.current,
      type: _refSeriaType.current,
      zIndex: _refOnTop.current ? undefined : -1
    });

  return (
  <OpenClose
    isClose={true}
    ocStyle={S.OC}
    caption="Growth Rate"
    captionStyle={S.CAPTION}
    openColor="black"
    CompAfter={
       is ? <SvgMinus style={S.INLINE} onClick={onMinus} />
          : <SvgPlus style={S.INLINE} onClick={_onPlus} />}
  >
    <div style={S.OPTIONS}>
      <D.RowInputColor
        styleCaption={S.NONE}
        initValue={INITIAL_COLOR}
        onEnter={_onColor}
      />
      <div>
        <D.RowCheckBox
          caption="Column"
          rootStyle={{ ...S.INLINE, ...S.PL_8 }}
          initValue={true}
          onCheck={_onCheckColumn}
          onUnCheck={_onUnCheckColumn}
        />
        <D.RowCheckBox
          caption="OnTop"
          rootStyle={{ ...S.INLINE, ...S.PL_24 }}
          initValue={false}
          onCheck={_onCheckTop}
          onUnCheck={_onUnCheckTop}
        />
      </div>
      <span style={S.TEXT}>
        Def: 100*(&Delta;y<sub>t1-t0</sub>/y<sub>t0</sub>)
      </span>
    </div>
  </OpenClose>
  );
}

export default RowGrowthRate
