
import DateUtils from '../../utils/DateUtils'

const _renamePropName = (obj) => {
  const {
         bT, cT, v,
         cN, fD, tD
        } = obj;
  return {
    browserType: bT,
    chartType: cT,
    value: v,
    columnName: cN,
    fromDate: fD,
    toDate: tD
  };
}

const _crOptions = (obj) => {
  const options = _renamePropName(obj);
  const { toDate, value } = options;
  return Object.assign({}, options, obj, {
    toDate: toDate || DateUtils.getToDate(),
    title: value,
    key: value
  });
};

const LocationQuery = {
  toOptions: (obj) => {
    const options = _crOptions(obj);
    return options;
  }
}

export default LocationQuery
