import {
  isArr,
  isNumber,
  parseIntBy10
} from '../utils/isTypeFn';

import {
  ymdToUTC,
  isDmy,
  dmyToUTC,
  getNextMonthDmy,
} from '../utils/dateFn';

const _crTsFromYearData = (
  fromYear,
  data
) => data
.reduce((arr, v, index) => {
  const _mls = ymdToUTC(fromYear + index);
  arr.push([_mls, v])
  return arr;
}, []);

const _crTsFromMonthData = (
  dmy,
  data
) => data
.reduce((arr, value) => {
  arr.push([dmyToUTC(dmy), value])
  dmy = getNextMonthDmy(dmy)
  return arr;
}, []);

const crTsFromData = (
  json,
  option
) => {
  const data = json.data;
  if (!isArr(data)) {
    return [];
  }

  const _fromYear = parseIntBy10(json.fromYear)
  , _from = json.from
  , _tsFromYear = isNumber(_fromYear)
      ? _fromYear
      : isNumber(_from)
      ? _from
      : !1;
  if (isNumber(_tsFromYear)) {
    return _crTsFromYearData(_tsFromYear, data);
  }

  if (isDmy(_from)) {
    return _crTsFromMonthData(_from, data);
  }
  return [];
};

export default crTsFromData
