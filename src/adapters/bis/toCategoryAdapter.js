import crAdapterCategory from '../crAdapterCategory';
import { fCrValue } from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import {
  getSeriesCollection,
  getObsValue
} from './fnAdapter';

const crData = (str, option) => {
  const seriesCollection = getSeriesCollection(str)
  , seriesCollectionLength = seriesCollection.length
  , data = []
  , _crValue = fCrValue(option);
  let i = 0, seriaElement;
  for(;i<seriesCollectionLength;i++){
    seriaElement = seriesCollection[i]
    const _categoryName = seriaElement.getAttribute("REF_AREA")
    , _value = getObsValue(seriaElement.childNodes[0]);
    data.push(crCategoryPoint(
      _crValue(_value),
      _categoryName
    ))
  }
  return sortDescCategory(data);
};

const toCategoryAdapter = crAdapterCategory(crData)
export default toCategoryAdapter
