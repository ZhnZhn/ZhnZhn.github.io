import { crAriaLabelProp } from '../a11yFn';
import { crBtSvgCn } from '../styleFn';

import {
  Svg,
  STROKE_LINECAP_ROUND_PROPS
} from './svg/Svg';

const CL_BT_SVG_CIRCLE = crBtSvgCn("circle")
, _fBtCircleSvg = (
  pathElement,
  dfAriaLabel
) => (props) => (
  <button
    {...crAriaLabelProp(props, dfAriaLabel)}
    type="button"
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
  </button>
);

export const SvgMinus = _fBtCircleSvg(
  <path d="M 4,10 L 16,10" />,
  "Subtract"
)
export const SvgPlus = _fBtCircleSvg(
  <path d="M 10,4 L 10,16 M 4,10 L 16,10" />,
  "Add"
)
