import Svg from './svg/Svg';

const CL_BT_SVG_CIRCLE = "bt-svg-circle";

const BtSvgCircle = ({
  style,
  onClick,
  children
}) => (
  <button
    className={CL_BT_SVG_CIRCLE}
    style={style}
    onClick={onClick}
    >
     <Svg
       w="20"
       strokeWidth="2"
       strokeLinecap="round"
     >
       {children}
     </Svg>
  </button>
);

export default BtSvgCircle
