import {
  crAdapterType1
} from '../crAdapterType1';
import {
  isNumber,
  getByPropsFrom,
  getObjectKeys,
  ymdToUTC,
} from '../AdapterFn';
import {
  compareByDate
} from '../compareByFn';

const crData = (
  json,
  option
) => {
  const { data } = json || {}
  , observations = getByPropsFrom(data, "dataSets", 0, "series", "0:0:0:0", "observations") || {}
  , dates = getByPropsFrom(data, "structures", 0, "dimensions", "observation", 0, "values") || [];
   return getObjectKeys(observations)
    .reduce((_arr, valueKey) => {
      const dateMls = ymdToUTC((dates[valueKey] || {}).id)
      , value = parseFloat(observations[valueKey]);
      if (isNumber(dateMls) && isNumber(value)) {
        _arr.push([dateMls, value])
      }
      return _arr;
    }, []).sort(compareByDate);
};

const _toLineAdapter = crAdapterType1({
  crData
});

const OecdAdapter = _toLineAdapter;

export default OecdAdapter
