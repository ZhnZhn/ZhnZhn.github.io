import Highcharts from 'highcharts'

const formatAllNumber = function(value) {
  const arrSplit = (''+value).split('.')
      , decimal = arrSplit[1]
          ? arrSplit[1].length
          : 0;
  return Highcharts
    .numberFormat(value, decimal, '.', ' ');
}

export default formatAllNumber
