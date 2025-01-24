import {
  isNumber,
  isStr
} from '../../utils/isTypeFn';

import crAdapterCategory from '../crAdapterCategory';
import { fCrValue } from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import {
  getSeriesCollection,
  fCrCategoryName,
  getObsValue
} from './fnAdapter';

const crData = (
  str,
  option
) => {
  const seriesCollection = getSeriesCollection(str)
  , data = []
  , _hmCategoryNames = {}
  , _crValue = fCrValue(option)
  , _crCategoryName = fCrCategoryName(option);
  let seriaElement, _value, _categoryName;
  for (seriaElement of seriesCollection){
    _value = _crValue(getObsValue(seriaElement.childNodes[0]))
    _categoryName = _crCategoryName(seriaElement)
    if (isNumber(_value) && isStr(_categoryName) && !_hmCategoryNames[_categoryName]) {
      data.push(crCategoryPoint(
        _value,
        _categoryName
      ))
      _hmCategoryNames[_categoryName] = !0
    }
  }
  if (!option.subtitle) {
    option.subtitle = option.dfTitle
  }
  return sortDescCategory(data);
};

const toCategoryAdapter = crAdapterCategory(crData)
export default toCategoryAdapter
