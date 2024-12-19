import crAdapterCategory from "../crAdapterCategory";
import { crCategoryPoint } from "../CategoryFn";
import { sortDescCategory } from "../compareByFn";

import { getData } from "./NdlFn";

const _crData = (
  json,
  options
) => {  
  const data = [];
  getData(json, options).forEach(([category, value]) => {
    if (value > 0){
      data.push(crCategoryPoint(value, category))
    }
  })
  return sortDescCategory(data);
};

export const toCategoryAdapter = crAdapterCategory(_crData)
