import {
  filterTrimZero,
  hasZeroOrLessValue
} from '../math/seriaFn';
import {
  isStr,
  isObj,
  isNotEmptyArr
} from '../utils/isTypeFn';

import {
  crAreaConfig,
  isLineType
} from './ChartConfigFn';
import {
  fTitle,
  fSubtitle
} from './Chart';
import {
  setPlotLinesMinMax,
  setPlotLinesDeltas
} from './ChartFn';
import {
  addSeriesImpl
} from './seriaBuilderFn';

import {
  assignTo,
  findMinYData,
  findMaxYData,
  calcYAxisMin,
  getYFromPoint,
  getFirstSeriaData
} from './configBuilderHelpers';

const _isArr = Array.isArray;

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

export const crArea2Config = (
  title,
  subtitle
) => {
  const config = fAddCaption(title, subtitle)(
    crAreaConfig({ spacingTop: 25 })
  );
  config.series = []
  return config;
}
