import { isNumber } from "../../utils/isTypeFn";

import { fCrValue } from '../AdapterFn';
import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import { crCategoryTitle } from './fnAdapter';

const _crData = (
  json,
  option
) => {
  option.subtitle = crCategoryTitle(option.subtitle, json)
  const _crValue = fCrValue(option);
  return sortDescCategory(json.data.reduce((_data, item) => {
    const { Value, Area } = item || {}
    , _value = _crValue(parseFloat(Value));
    if (isNumber(_value) && _value !== 0 && Area) {
      _data.push(crCategoryPoint(
        _value,
        Area
      ))
    }
    return _data;
 }, []));
};

const toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
