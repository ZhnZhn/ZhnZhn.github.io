import {
  filterTrimZero,
  findMinY,
  hasZeroOrLessValue
} from '../math/seriaFn';
import {
  isStr,
  isObj,
  isNotEmptyArr
} from '../utils/isTypeFn';

import {
  crAreaConfig as _crAreaConfig,
  isLineType
} from './ChartConfigFn';
import {
  fTitle,
  fSubtitle,
  fTooltip
} from './Chart';
import {
  getSeriaColorByIndex
} from './ChartTheme';
import {
  calcMinY,
  setYToPoints,
  setPlotLinesMinMax,
  setPlotLinesDeltas
} from './ChartFn';
import {
  addSeriesImpl,
  crLegendItem
} from './seriaBuilderHelpers';

import {
  assignTo,
  findMinYData,
  findMaxYData,
  calcYAxisMin,
  getYFromPoint,
  getFirstSeriaData
} from './configBuilderHelpers';

const _isArr = Array.isArray
, _assign = Object.assign;

export const fAddCaption = (
  title,
  subtitle
) => config => {
  config.title = fTitle({ text: title })
  config.subtitle = fSubtitle({ text: subtitle })
  return config;
}

export const fAdd = (
  propName,
  option
) => config => {
  if (isStr(propName)){
    assignTo(config, propName, option)
  } else if (isObj(propName)){
    let _propName;
    for (_propName in propName){
      assignTo(config, _propName, propName[_propName])
    }
  }
  return config;
}

export const fAddTooltip = (
  tooltip
) => config => {
  config.tooltip = fTooltip(tooltip)
  return config;
}

export const fAddLegend = (
  legend
) => config => isNotEmptyArr(legend)
  ? fAdd('zhConfig', { legend })(config)
  : config;

export const fAddSeries = (
  series,
  isWithoutLegend=false
) => config => {
  const _to =_isArr(config.series)
     ? config.series
     : config.series = [];
  if (_isArr(series)){
    const _legend = addSeriesImpl(_to, series);
    if (!isWithoutLegend) {
      fAddLegend(_legend)(config)
    }
  } else if (isObj(series)) {
    _to[0] = series
  }
  return config;
}

const _fAddZhMiniConfig = (
  miniConfig
) => config => {
  const _configs = config.zhMiniConfigs;
  if (_isArr(_configs)){
    _configs.push(miniConfig)
  } else {
    config.zhMiniConfigs = [miniConfig]
  }
  return config;
}

export const _addMini = (
  data,
  option,
  crConfig,
  toConfig
) => data && data.length > 0
  ? _fAddZhMiniConfig(crConfig(option))(toConfig)
  : toConfig;

const _setMinMax = (
  min,
  max,
  noZoom,
  config
) => {
  setPlotLinesMinMax({
    plotLines: config.yAxis.plotLines,
    min,
    max
  })
  fAdd('yAxis', {
    min: calcYAxisMin(min, max, noZoom),
    maxPadding: 0.15,
    minPadding: 0.15,
    endOnTick: false,
    startOnTick: false
  })(config)
}

const _setMinMaxDeltas = (
  min,
  max,
  data,
  isDrawDeltaExtrems,
  config
) => {
  if (isDrawDeltaExtrems) {
    const _recentIndex = data.length-1;
    if (_recentIndex > 0) {
      setPlotLinesDeltas({
        plotLines: config.yAxis.plotLines,
        min,
        max,
        value: getYFromPoint(data[_recentIndex])
      })
    }
  }
}

const _setYAxisType = (
  isLogarithmic,
  data,
  config
) => {
  if (isLogarithmic) {
    if (!isLineType(config) || hasZeroOrLessValue(data)) {
      return;
    }
    const { yAxis } = config
    yAxis.type = 'logarithmic'
    //yAxis.minorTickInterval = 0.1
    if (yAxis.min <= 0) {
      yAxis.min = null
    }
  }
}

export const fAddMinMax = (
  data,
  option
) => config => {
  const {
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    isFilterZero,
    isLogarithmic,
    minY,
    maxY
  } = option
  , _data = isFilterZero
      ? filterTrimZero(data)
      : data
  , min = findMinYData(minY, _data)
  , max = findMaxYData(maxY, _data);

  _setMinMax(min, max, isNotZoomToMinMax, config);
  _setMinMaxDeltas(min, max, _data, isDrawDeltaExtrems, config);
  _setYAxisType(isLogarithmic, _data, config);

  return config;
}

/*************************************/
/**********fAddPointsToConfig*********/

export const fAddSeriaBy = (
  index,
  obj
) => config => {
  if (config.series[index]) {
    _assign(config.series[index], obj)
  } else {
    config.series.push(obj)
  }
  return config;
}

const _fAddSeriaPoints = (
  points,
  { maxVisible=6 }={}
) => config => {
  const _legend = [];
  points.forEach((data, index) => {
    const is = index<maxVisible ? true : false
    , color = getSeriaColorByIndex(index)
    , { seriaName } = data;
    _legend.push(crLegendItem({
      index, color, name: seriaName, is
    }))
    fAddSeriaBy(index, {
      type: 'spline',
      data: data,
      name: seriaName,
      zhValueText: seriaName,
      visible: is
    })(config)
  })
  if (_legend.length !== 0){
    fAddLegend(_legend)(config);
  }
  return config;
}

//FAOSTAT
export const fAddPointsToConfig = (
  points
) => config => points[0]
  && _isArr(points[0])
  && points[0][0]
  && typeof points[0][0] !== 'number'
  ? _fAddSeriaPoints(points)(config)
  : fAddSeriaBy(0, {
      type: 'spline',
      data: points
    })(config);

/*************************************/

export const _fAddScatterBottom = (
  seria,
  name,
  min,
  max
) => config => {
  const { data } = seria;
  if (data.length > 0) {
   const {
     series,
     chart,
     zhConfig
   } = config;
   setYToPoints(data, calcMinY(min, max));
   seria.visible = false
   series.push(seria);
   chart.spacingBottom = 40;
   zhConfig.legend.push({
     index: series.length - 1,
     color: seria.color,
     name
   })
  }
  return config;
}

const _disableAnimation = (config) => {
  fAdd({
    chart: { animation: false },
    plotOptions: { series: { animation: false }},
    zhConfig: { withoutAnimation: true }
  })(config);
}

const _checkDataLength = (config) => {
  const data = getFirstSeriaData({ config });
  if (data.length > 3000){
    _disableAnimation(config)
  }
}

export const toConfig = (config) => {
  _checkDataLength(config)
  return config;
}

export const crSeriaConfigFromAdapter = ({
  adapter,
  json,
  option,
  type
}) => {
  const { config } = adapter.toConfig(json, option)
  , _seria = config.series[0];
  _seria.minY = findMinY(_seria.data)
  if (type) {
    _seria.type = type
  }
  return _seria;
}

export const crAreaConfig = () => _crAreaConfig({
  spacingTop: 25
})

export const crArea2Config = (
  title,
  subtitle
) => {
  const config = fAddCaption(title, subtitle)(
    crAreaConfig()
  );
  config.series = []
  return config;
}
