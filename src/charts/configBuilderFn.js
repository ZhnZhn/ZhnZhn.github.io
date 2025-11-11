export { crSeriaConfig } from './ChartConfigFn';

import {
  isSeriesDataCase,
  valueMoving
} from '../adapters/AdapterFn';
import pipe from '../utils/pipe';
import {
  filterTrimZero,
  findMinY,
  hasZeroOrLessValue
} from '../math/seriaFn';
import {
  isNumber,
  isStr,
  isObj,
  isArr,
  isNotEmptyArr
} from '../utils/isTypeFn';

import {
  crAreaConfig as _crAreaConfig,
  crSeriaConfig,
  isLineType
} from './ChartConfigFn';
import {
  crTreeMapConfig as _crTreeMapConfig,
  crTreeMapSeria
} from './TreeMapConfigFn';
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
  crBarOrColumnConfigImpl
} from './ChartFactory';
import {
  tooltipTreeMap
} from './Tooltip';
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
  config.title = fTitle({ text: title || subtitle })
  if (title && subtitle) {
    config.subtitle = fSubtitle({ text: subtitle })
  }
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

export const setDataSourceTo = (
  config,
  dataSource
) => fAdd({zhConfig: { dataSource }})(config)

export const fAddTooltip = (
  tooltip
) => config => fAdd('tooltip', fTooltip(tooltip))(config)

//isAddEmpty: UN Comtrade toSeriesConfig case
export const fAddLegend = (
  legend,
  isAddEmpty
) => config => isNotEmptyArr(legend) || (isAddEmpty && isArr(legend))
  ? fAdd('zhConfig', { legend })(config)
  : config;

export const fAddSeries = (
  series
) => config => {
  const _to =_isArr(config.series)
     ? config.series
     : config.series = [];
  if (_isArr(series)){
    const _legend = addSeriesImpl(_to, series);
    fAddLegend(_legend)(config)
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

const _setValueMoving = (
  _rt,
  data,
  config
) => {
  config.valueMoving = valueMoving(data, _rt)
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
    maxY,
    _rt
  } = option
  , _data = isFilterZero
      ? filterTrimZero(data)
      : data
  , min = findMinYData(minY, _data)
  , max = findMaxYData(maxY, _data);

  _setMinMax(min, max, isNotZoomToMinMax, config);
  _setMinMaxDeltas(min, max, _data, isDrawDeltaExtrems, config);
  _setYAxisType(isLogarithmic, _data, config);
  _setValueMoving(_rt, _data, config);

  return config;
}

export const fAddZhPoints = (
  data,
  propName='zhIsMfi'
) => config => data ? fAdd({
   zhPoints: data,
   [propName]: true
})(config) : config

export const fAddSeriaBy = (
  index,
  seriaConfig
) => config => {
  const _series = config.series;
  if (_series[index]) {
    _assign(_series[index], seriaConfig)
  } else {
    _series.push(seriaConfig)
  }
  return config;
}

export const fSetSeriaBy = (
  seriaIndex,
  seriaConfig
) => config => {
  config.series[seriaIndex] = seriaConfig
  return config
}

/*************************************/
/**********fAddPointsToConfig*********/

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
  && !isNumber(points[0][0])
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
  if (_isArr(data) && data.length > 0) {
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

export const crAreaConfig = (
  option
) => _crAreaConfig({
   spacingTop: 25,
   ...option
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


const CATEGORIES_X_AXIS = {
  type: "category",
  categories: [],
  opposite: false,
  crosshair: void 0,
  tickColor: "grey",
  tickWidth: 3,
  tickLength: 7,
  tickPosition: "outside",
  gridLineWidth: 0,
  labels: {
    y: 18
  }
}
, CATEGORIES_Y_AXIS = {
  lineWidth: 0,
  tickLength: 0,
  startOnTick: true,
  endOnTick: true,
  minPadding: 0.05,
  maxPadding: 0.05,
  plotLines: null,
  labels: {
    x: 3
  }
};

//toYearsByMonths
export const crCategoryConfig = (
  categories,
  title,
  subtitle
) => fAdd({
   xAxis: {...CATEGORIES_X_AXIS, ...{ categories }},
   yAxis: CATEGORIES_Y_AXIS
})(crArea2Config(title, subtitle))

export const crBarOrColumnConfig = (
  type,
  categories=[],
  seriaColor,
  yAxisLabelsColor
) => fAdd('xAxis', { categories })(
  crBarOrColumnConfigImpl(type, seriaColor, yAxisLabelsColor)
);

const HEIGHT_OF_ONE_BAR_CATEGORY = 22
, BAR_CATEGORY_TOTAL_MARGIN = 85;
export const setBarConfigHeightIf = (
  config
) => {
  const _chart = config.chart;
  if (_chart.type === 'bar') {
    const _categoriesNumber = config.xAxis.categories.length;
    if (_categoriesNumber < 16) {
      _chart.height = BAR_CATEGORY_TOTAL_MARGIN + _categoriesNumber * HEIGHT_OF_ONE_BAR_CATEGORY
    }
  }
  return config;
}

export const crTreeMapConfig = (
  data
) => {
  const config = _crTreeMapConfig()
  , seria = crTreeMapSeria(data);
  seria.tooltip = fTooltip(tooltipTreeMap)
  return fAddSeries(seria)(config);
}


const CONFIG_SERIA = {
   //type: 'spline',
   visible: true,
   marker: {
    symbol: 'circle'
   }
}

const MAX_NUMBER_OF_VISIBLE_SERIES = 8;
export const crSplineSeriaConfig = ({
  data,
  ...restOption
}) => isSeriesDataCase(data)
  ? data.map((seriaData, i) => crSeriaConfig({
      ...CONFIG_SERIA,
      ...restOption,
      data: seriaData,
      color: seriaData.color || getSeriaColorByIndex(i),
      name: seriaData.seriaName,
      visible: i < MAX_NUMBER_OF_VISIBLE_SERIES
    }))
  : crSeriaConfig({
      ...CONFIG_SERIA,
      ...restOption,
      data
    })

const CONFIG_SCATTER = { type: 'scatter' };
export const crScatterSeriaConfig = (
  tooltip,
  option
) => fAdd(
    'tooltip',
    fTooltip(tooltip)
)({...CONFIG_SCATTER, ...option})

export const crSplineConfig = (
  data,
  option
) => {
  const {
    seriaType,
    seriaColor,
    seriaWidth,
  } = option;
  return pipe(
    crArea2Config(option.title, option.subtitle),
    fAddSeries(crSplineSeriaConfig({
      seriaType,
      seriaColor,
      seriaWidth,
      data
    })),
    toConfig
  );
}
