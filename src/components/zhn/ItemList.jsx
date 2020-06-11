import React from 'react'

const ItemList = React.memo(({ items, pnId='id', Item }) => (
  <>
    {items.map(item => (
      <Item key={item[pnId]} item={item} />
    ))}
  </>
));

export default ItemList
