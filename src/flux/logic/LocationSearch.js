
import queryString from 'query-string';

import { ModalDialog } from '../../constants/Type'
import LocationQuery from './LocationQuery'

const C = {
  SM_WIKI: 'SM_WIKI',
  UN: 'UN',
  Q: 'Q'
};

/*
const QE = "QE";
const QE_BLSI = "QE_BLSI"
const Q = "Q"
*/

const _trSearchToOptions = () => {
  const search = (window.location)
           ? window.location.search
           : null;
  try {
    const obj = queryString.parse(search);

    if (obj &&
        obj.cT === C.SM_WIKI ||
        obj.bT === C.UN
    ) {
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
