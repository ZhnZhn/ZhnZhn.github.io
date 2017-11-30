
import DateUtils from '../../utils/DateUtils'

const HM_S = {
  browserType: 'bT',
  chartType: 'cT',
  value: 'v',

  columnName: 'cN',
  fromDate: 'fD',
  toDate: 'tD',
  key: 'k'
};

const _keyToValue = (hm) => {
  const r = {}
  let propName;
  for (propName in hm) {
    r[hm[propName]] = propName
  }
  return r;
}

const HM_R = _keyToValue(HM_S)


const LocationQuery = {
  toOptions: (obj) => {
    const options = {};
    let pN;
    for (pN in obj) {
      const propName = HM_R[pN]
      if (propName) {
        options[propName] = obj[pN]
      }
    }
    Object.assign(options, obj)

    options.toDate = options.toDate
      || DateUtils.getToDate()
    options.fromDate = options.fromDate
      || DateUtils.getFromDate(options.iFD)
    options.title = options.title
      || options.value
    options.key = options.key
      || options.value

    return options;
  }
}

export default LocationQuery
