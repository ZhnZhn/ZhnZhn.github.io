
import Big from 'big.js';

import ChartConfigs from '../constants/ChartConfigs';

export const fnAddSeriesSma = function(chart, period){

  const _id = 'SMA(' + period + ')'
      , dataSma = []
      , data = chart.series[0].data;

  let bSum = Big('0.0');
  for (var i=0, max=data.length; i<max; i++){
    const point = data[i];
    if (i>period){
       bSum = bSum.plus(point.y).minus(data[i-period].y);
       dataSma.push([point.x, parseFloat(bSum.div(period).toFixed(2))])
    } else {
      bSum = bSum.plus(point.y);
    }
  }

  if (dataSma.length>0){
    const config = ChartConfigs.fSeries();

    config.zhValueText = _id;
    config.lineWidth = 2;
    config.data = dataSma;

    chart.addSeries(config, true, true)

    return chart.options.colors[config['_colorIndex']];

  } else {
    console.log('It seems, there are not enough data for SMA(' + period + ')');
    return undefined;
  }
}

export const fnRemoveSeries = function(chart, zhValueText){
   const series = chart.series;
   for (var i=0, max=series.length; i<max; i++){
     if (series[i].userOptions.zhValueText === zhValueText){
       series[i].remove(true);
       return true;
     }
   }
   return false;
}
