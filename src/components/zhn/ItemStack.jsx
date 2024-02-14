import { safeMap, memo } from '../uiApi';

const ItemStack = memo(({
  items,
  crItem,
  ...restProps
}) => safeMap(
  items,
  (item, index) => crItem(item, index, restProps)
))

export default ItemStack
