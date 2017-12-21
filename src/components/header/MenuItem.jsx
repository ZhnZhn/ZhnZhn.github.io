import React from 'react'

import MenuAriaItem from './MenuAriaItem'

const S = {
  NEW: {
    display: 'inline-block',
    float: 'right',
    color: 'black'
  }
}

const MenuItem = (props) => {
  const { CL, item, onClickDynamic, onClickQuandl } = props
  const { cn, id, title, isQuandl, isNew } = item
      , _className = cn
           ? `${CL.ROW} ${cn}`
           : CL.ITEM_DF
      , _onClick = isQuandl
           ? onClickQuandl
           : onClickDynamic.bind(null, id)
      , _el = isNew
          ? (<span style={S.NEW}>New</span>)
          : null ;
  return (
    <MenuAriaItem
      className={_className}
      onClick={_onClick}
    >
      {title}
      {_el}
    </MenuAriaItem>
  );
}

export default MenuItem
