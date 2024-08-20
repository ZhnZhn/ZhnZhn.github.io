import {
  ymdToUTC,
  assign,
  joinBy,
  crInfoWithName
} from '../AdapterFn';
import {
  fCrDataType1,
  fCrConfOptionExchangeRate,
  crAdapterType1
} from '../crAdapterType1';
import {
  DATA_SNB_URL,
  getTimeSeriesValues
 } from './fnAdapter';

const ITEM_URL = `${DATA_SNB_URL}/en/topics`;
const DF_SUB_ID = "uvo";

const _fCrItemTuple = () => item => [
  ymdToUTC(item.date),
  item.value
]
, crData = fCrDataType1(getTimeSeriesValues, _fCrItemTuple)
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
  config.info = crInfoWithName(option)
  assign(config.zhConfig, {
    linkFn: option.loadId,
    item: `${ITEM_URL}/${option.dfSubId || DF_SUB_ID}/cube/${option.dfId}`
  })
  return config;
}

const SnbAdapter = crAdapterType1({
  crData,
  trOption,
  addToConfig,
  crConfOption: fCrConfOptionExchangeRate("CHF")
});

export default SnbAdapter
