
import queryString from 'query-string';

import CA from '../actions/ComponentActions'
import LocationQuery from './LocationQuery'

const ARR_B = [ 'UN', 'QE', 'FAO' ];
const ARR_C = [
  'SM_WIKI',
  'SM_IEX_CHART_5Y','SM_IEX_CHART_2Y',
  'USAE_BLS_1',
  'BC_HD'
];

const _isQuery = (obj) => obj &&
    ARR_C.indexOf(obj.cT) !== -1 ||
    ARR_B.indexOf(obj.bT) !== -1;

const _trSearchToOptions = () => {
  try {
    const search = window.location
      ? window.location.search
      : null
    , obj = queryString.parse(search);
    return _isQuery(obj)
      ? LocationQuery.toOptions(obj)
      : undefined;
  } catch(err) {
    return undefined;
  }
};

const LocationSearch = {
  load: () => {
    const options = _trSearchToOptions();
    if (options) {
      CA.showAsk({ options })
    }
  }
}

export default LocationSearch
