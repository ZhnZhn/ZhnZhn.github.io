import SvgMove from './SvgMove';

const CL_SVG_DOWN = 'svg-down';

const SvgDown = () => (
  <SvgMove className={CL_SVG_DOWN}>
    <path d="M 0,0 L 6,4 11,0 6,12, 0,0" />
  </SvgMove>
);

export default SvgDown
