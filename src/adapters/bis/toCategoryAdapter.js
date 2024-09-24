import crAdapterCategory from '../crAdapterCategory';
import {
  crXmlDocument,
  fCrValue
} from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';

const crData = (str, option) => {
  const xmlDoc = crXmlDocument(str)
  , seriesCollection = xmlDoc.getElementsByTagName('Series') || []
  , seriesCollectionLength = seriesCollection.length
  , data = []
  , _crValue = fCrValue(option);
  let i = 0, seriaElement;
  for(;i<seriesCollectionLength;i++){
    seriaElement = seriesCollection[i]
    const _categoryName = seriaElement.getAttribute("REF_AREA")
    , _value = parseFloat(seriaElement.childNodes[0].getAttribute("OBS_VALUE"))
    data.push(crCategoryPoint(
      _crValue(_value),
      _categoryName
    ))
  }  
  return sortDescCategory(data);
};

const toCategoryAdapter = crAdapterCategory(crData)
export default toCategoryAdapter
