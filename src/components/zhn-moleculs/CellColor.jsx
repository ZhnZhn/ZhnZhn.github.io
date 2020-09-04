import React from 'react'
//import PropTypes from 'prop-types'

const CellColor = React.forwardRef(({
  style, color,
  onClick,
  children
}, ref) => {
  const _styleColor = color
     ? { backgroundColor: color }
     : void 0
  , _onClick = onClick
     ? (event) => onClick(color, event)
     : void 0;
  return (
    <span
       ref={ref}       
       style={{...style, ..._styleColor}}
       onClick={_onClick}
    >
       {children}
    </span>
  );
})

/*
CellColor.propTypes = {
  style: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func,
}
*/

export default CellColor
