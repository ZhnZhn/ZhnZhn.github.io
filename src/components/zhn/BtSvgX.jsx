import { crBtSvgCn } from '../styleFn';

import SvgX from './svg/SvgX';

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
    <SvgX />
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
