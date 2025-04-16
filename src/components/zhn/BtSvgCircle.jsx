import { crAriaLabelProp } from '../a11yFn';
import { crBtSvgCn } from '../styleFn';

import Button from './Button';
import {
  Svg,
  STROKE_LINECAP_ROUND_PROPS
} from './svg/Svg';

const CL_BT_SVG_CIRCLE = crBtSvgCn("circle")
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
       {...STROKE_LINECAP_ROUND_PROPS}       
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
