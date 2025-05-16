import {
  isNumber,
  parseIntBy10
} from '../utils/isTypeFn';

import {
  ymdToUTC
} from './AdapterFn';

const FN_TRUE = () => true;

const crFromYearData = (
  json,
  option
) => {
  const _fromYear = parseIntBy10(json.fromYear)
  , _fromDateUTC = ymdToUTC(option.fromDate)
  , _isPoint = isNumber(_fromDateUTC)
     ? mls => mls > _fromDateUTC
     : FN_TRUE;
  return isNumber(_fromYear)
    ? json.data.reduce((arr, v, index) => {
        const _mls = ymdToUTC(_fromYear + index);
        if (_isPoint(_mls)) {
          arr.push([_mls, v])
        }
        return arr;
      }, [])
   : [];
}

export default crFromYearData
