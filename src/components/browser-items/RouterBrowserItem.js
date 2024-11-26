import { crGetRoute } from '../../utils/crRouter';

import Item from './Item';
import ItemWithCap from './ItemWithCap';
import ItemLse from './ItemLse';

export const getBrowserItemComp = crGetRoute({
  Item,
  ItemWithCap,
  ItemLse
})
