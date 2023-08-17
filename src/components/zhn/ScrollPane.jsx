import { forwardRef } from '../uiApi';
import { crCn } from '../styleFn';

import useTheme from '../hooks/useTheme';

const TH_ID = 'SCROLL_PANE'
, CL_SCROLL = 'with-scroll';

const ScrollPane = forwardRef(({
  className,
  style,
  children
}, ref) => {
  const TS = useTheme(TH_ID);
  return (
    <div
      ref={ref}
      className={crCn(
        `${CL_SCROLL} ${TS.CL_SCROLL}`,
        className
      )}
      style={style}
    >
       {children}
    </div>
  );
});

export default ScrollPane
