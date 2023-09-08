import { forwardRef } from '../uiApi';
import { crCn } from '../styleFn';

const CL_SCROLL = 'with-scroll scroll';

const ScrollPane = forwardRef(({
  className,
  style,
  children
}, ref) => (
  <div
    ref={ref}
    className={crCn(CL_SCROLL, className)}
    style={style}
  >
     {children}
  </div>
));

export default ScrollPane
