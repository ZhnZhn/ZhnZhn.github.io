import { isNumber } from "../../utils/isTypeFn";

import { ymdToUTC } from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import { crAdapterType1 } from '../crAdapterType1';

const crData = (
  json,
  option
) => {
  const { _propName } = option
  , _data = [];
  json.forEach(item => {
    const _v = parseFloat(item[_propName]);
    if (isNumber(_v)) {
      _data.push([ymdToUTC(item.date), _v])
    }
  })
  return _data
    .reverse()
    .sort(compareByDate);
};

const toChart = crAdapterType1({
  crData
});

export default toChart
