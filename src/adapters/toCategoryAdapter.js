import { crCategoryPoint } from './CategoryFn';
import crAdapterCategory from './crAdapterCategory';

const _crData = (
  json
) => json.data
 .map(arrP => crCategoryPoint(
   arrP[1],
   arrP[0]
 ))
, toCategoryAdapter = crAdapterCategory(_crData)

export default toCategoryAdapter
