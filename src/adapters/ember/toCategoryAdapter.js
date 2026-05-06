import crAdapterCategory from '../crAdapterCategory';
import { crTsCategoryData } from '../toTsCategoryAdapter';

const _crData = (
  json,
  options
) => crTsCategoryData(json, options)
, toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
