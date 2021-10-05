
import Svg100 from './svg/Svg100';

const CL_MOVE = 'svg-move'
, CL_SVG = 'svg-move__svg';

const SvgMove = ({
  className,
  children
}) => (
   <span className={CL_MOVE}>
     <Svg100 w="12" className={`${CL_SVG} ${className}`}>
       {children}
     </Svg100>
   </span>
);

export default SvgMove
