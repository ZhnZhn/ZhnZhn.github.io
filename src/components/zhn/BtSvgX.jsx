import { crBtSvgCn } from '../styleFn';

import {
  Svg100,
  STROKE_LINECAP_ROUND_PROPS
} from './svg/Svg';

const S_SVG_X = { padding: 3 };
const _fCrBtSvgX = (
  className,
  dfAriaLabel,
  crProps
) => (
  props
) => (
  <button
    {...crProps(props)}
    aria-label={props.ariaLabel || dfAriaLabel}
    type="button"
    tabIndex="-1"
    className={className}
    style={props.style}
    onClick={props.onClick}
  >
    <Svg100
      w="12"
      style={S_SVG_X}
      {...STROKE_LINECAP_ROUND_PROPS}
     >
       <path d="M 0,0 L 12,12" />
       <path d="M 12,0 L 0,12" />
    </Svg100>
  </button>
);

export const BtSvgClear = _fCrBtSvgX(
  crBtSvgCn("clear"),
  "Clear input",
  props => ({ref: props.refEl})
)

export const BtSvgClose = _fCrBtSvgX(
  crBtSvgCn("close"),
  "Close",
  () => {}
)
