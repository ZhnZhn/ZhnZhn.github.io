import Highcharts from 'highcharts'

const _isNumber = n => typeof n === 'number'
 && (n - n === 0);

const _isNumberInRange = (v, min, max) => v > min
 && v < max;

const _crPrecision = value => {
  const _strDecimal = (''+value).split('.')[1]
  , _len = _strDecimal ? _strDecimal.length : 0;
  if (_isNumberInRange(value, -1, 1)) {
    return _len < 5 ? _len : 4;
  }
  return _isNumberInRange(value, -100000, 100000)
    ? _len < 3 ? _len : 2
    : 0;
}

const formatNumber = function(value){
  if (!_isNumber(value)) {
    return '0.00';
  }
  if (_isNumberInRange(value, -0.01, 0.01)) {
    return ''+value;
  }
  const _decimal = _crPrecision(value);
  return Highcharts
    .numberFormat(value, _decimal, '.', ' ');
};

export default formatNumber
