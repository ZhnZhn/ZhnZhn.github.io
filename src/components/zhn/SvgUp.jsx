import SvgMove from './SvgMove';

const CL_SVG_UP = 'svg-up';

const SvgUp = () => (
  <SvgMove className={CL_SVG_UP}>
    <path d="M 0,12 L 6,8 11,12 6,0 0,12" />
  </SvgMove>
);

export default SvgUp
