import { Svg } from './svg/Svg';

const CL_BT_MORE = 'bt-more';

const SvgMore = (props) => (
  <button
    type="button"
    ref={props.refEl}
    className={CL_BT_MORE}
    style={props.style}
    onClick={props.onClick}
  >
    <Svg w="6" h="22" style={props.svgStyle} >
      <circle cx="3" cy="4" r="2" />
      <circle cx="3" cy="11" r="2" />
      <circle cx="3" cy="18" r="2" />
    </Svg>
  </button>
);

export default SvgMore
