import DOMPurify from 'dompurify'
import DateUtils from '../../utils/DateUtils'

const _toOptions = params => {
  const _options = Object.create(null);
  params.forEach((value, key) => {
    _options[key] = DOMPurify.sanitize(value)
  })
  return _options;
};

const crOptions = (params) => {
  const _options = _toOptions(params)
  , { v, bT, cT, cN, fD, tD } = _options;
  return {
    ..._options,
    title: v,
    key: v,
    value: v,
    browserType: bT,
    chartType: cT,
    columnName: cN,
    fromDate: fD,
    toDate: tD || DateUtils.getToDate()
  };
};

const LocationQuery = { crOptions };

export default LocationQuery
