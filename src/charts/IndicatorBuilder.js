import tsIndicators from '../math/tsIndicators'

import ChartConfig from './ChartConfig';

const {
  categoryRate, categoryDiff, pby10,
  sma, mfi, momAth
} = tsIndicators;
const {
  crMfiConfig,
  crMomAthConfig
} = ChartConfig;

const _getD12 = chart => {
  const series = chart.series
  , s1 = series[0]
  , d1 = s1.data
  , d2 = (series[1] || {}).data || [];
  return { d1, d2, sc: s1.color };
}

const _findMinY = arr => {
  let y, min = Number.MAX_SAFE_INTEGER;
  for(let i=0; i<arr.length; i++){
    y = arr[i].y
    if (y<min) { min = y }
  }
  return min !== Number.MAX_SAFE_INTEGER
    ? min
    : null;
}

const _fCategoryCalc = (calc, name, isUpdateMin) => (chart, rc) => {
  const { d1, d2, sc } = _getD12(chart);
  if (d2.length !== 0) {
    const data = calc(d1, d2, { rc, sc });
    chart.addSeries({
      name, data,
      color: rc,
    }, true, true)
    if (isUpdateMin) {
      chart.yAxis[0].setExtremes(_findMinY(data), null, true)
    }
    return true;
  }
  return false;
};

const _addDataAsSeriaToChart = (chart, option) => {
  const seria = ChartConfig.crSeria(option);
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

  addCategoryRateTo: _fCategoryCalc(categoryRate, 'Rate S1/S2'),
  addCategoryDiffTo: _fCategoryCalc(categoryDiff, 'Diff S1-S2', true),
  powerBy10: (chart, power) => {
    const seria = chart.series[0]
    , name = seria.getName()
    , [dataP, by] = pby10(seria.data, power);

    seria.update({
      data: dataP,
      name: `${name}*${by}`
    }, true)
  },

  addSmaTo: (chart, option) => {
    const { id, period } = option
    , data = chart.series[0].data
    , dataSma = sma(data, period);

    if (dataSma.length>0){
      return _addDataAsSeriaToChart(chart, {
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
    , { dataMfi, nNotFullPoint } = mfi(data, period)
    , titleNotFullPoint = (nNotFullPoint !== 0)
        ? ' Not Full Data HL:' + nNotFullPoint
        : '';
    return crMfiConfig(
         id, id + titleNotFullPoint, dataMfi
     );
  },

  crMomAthConfig: (chart) => {
    const data = chart.options.zhPoints;
    return crMomAthConfig(momAth(data));
  }

};

export default IndicatorBuilder
