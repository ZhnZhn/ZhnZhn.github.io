import {
  categoryDiff,
  categoryRate,
  categoryRoc,
  sma,
  rsi,
  mfi,
  momAth,
  pby10
} from '../math/tsIndicators';
import {
  crMiniMfiConfig,
  crMiniMomAthConfig
} from './crMiniConfigFn';
import {
  crSeriaConfig
} from './ChartConfigFn';


const _getD12 = chart => {
  const series = chart.series
  , s1 = series[0]
  , d1 = s1.data
  , d2 = (series[1] || {}).data || [];
  return { d1, d2, sc: s1.color };
}

const _updateYAxisMin = chart => {
  const _yAxis = chart.yAxis[0]
  , { dataMin, min } = _yAxis.getExtremes();
  if (dataMin<min) {
    _yAxis.setExtremes(dataMin, null, true)
  }
};

//df config chart.ignoreHiddenSeries = true
const _hideFirstSecondSeries = chart => {
  const _series = chart.series;
  _series[0].hide()
  _series[1].hide()
};

const _fCategoryCalc = (
  calc,
  name
) => (chart, rc) => {
  const { d1, d2, sc } = _getD12(chart);
  if (d2.length !== 0) {
    const data = calc(d1, d2, {rc, sc});
    chart.addSeries({
      name, data,
      color: rc,
    }, true, true)
    _updateYAxisMin(chart)
    _hideFirstSecondSeries(chart)
    return true;
  }
  return false;
};

const _addToChartSeria = (
  chart,
  option
) => {
  const seria = crSeriaConfig(option)
  , _seriaIns = chart.addSeries(seria, true, true);
  return (_seriaIns || {}).color;
};

export const removeSeriaFrom = (
  chart,
  zhValueText
) => {
   const series = chart.series;
   for (const seria of series){
    if (seria.userOptions.zhValueText === zhValueText){
      seria.remove(true);
      return true;
    }
   }
   return false;
}

export const addCategoryRateTo = _fCategoryCalc(
  categoryRate,
  'Rate S1/S2'
)
export const addCategoryDiffTo = _fCategoryCalc(
  categoryDiff,
  'Diff S1-S2'
)
export const addCategoryRocTo = _fCategoryCalc(
  categoryRoc,
  'ROC S1 from S2'
)

export const powerBy10 = (
  chart,
  power
) => {
  const seria = chart.series[0]
  , name = seria.getName()
  , [dataP, by] = pby10(seria.data, power);

  seria.update({
    data: dataP,
    name: `${name}*${by}`
  }, true)
}

const _fAddTaTo = (
  taName,
  taFn,
  yaxisOptions
) => (
  chart,
  option
) => {
 const {
   id,
   period
 } = option
 , _data = chart.series[0].data
 , data = taFn(_data, period)
 , name = `${taName}(${period})`
 , seriaOption = {
     zhValueText: id,
     lineWidth: 2,
     data: data,
     name: name
 };
 return data.length>0
   ? yaxisOptions
     ? (chart.zhAddSeriaToYAxis({
          name: taName,
          data,
          ...yaxisOptions
        },
        crSeriaConfig({
          name,
          zhValueText: id,
          lineWidth: 2
        })
      ) || {}).color
     :_addToChartSeria(chart, seriaOption)
   : console.log('It seems, there are not enough data for ' + name);
}

export const addSmaTo = _fAddTaTo('SMA', sma)
export const addRsiTo = _fAddTaTo('RSI', rsi, { min: 0, max: 100 })

const _getZhPoints = chart => ((chart || {}).options || {}).zhPoints;

export const crMfiConfig = (
  chart,
  period,
  id
) => {
  const [
    data,
    numberOfNotFullPoint
  ] = mfi(_getZhPoints(chart), period)
  , titleNotFullPoint = numberOfNotFullPoint === 0
      ? ''
      : ' Not Full Data HL:' + numberOfNotFullPoint;
  return crMiniMfiConfig({
    id,
    title: id + titleNotFullPoint,
    data
  });
}

export const crMomAthConfig = (
  chart
) => crMiniMomAthConfig(
  momAth(_getZhPoints(chart))
);
