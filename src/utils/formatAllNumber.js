import Highcharts from 'highcharts';

const REG_BLANKS = /\s/g
, DF_VALUE = '0'
, DELIMETER = ' ';

const _calcDecimal = (strNumber) => {
  const arrSplit = strNumber.split('.');
  return arrSplit[1]
    ? arrSplit[1].length
    : 0;
};

const formatAllNumber = function(value) {
  if (!value) { return DF_VALUE; }
  if (value<1000 && value>-1000) { return ''+value; }

  const _value = (''+value).replace(REG_BLANKS, '')
  , decimal = _calcDecimal(_value);

  return Highcharts
    .numberFormat(_value, decimal, '.', DELIMETER);
};

export default formatAllNumber
