import { joinByComma } from '../../utils/arrFn';
import {
  isNumber,
  getObjectKeys,
} from '../../utils/isTypeFn';

import {
  fCrConfOptionExchangeRate,
  crAdapterType1
} from '../crAdapterType1';
import {
  ymdToUTC,
  fAddToConfigInfoAndDfLink
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

const trOption = option => {
  const {
    dfSubt
  } = option;
  if (dfSubt) {
    option.subtitle = joinByComma(option.subtitle, dfSubt)
  }
};

const _crDfLink = (
  option
) => `${ITEM_URL}/${option.dfR}/${option.dfR}.${crItemId(option)}`;

const toLineAdapter = crAdapterType1({
  crData,
  crConfOption: fCrConfOptionExchangeRate("EUR"),
  addToConfig: fAddToConfigInfoAndDfLink("ECB", _crDfLink),
  trOption
});

export default toLineAdapter
