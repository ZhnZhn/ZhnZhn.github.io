import Button from './Button';
import SvgX from './svg/SvgX';

const BtSvgX = ({
   className,
   style,
   onClick
 }) => (
   <Button
     tabIndex="-1"
     className={className}
     style={style}
     onClick={onClick}
   >
     <SvgX />
   </Button>
);

export default BtSvgX
