import { crAriaLabelProp } from '../a11yFn';

import Button from './Button';
import Svg from './svg/Svg';

const CL_BT_SVG_CIRCLE = "bt-svg-circle"
, _fBtCircleSvg = (
  pathElement,
  dfAriaLabel
) => (props) => (
  <Button
    {...crAriaLabelProp(props, dfAriaLabel)}
    className={CL_BT_SVG_CIRCLE}
    style={props.style}
    onClick={props.onClick}
  >
     <Svg
       w="20"
       strokeWidth="2"
       strokeLinecap="round"
     >
       {pathElement}
     </Svg>
  </Button>
);

export const SvgMinus = _fBtCircleSvg(
  <path d="M 4,10 L 16,10" />,
  "Subtract"
)
export const SvgPlus = _fBtCircleSvg(
  <path d="M 10,4 L 10,16 M 4,10 L 16,10" />,
  "Add"
)
