import React from 'react'

import MenuAriaItem from './MenuAriaItem'

const S = {
  ROOT: {
    position: 'relative'
  },
  ARROW: {
    position: 'absolute',
    display: 'inline-block',
    top: '0',
    right: '4px',
    fontWeight: 'bold'
  }
}

const MenuSubItem = (props) => {
  const { CL, item, onClick, onReg } = props
      , { cn, title } = item
      , _className = cn
           ? `${CL.ROW} ${cn}`
           : CL.ITEM_DF;
  return (
    <MenuAriaItem
      className={_className}
      style={S.ROOT}
      onClick={onClick}
      onReg={onReg}
    >
      {title}
      <span
        className={_className}
        style={S.ARROW}
      >
        {'>'}
      </span>
    </MenuAriaItem>
  );
}

export default MenuSubItem
