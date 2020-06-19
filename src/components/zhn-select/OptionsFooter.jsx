import React from 'react'

import BtCircle2 from '../zhn/ButtonCircle2';
import CL from './CL';

const S = {
  BT_CIRCLE: {
    backgroundColor: '#949ab4'
  }
};

const OptionsFooter = React.forwardRef(({
  indexActiveOption,
  nFiltered, nAll,
  onStepDown,
  onStepUp,
  onClear
}, ref) => (
  <div className={`${CL.FOOTER} ${CL.NOT_SELECTED}`}>
    <span className={CL.FOOTER_INDEX}>
      <span ref={ref}>
        {indexActiveOption}
      </span>
      <span>
         : {nFiltered}: {nAll}
      </span>
    </span>
    <span className={CL.FOOTER_BTS}>
      <BtCircle2
         className={CL.FOOTER_MARGIN}
         style={S.BT_CIRCLE}
         caption="Dn"
         onClick={onStepDown}
      />
      <BtCircle2
         className={CL.FOOTER_MARGIN}
         style={S.BT_CIRCLE}
         caption="Up"
         onClick={onStepUp}
      />
      <BtCircle2
         style={S.BT_CIRCLE}
         caption="CL"
         onClick={onClear}
      />
    </span>
  </div>
));

export default OptionsFooter
