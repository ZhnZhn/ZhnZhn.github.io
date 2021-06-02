import { memo } from 'react';

const _isArr = Array.isArray;

const ItemStack = memo(({ items, crItem }) => {
  if (!_isArr(items)) return null;
  return items.map(crItem);
});

export default ItemStack
