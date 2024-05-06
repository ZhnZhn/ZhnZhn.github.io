import ButtonCircle2 from '../zhn/ButtonCircle2';
import {
  CL_FOOTER,
  CL_NOT_SELECTED,
  CL_FOOTER_INDEX,
  CL_FOOTER_BTS,
  CL_FOOTER_BT
} from './CL';

const OptionsFooter = ({
  refIndexNode,
  noFooterBts,
  indexActiveOption,
  nFiltered,
  nAll,
  onClear
}) => (
  <div className={`${CL_FOOTER} ${CL_NOT_SELECTED}`}>
    <span className={CL_FOOTER_INDEX}>
      <span ref={refIndexNode}>
        {indexActiveOption}
      </span>
      <span>
         : {nFiltered}: {nAll}
      </span>
    </span>
    {!noFooterBts && <span className={CL_FOOTER_BTS}>
      <ButtonCircle2
         className={CL_FOOTER_BT}
         caption="CL"
         onClick={onClear}
      />
    </span>}
  </div>
);

export default OptionsFooter
