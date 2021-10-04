import { forwardRef } from 'react';

const CL_BT_MORE = 'bt-more';

const SvgMore = forwardRef(({
  style,
  svgStyle,
  onClick
}, ref) => (
  <button
    ref={ref}
    className={CL_BT_MORE}
    style={style}
    onClick={onClick}
  >
    <svg
      style={svgStyle}
      width="6px" height="22px"
      viewBox="0 0 6 22"
      preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="4" r="2" />
      <circle cx="3" cy="11" r="2" />
      <circle cx="3" cy="18" r="2" />
    </svg>
  </button>
));


export default SvgMore
