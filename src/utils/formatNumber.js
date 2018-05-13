import Highcharts from 'highcharts'

const formatNumber = function(value){
  if (typeof value === 'number' && value < 0.01) {
    return ''+value;
  }
  const arrSplit = (value+'').split('.')
      , decimal = (arrSplit[1]) ? 2 : 0;
  return Highcharts
    .numberFormat(value, decimal, '.', ' ');
}

export default formatNumber
