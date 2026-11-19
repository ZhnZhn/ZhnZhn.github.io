import { IfTrue } from '../uiApi';

import Button from '../zhn/Button';
import { SvgX } from '../zhn/BtSvgX';

import {
  CL_FOOTER,
  CL_FOOTER_INDEX,
  CL_FOOTER_BTS,
  COLOR_OPTIONS_OPEN
} from './CL';

const S_BT_X = {
  backgroundColor: '#e1e1cb',
  height: '32px',
  padding: '6px',
  stroke: COLOR_OPTIONS_OPEN,
  borderRadius: '50%'
};

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
    <IfTrue v={!props.noFooterBts}>
    <span className={CL_FOOTER_BTS}>
      <Button
        aria-label="Clear input and close options"
        style={S_BT_X}
        onClick={props.onClear}
      >
        <SvgX />
      </Button>
    </span>
    </IfTrue>
  </div>
);

export default OptionsFooter
