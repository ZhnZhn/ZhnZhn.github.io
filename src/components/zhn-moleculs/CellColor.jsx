import React from 'react'
import useKeyEnter from '../hooks/useKeyEnter'
//import PropTypes from 'prop-types'

const CL_INPUT_COLOR = 'input-color';

const _crClassName = className => className
  ? className + ' ' + CL_INPUT_COLOR
  : CL_INPUT_COLOR;

const CellColor = React.forwardRef(({
  className,
  style,
  color,
  onClick,
  children
}, ref) => {
  const _className = _crClassName(className)
   , _styleColor = color
      ? { backgroundColor: color }
      : void 0
  , _onClick = onClick
     ? (event) => onClick(color, event)
     : void 0
  , _onKeyEnter = useKeyEnter(_onClick, [_onClick])
  return (
    <span
       ref={ref}
       tabIndex="0"
       role="button"
       className={_className}
       style={{...style, ..._styleColor}}
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
