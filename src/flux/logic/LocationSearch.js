
import queryString from 'query-string';

import { ModalDialog } from '../../constants/Type'
import LocationQuery from './LocationQuery'

const C = {
  SM_WIKI: 'SM_WIKI',
  UN: 'UN',
  QE: 'QE',
  Q: 'Q'
};

const _isQuery = (obj) => obj &&
    obj.cT === C.SM_WIKI ||
    obj.bT === C.UN ||
    obj.bT === C.QE;

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
