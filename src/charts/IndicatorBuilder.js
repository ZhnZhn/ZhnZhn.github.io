import tsIndicators from '../math/tsIndicators'

import ChartConfig from './ChartConfig';

const { sma, mfi, momAth } = tsIndicators;
const {
  crMfiConfig,
  crMomAthConfig
} = ChartConfig;

const _addDataAsSeriaToChart = (chart, option) => {
  const seria = Object.assign(
    ChartConfig.fSeries(), option
  );
  chart.addSeries(seria, true, true)
  return chart.options.colors[seria['_colorIndex']];
};

const IndicatorBuilder = {
  removeSeriaFrom: (chart, zhValueText) => {
     const series = chart.series;
     for (let i=0, max=series.length; i<max; i++){
       if (series[i].userOptions.zhValueText === zhValueText){
         series[i].remove(true);
         return true;
       }
     }
     return false;
  },

  addSmaTo: (chart, option) => {
    const { id, period, plus } = option
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
      return void 0;
    }
  },

  crMfiConfig: (chart, period, id) => {
    const data = chart.options.zhPoints
    , parentId = chart.options.zhConfig.id
    , { dataMfi, nNotFullPoint } = mfi(data, period)
    , titleNotFullPoint = (nNotFullPoint !== 0)
        ? ' Not Full Data HL:' + nNotFullPoint
        : '';
    return crMfiConfig(
         id, parentId, id + titleNotFullPoint, dataMfi
     );
  },

  crMomAthConfig: (chart, id) => {
    const data = chart.options.zhPoints;
    return crMomAthConfig(id, momAth(data));
  }

};

export default IndicatorBuilder
