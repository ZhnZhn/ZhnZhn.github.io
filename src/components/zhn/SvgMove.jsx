import Svg100 from './svg/Svg100';

const CL_SVG_MOVE = 'svg-move'
, CL_SVG = `${CL_SVG_MOVE}__svg`
, CL_SVG_DOWN = `${CL_SVG} svg-down`
, CL_SVG_EQUAL = `${CL_SVG} svg-equal`
, CL_SVG_UP = `${CL_SVG} svg-up`;

const _fSpanMoveSvg = (
  className,
  pathElement
) => () => (
  <span className={CL_SVG_MOVE}>
     <Svg100 w="12" className={className}>
       {pathElement}
     </Svg100>
  </span>
);

export const SvgDown = _fSpanMoveSvg(
  CL_SVG_DOWN,
  <path d="M 0,0 L 6,4 11,0 6,12, 0,0" />
)
export const SvgEqual = _fSpanMoveSvg(
  CL_SVG_EQUAL,
  <path d="M 0,3 L 12,3 M 0,7 L 12,7" />
)
export const SvgUp = _fSpanMoveSvg(
  CL_SVG_UP,
  <path d="M 0,12 L 6,8 11,12 6,0 0,12" />
)
