
import queryString from 'query-string';

import { ModalDialog } from '../../constants/Type'
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
  const search = (window.location)
           ? window.location.search
           : null;
  try {
    const obj = queryString.parse(search);
    if (_isQuery(obj)){
      return LocationQuery
        .toOptions(obj);
    } else {
      return undefined;
    }
  } catch(err) {
    return undefined;
  }
}

const LocationSearch = {
  load : (Action) => {
    const options = _trSearchToOptions();

    if (options) {
      Action.showModalDialog(ModalDialog.ASK, { options })
    }
  }
}

export default LocationSearch
