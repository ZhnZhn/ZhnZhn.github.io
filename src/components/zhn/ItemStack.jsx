import { memo } from '../uiApi';

const _isArr = Array.isArray;

const ItemStack = memo(({
  items,
  crItem,
  ...restProps
}) => _isArr(items)
  ? items.map(
      (item, index) => crItem(item, index, restProps)
    )
  : null
);

export default ItemStack
