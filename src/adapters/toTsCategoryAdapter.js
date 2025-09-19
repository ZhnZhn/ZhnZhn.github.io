import { fCrValue } from './AdapterFn';

import { crCategoryPoint } from './CategoryFn';
import crAdapterCategory from './crAdapterCategory';

export const crTsCategoryData = (
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

export const toTsCategoryAdapter = crAdapterCategory(crTsCategoryData)
