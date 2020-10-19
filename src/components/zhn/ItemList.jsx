import { memo } from 'react'

const ItemList = memo(({ items, pnId='id', Item }) => (
  <>
    {items.map(item => (
      <Item key={item[pnId]} item={item} />
    ))}
  </>
));

export default ItemList
