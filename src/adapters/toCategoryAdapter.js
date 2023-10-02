import { fCrValue } from './AdapterFn';

import { crCategoryPoint } from './CategoryFn';
import crAdapterCategory from './crAdapterCategory';

const _crData = (
  json,
  option
) => {
  const _crValue = fCrValue(option);
  return json.data
   .map(arrP => crCategoryPoint(
     _crValue(arrP[1]),
     arrP[0]
   ));
}
, toCategoryAdapter = crAdapterCategory(_crData)

export default toCategoryAdapter
