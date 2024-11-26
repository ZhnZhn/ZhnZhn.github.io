import { crGetRoute } from '../../utils/crRouter';

import ItemOption from './ItemOption';
import ItemTopicOption from './ItemTopicOption';

export const getItemOptionComp = crGetRoute({
  DF: ItemOption,
  ItemOption,
  ItemTopicOption
})
