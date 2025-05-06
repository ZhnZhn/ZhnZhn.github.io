import Button from '../zhn/Button';
import {
  CL_FOOTER,
  CL_FOOTER_INDEX,
  CL_FOOTER_BTS,
  CL_FOOTER_BT
} from './CL';

const OptionsFooter = (props) => (
  <div className={CL_FOOTER}>
    <span className={CL_FOOTER_INDEX}>
      <span ref={props.refIndexNode}>
        {props.indexActiveOption}
      </span>
      <span>
         : {props.nFiltered}: {props.nAll}
      </span>
    </span>
    {!props.noFooterBts && <span className={CL_FOOTER_BTS}>
      <Button
         className={CL_FOOTER_BT}
         onClick={props.onClear}
      >CL</Button>
    </span>}
  </div>
);

export default OptionsFooter
