import SvgMove from './SvgMove';

const CL_SVG_EQUAL = 'svg-equal';

const SvgEqual = () => (
  <SvgMove className={CL_SVG_EQUAL}>
    <path d="M 0,3 L 12,3 M 0,7 L 12,7" />
  </SvgMove>
);

export default SvgEqual
