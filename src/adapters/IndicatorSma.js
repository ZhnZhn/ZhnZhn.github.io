
import tsIndicators from '../math/tsIndicators'

import ChartConfig from '../charts/ChartConfig';

const { sma, mfi, momAth } = tsIndicators;

const _addDataAsSeriaToChart = (chart, option) => {
  const seria = Object.assign(
    ChartConfig.fSeries(), option
  );
  chart.addSeries(seria, true, true)
  return chart.options.colors[seria['_colorIndex']];
};

export const fnAddSeriesSma = function(option){
  const { chart, id, period, plus } = option
      , parentId = chart.options.zhConfig.id
      , data = chart.series[0].data
      , dataSma = sma(data, period, plus);

  if (dataSma.length>0){
    return _addDataAsSeriaToChart(chart, {
      zhSeriaId: parentId + '_' + id,
      zhValueText: id,
      lineWidth: 2,
      data: dataSma
    });
  } else {
    console.log('It seems, there are not enough data for SMA(' + period + ')')
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

export const fnGetConfigMfi = function(chart, period, id){
  const data = chart.options.zhPoints
       , parentId = chart.options.zhConfig.id
       , { dataMfi, nNotFullPoint } = mfi(data, period)
       , titleNotFullPoint = (nNotFullPoint !== 0)
           ? ' Not Full Data HL:' + nNotFullPoint
           : '';
   return ChartConfig.fIndicatorMfiConfig(
       id, parentId, id + titleNotFullPoint, dataMfi
   );
};

export const fnMomAthConfig = function(chart, id) {
  const data = chart.options.zhPoints
      , { dataMom, dataAth, dataSum } = momAth(data);
  return ChartConfig.fnMomAthConfig(
     dataMom, dataAth, dataSum, id
  );
};
