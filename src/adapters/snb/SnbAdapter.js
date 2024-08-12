import {
  isNumber,
  ymdToUTC,
  assign,
  joinBy
} from '../AdapterFn';
import crAdapterType1 from '../crAdapterType1';
import {
  DATA_SNB_URL,
  getTimeSeriesValues
 } from './fnAdapter';

const ITEM_URL = `${DATA_SNB_URL}/en/topics`;
const DF_SUB_ID = "uvo";

const crData = (
  json,
  option
) => getTimeSeriesValues(json)
  .reduce((data, item) => {
    const { date, value } = item || {}
    , dateMls = ymdToUTC(date);
    if (isNumber(dateMls) && isNumber(value)) {
      data.push([dateMls, value])
    }
    return data;
  }, [])
, trOption = (option) => {
    option.subtitle = joinBy(', ',
      option.subtitle,
      option.dfSubtitle
    )
}
, addToConfig = (
  config,
  json,
  option
) => {
  config.info = {
    name: joinBy(", ", option.title, option.subtitle)
  }
  assign(config.zhConfig, {
    linkFn: option.loadId,
    item: `${ITEM_URL}/${option.dfSubId || DF_SUB_ID}/cube/${option.dfId}`
  })
  return config;
}

const SnbAdapter = crAdapterType1({
  crData,
  trOption,
  addToConfig
});

export default SnbAdapter
