import SvgX from './svg/SvgX';

const BtSvgX = ({
   className,
   style,
   onClick
 }) => (
   <button
      tabIndex="-1"
      className={className}
      style={style}
      onClick={onClick}
   >
     <SvgX />
   </button>
);

export default BtSvgX
