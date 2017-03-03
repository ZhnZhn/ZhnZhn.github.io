
import queryString from 'query-string';
import DateUtils from '../../utils/DateUtils'

import { ModalDialog } from '../../constants/Type'

const DF_TITLE = 'Item from search, more on Info Tab';
const DF_SUFFIX_TITLE =', more on Info Tab'
const BLANK = ''
const QE = "QE";
const QE_BLSI = "QE_BLSI"
const Q = "Q"
const YEAR_MINUS = 15

const _trSearchToOptions = () => {
  const search = (window.location)
           ? window.location.search
           : null;
  const obj = queryString.parse(search);

  if (obj && obj.bT===QE && obj.cT===QE_BLSI && obj.lI==Q){
    const _title = (obj.t)
             ? obj.t + DF_SUFFIX_TITLE
             : DF_TITLE
        , _name = (obj.t)
            ? obj.t
            : BLANK
        , _fromDate = (obj.fD)
             ? obj.fD
             : DateUtils.getFromDate(YEAR_MINUS);
    return {
      browserType: obj.bT,
      chartType: obj.cT,
      fromDate: _fromDate,
      toDate: DateUtils.getToDate(),
      loadId: obj.lI,
      key: obj.id,
      value: obj.id,
      title: _title,
      name: _name
    };
  } else {
    return undefined;
  }
}

const LocationSearch = {
  load : (componentActions) => {
    const options = _trSearchToOptions();

    if (options) {
      componentActions.showModalDialog(ModalDialog.ASK, { options })
    }
  }
}

export default LocationSearch
