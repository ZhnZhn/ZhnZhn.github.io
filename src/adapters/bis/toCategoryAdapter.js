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
  , seriesCollectionLength = seriesCollection.length
  , data = []
  , _crValue = fCrValue(option)
  , _crCategoryName = fCrCategoryName(option);
  let i = 0, seriaElement;
  for(;i<seriesCollectionLength;i++){
    seriaElement = seriesCollection[i]
    data.push(crCategoryPoint(
      _crValue(getObsValue(seriaElement.childNodes[0])),
      _crCategoryName(seriaElement)
    ))
  }
  if (!option.subtitle) {
    option.subtitle = option.dfTitle
  }
  return sortDescCategory(data);
};

const toCategoryAdapter = crAdapterCategory(crData)
export default toCategoryAdapter
