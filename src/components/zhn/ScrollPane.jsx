import { useContext } from 'react';

import ThemeContext from '../hoc/ThemeContext'

const TH_ID = 'SCROLL_PANE'
const CL = 'with-scroll';

const ScrollPane = ({
  innerRef,
  className='',
  style,
  children
}) => {
  const theme = useContext(ThemeContext)
  , TS = theme.getStyle(TH_ID)
  , _cl = `${CL} ${TS.CL_SCROLL} ${className}`;
  return (
    <div
      ref={innerRef}
      className={_cl}
      style={style}
    >
       {children}
    </div>
  );
}

export default ScrollPane
