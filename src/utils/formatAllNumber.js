import Highcharts from 'highcharts'

const REG_BLANKS = /\s/g;
const DF_VALUE = '0';
const DELIMETER = ' ';

const formatAllNumber = function(value) {
  if (!value) { return DF_VALUE; }

  const _value = (''+value).replace(REG_BLANKS, '')
      , arrSplit = _value.split('.')
      , decimal = arrSplit[1]
          ? arrSplit[1].length
          : 0;
  return Highcharts
    .numberFormat(_value, decimal, '.', DELIMETER);
}

export default formatAllNumber
