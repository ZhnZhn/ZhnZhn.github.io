import Highcharts from 'highcharts'

const formatNumber = function(value){
  if (typeof value === 'number'
      && value > -0.01 && value < 0.01 ) {
    return ''+value;
  }
  const _arr = (''+value).split('.')
      , _decimal = _arr[1] ? 2 : 0;
  return Highcharts
    .numberFormat(value, _decimal, '.', ' ');
}

export default formatNumber
