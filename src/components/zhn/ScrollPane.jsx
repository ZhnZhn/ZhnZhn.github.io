import { forwardRef } from '../uiApi';

import useTheme from '../hooks/useTheme';
import crCn from '../zhn-utils/crCn';

const TH_ID = 'SCROLL_PANE'
, CL_SCROLL = 'with-scroll';

const ScrollPane = forwardRef(({
  className,
  style,
  children
}, ref) => {
  const TS = useTheme(TH_ID)
  , _cn = crCn(`${CL_SCROLL} ${TS.CL_SCROLL}`, className);
  return (
    <div
      ref={ref}
      className={_cn}
      style={style}
    >
       {children}
    </div>
  );
});

export default ScrollPane
