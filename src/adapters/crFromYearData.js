import {
  isNumber,
  ymdToUTC
} from './AdapterFn';

const crFromYearData = (
  json,
  option
) => {
  const {
    fromYear,
    data
  } = json
  , _fromYear = parseInt(fromYear, 10);
  return isNumber(_fromYear)
    ? data.map((v, index) => [
        ymdToUTC((_fromYear + index)+''),
        v
     ])
   : [];
}

export default crFromYearData
