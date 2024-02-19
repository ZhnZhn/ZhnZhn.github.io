import { crAdapterRouter } from '../crAdapterRouter';
import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';
import crToTreeMapAdapter from './crToTreeMapAdapter';

import {
  isTreeMap,
  isCategory
} from './fnAdapter';

const getRoute = (
  option
) => {
  const _seriaType = option.seriaType;
  return isTreeMap(_seriaType)
    ? crToTreeMapAdapter(option)
    : isCategory(_seriaType)
       ? toCategoryAdapter
       : toLineAdapter;
};

const EmberAdapter = crAdapterRouter(void 0, { getRoute })

export default EmberAdapter
