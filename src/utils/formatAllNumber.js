import Highcharts from 'highcharts';
import { isStr } from './isTypeFn';

const REG_BLANKS = /\s/g
, STR_ZERO = '0'
, DELIMETER = ' ';

const _calcDecimal = (strNumber) => {
  const arrSplit = strNumber.split('.');
  return arrSplit[1]
    ? arrSplit[1].length
    : 0;
};

const formatAllNumber = function(value, dfValue) {
  if (value === 0) { return STR_ZERO;}
  if (!value) { return isStr(dfValue) ? dfValue : STR_ZERO; }
  if (value<1000 && value>-1000) { return ''+value; }

  const _value = (''+value).replace(REG_BLANKS, '')
  , decimal = _calcDecimal(_value);

  return Highcharts
    .numberFormat(_value, decimal, '.', DELIMETER);
};

export default formatAllNumber
