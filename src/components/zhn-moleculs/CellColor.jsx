import { forwardRef } from 'react';

import useKeyEnter from '../hooks/useKeyEnter';
import crCn from '../zhn-utils/crCn';
//import PropTypes from 'prop-types'

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
     ? (event) => onClick(color, event)
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

/*
CellColor.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func
}
*/

export default CellColor
