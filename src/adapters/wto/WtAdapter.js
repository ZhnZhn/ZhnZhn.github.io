import { isCategory } from '../CategoryFn';
import toLineAdapter from './toLineAdapter';
import toCategoryAdapter from './toCategoryAdapter';
import { crAdapterRouter } from '../crAdapterRouter';

const getRoute = (
  option
) => isCategory(option.seriaType)
  ? toCategoryAdapter
  : toLineAdapter;

const WtAdapter = crAdapterRouter({
  getRoute
})

export default WtAdapter
