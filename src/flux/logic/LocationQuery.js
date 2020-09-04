import DOMPurify from 'dompurify'
import DateUtils from '../../utils/DateUtils'

const _renamePropName = ({
  bT, cT, v, cN, fD, tD
}) => {
  const _v = DOMPurify.sanitize(v);
  return {
    title: _v,
    key: _v,
    value: _v,
    browserType: bT,
    chartType: cT,
    columnName: cN,
    fromDate: fD,
    toDate: tD || DateUtils.getToDate()
  };
}

const _crOptions = (obj) => Object
  .assign(_renamePropName(obj), obj);

const LocationQuery = {
  toOptions: _crOptions
}

export default LocationQuery
