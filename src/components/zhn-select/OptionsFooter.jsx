import { forwardRef } from 'react';

import ButtonCircle2 from '../zhn/ButtonCircle2';
import CL from './CL';

const OptionsFooter = forwardRef(({
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
      <ButtonCircle2
         className={CL.FOOTER_BT}
         caption="Dn"
         onClick={onStepDown}
      />
      <ButtonCircle2
         className={CL.FOOTER_BT}
         caption="Up"
         onClick={onStepUp}
      />
      <ButtonCircle2
         className={CL.FOOTER_BT}
         caption="CL"
         onClick={onClear}
      />
    </span>
  </div>
));

export default OptionsFooter
