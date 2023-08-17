import { forwardRef } from '../uiApi';
import { crCn } from '../styleFn';

import useKeyEnter from '../hooks/useKeyEnter';

const CL_INPUT_COLOR = 'input-color';

const CellColor = forwardRef(({
  className,
  style,
  color,
  onClick,
  children
}, ref) => {
  const _cn = crCn(className, CL_INPUT_COLOR)
   , _bgColorStyle = color
      ? { backgroundColor: color }
      : void 0
  , _onClick = onClick
     ? evt => onClick(color, evt)
     : void 0
  , _onKeyEnter = useKeyEnter(_onClick, [_onClick]);
  return (
    <span
       ref={ref}
       tabIndex="0"
       role="button"
       className={_cn}
       style={{...style, ..._bgColorStyle}}
       onClick={_onClick}
       onKeyDown={_onKeyEnter}
    >
       {children}
    </span>
  );
})

export default CellColor
