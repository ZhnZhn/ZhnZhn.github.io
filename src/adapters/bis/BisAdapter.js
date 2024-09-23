import { crAdapterType1 } from '../crAdapterType1';
import {
  fAddToConfigInfoAndDfLink,
  crXmlDocument,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';

const ITEM_URL = "https://data.bis.org/topics";

const crData = (
  str,
  option
) => {
  const xml = crXmlDocument(str)
  , series = (xml.getElementsByTagName('Series') || [])[0] || {}
  , elementCount = series.childElementCount
  , data = [];
  let i=0, _point;
  for(; i<elementCount; i++) {
    _point = series.childNodes[i]
    data.push([
      ymdToUTC(_point.getAttribute("TIME_PERIOD")),
      parseFloat(_point.getAttribute("OBS_VALUE"))
    ])
  }
  return data.sort(compareByDate);
};

const _crDfLink = (
  option
) => `${ITEM_URL}/${option.dfTopic}/BIS,${option.dfCase},1.0/${option.items[0].v}`

const BisAdapter = crAdapterType1({
  crData,
  addToConfig: fAddToConfigInfoAndDfLink("BIS", _crDfLink)
});

export default BisAdapter
