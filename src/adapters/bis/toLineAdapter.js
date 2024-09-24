import { crAdapterType1 } from '../crAdapterType1';
import {
  fAddToConfigInfoAndDfLink,
  crXmlDocument,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import { crItemId } from './fnAdapter';

const ITEM_URL = "https://data.bis.org/topics";

const crData = (
  str,
  option
) => {
  const xml = crXmlDocument(str)
  , seriesCollection = (xml.getElementsByTagName('Series') || [])[0] || {}
  , elementCount = seriesCollection.childElementCount
  , data = [];
  let i=0, _obsElement;
  for(; i<elementCount; i++) {
    _obsElement = seriesCollection.childNodes[i]
    data.push([
      ymdToUTC(_obsElement.getAttribute("TIME_PERIOD")),
      parseFloat(_obsElement.getAttribute("OBS_VALUE"))
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
