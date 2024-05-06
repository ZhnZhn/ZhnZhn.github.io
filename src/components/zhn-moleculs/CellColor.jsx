import { crCn } from '../styleFn';

import { useKeyEnter } from '../hooks/fUseKey';

const CL_INPUT_COLOR = 'input-color';

const CellColor = ({
  refEl,
  className,
  style,
  color,
  onClick,
  children
}) => {
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
       ref={refEl}
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
};

export default CellColor
