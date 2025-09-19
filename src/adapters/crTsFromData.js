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
  const _fromYear = parseIntBy10(json.fromYear);
  if (isNumber(_fromYear)) {
    return _crTsFromYearData(_fromYear, data);
  }
  const _dmy = json.from;
  if (isDmy(_dmy)) {
    return _crTsFromMonthData(_dmy, data);
  }
  return [];
};

export default crTsFromData
