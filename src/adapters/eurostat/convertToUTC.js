import { isNumber } from '../../utils/isTypeFn';
import { getNumberOfDays } from '../../utils/dateFn';

const _crUtcFromYm = (
  str,
  delimeter,
  monthMultiplyBy
) => {
  const arrDate = str.split(delimeter)
  , _month = parseInt(arrDate[1], 10)*monthMultiplyBy
  , _day = getNumberOfDays(arrDate[0], _month)
  return Date.UTC(arrDate[0], _month-1, _day);
}

const _isDateByMonth = (
  period
) => isNumber(parseInt(period, 10));

const _yearToUTC = (
  year
) => Date.UTC(year, 11, 31);

const convertToUTC = (str) => {
  const _period = (str && str[5]);
  if (_isDateByMonth(_period)) {
    return _crUtcFromYm(str, '-', 1);
  }
  if (_period === 'Q'){
    return _crUtcFromYm(str, '-Q', 3);
  }
  if (_period === 'S') {
    const _arrS = str.split('-S');
    return _arrS[1] === '1'
      ? Date.UTC(_arrS[0], 5, 30)
      : _yearToUTC(_arrS[0]);
  }
  return _yearToUTC(
    parseInt(str, 10) > 1970
      ? str
      : 1970
  );
}

export default convertToUTC
