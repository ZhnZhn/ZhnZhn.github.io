import { crAdapterType1 } from '../crAdapterType1';
import {
  fAddToConfigInfoAndDfLink,  
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import {
  crItemId,
  getSeriesCollection,
  getObsValue
} from './fnAdapter';

const ITEM_URL = "https://data.bis.org/topics";

const crData = (
  str,
  option
) => {
  const seriesCollection = getSeriesCollection(str)[0] || {}
  , elementCount = seriesCollection.childElementCount
  , data = [];
  let i=0, _obsElement;
  for(; i<elementCount; i++) {
    _obsElement = seriesCollection.childNodes[i]
    data.push([
      ymdToUTC(_obsElement.getAttribute("TIME_PERIOD")),
      getObsValue(_obsElement)
    ])
  }
  return data.sort(compareByDate);
};

const _crDfLink = (
  option
) => `${ITEM_URL}/${option.dfTopic}/BIS,${option.dfCase},1.0/${crItemId(option)}`

const toLineAdapter = crAdapterType1({
  crData,
  addToConfig: fAddToConfigInfoAndDfLink("BIS", _crDfLink)
});

export default toLineAdapter
