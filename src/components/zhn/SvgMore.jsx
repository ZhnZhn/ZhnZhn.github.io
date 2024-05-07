import Svg from './svg/Svg';

const CL_BT_MORE = 'bt-more';

const SvgMore = ({
  refEl,
  style,
  svgStyle,
  onClick
}) => (
  <button
    type="button"
    ref={refEl}
    className={CL_BT_MORE}
    style={style}
    onClick={onClick}
  >
    <Svg w="6" h="22" style={svgStyle} >
      <circle cx="3" cy="4" r="2" />
      <circle cx="3" cy="11" r="2" />
      <circle cx="3" cy="18" r="2" />
    </Svg>
  </button>
);

export default SvgMore
