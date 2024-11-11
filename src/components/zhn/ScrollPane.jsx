import {
  crCn,
  crWithScrollCn
} from '../styleFn';

const CL_SCROLL = crWithScrollCn();

const ScrollPane = ({
  refEl,
  className,
  style,
  children
}) => (
  <div
    ref={refEl}
    className={crCn(CL_SCROLL, className)}
    style={style}
  >
     {children}
  </div>
);

export default ScrollPane
