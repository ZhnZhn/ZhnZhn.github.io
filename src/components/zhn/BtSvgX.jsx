import { crAriaLabelProp } from '../a11yFn';
import { crBtSvgCn } from '../styleFn';

import Button from './Button';
import SvgX from './svg/SvgX';

const _fBtSvgX = (
  className,
  dfAriaLabel
) => (props) => (
  <Button
    {...crAriaLabelProp(props, dfAriaLabel)}
    tabIndex="-1"
    className={className}
    style={props.style}
    onClick={props.onClick}
  >
    <SvgX />
  </Button>
);

export const BtSvgClear = _fBtSvgX(
  crBtSvgCn("clear"),
  "Clear input"
)
export const BtSvgClose = _fBtSvgX(
  crBtSvgCn("close"),
  "Close"
)
