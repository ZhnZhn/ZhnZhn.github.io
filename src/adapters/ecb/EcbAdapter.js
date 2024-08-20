import {
  fCrConfOptionExchangeRate,
  crAdapterType1
} from '../crAdapterType1';
import {
  isNumber,
  getObjectKeys,
  ymdToUTC,
  addToConfigInfo,
  addToConfigDfLink,
  joinBy
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import {
  ECB_EUROPA_EU,
  crItemId,
  getSeriesObservertions,
  getObservationValues
} from './fnAdapter';

const ITEM_URL = `https://data.${ECB_EUROPA_EU}/data/datasets`

const crData = (
  json,
  option
) => {
  const _observations = getSeriesObservertions(json)
  , _values = getObservationValues(json);
  return getObjectKeys(_observations)
    .reduce((data, prName) => {
       const _dateMls = ymdToUTC((_values[prName] || {}).id)
       , _value = (_observations[prName] || [])[0];
       if (isNumber(_dateMls) && isNumber(_value)) {
         data.push([_dateMls, _value])
       }
       return data;
    }, []).sort(compareByDate);
};

const addToConfig = (
  config,
  json,
  option
) => {
  addToConfigInfo(config, option)
  addToConfigDfLink(config,
    "ECB Data Portal",
    `${ITEM_URL}/${option.dfR}/${option.dfR}.${crItemId(option)}`
  )
  return config;
}

const trOption = option => {
  const {
    dfSubt
  } = option;
  if (dfSubt) {
    option.subtitle = joinBy(', ', option.subtitle, dfSubt)
  }
};

const EcbAdapter = crAdapterType1({
  crData,
  crConfOption: fCrConfOptionExchangeRate("EUR"),
  addToConfig,
  trOption
});

export default EcbAdapter
