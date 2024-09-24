import crAdapterCategory from '../crAdapterCategory';
import { fCrValue } from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import {
  getSeriesCollection,
  getRefArea,
  getObsValue
} from './fnAdapter';

const crData = (
  str,
  option
) => {
  const seriesCollection = getSeriesCollection(str)
  , seriesCollectionLength = seriesCollection.length
  , data = []
  , _crValue = fCrValue(option);
  let i = 0, seriaElement;
  for(;i<seriesCollectionLength;i++){
    seriaElement = seriesCollection[i]
    data.push(crCategoryPoint(
      _crValue(getObsValue(seriaElement.childNodes[0])),
      getRefArea(seriaElement)
    ))
  }
  return sortDescCategory(data);
};

const toCategoryAdapter = crAdapterCategory(crData)
export default toCategoryAdapter
