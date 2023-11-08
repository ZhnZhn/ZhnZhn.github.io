import Button from './Button';
import SvgX from './svg/SvgX';

const _fBtSvgX = className => ({
  style,
  onClick
}) => (
  <Button
    tabIndex="-1"
    className={className}
    style={style}
    onClick={onClick}
  >
    <SvgX />
  </Button>
);

const BT_SVG = "bt-svg"
, CL_BT_SVG_CLEAR = `${BT_SVG}-clear`
, CL_BT_SVG_CLOSE = `${BT_SVG}-close`;
export const BtSvgClear = _fBtSvgX(CL_BT_SVG_CLEAR)
export const BtSvgClose = _fBtSvgX(CL_BT_SVG_CLOSE)
