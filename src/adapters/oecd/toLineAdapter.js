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
import {
  getJsonData,
  getDataSeries,
  getDataDimensions
} from './fnAdapter'

const crData = (
  json,
  option
) => {
  const data = getJsonData(json)
  , observations = getByPropsFrom(
      getDataSeries(data), "0:0:0:0", "observations"
    ) || {}
  , dates = getByPropsFrom(
      getDataDimensions(data), "observation", 0, "values"
    ) || [];
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

const toLineAdapter = crAdapterType1({
  crData
});

export default toLineAdapter
