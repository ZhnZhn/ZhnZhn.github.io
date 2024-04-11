import { crAdapterRouter } from '../crAdapterRouter';
import { isCategory } from '../CategoryFn';

import crAdapterType1 from '../crAdapterType1';
import {
  crData,
  crConfOption
} from './fnAdapter';

import toCategoryAdapter from './toCategoryAdapter';

const toLineAdapter = crAdapterType1({
   crData,
   crConfOption
});

const getRoute = (
  option
) => isCategory(option.seriaType)
 ? toCategoryAdapter
 : toLineAdapter;

const adapter = crAdapterRouter(
  void 0,
  { getRoute }
);

export default adapter
