import {
  findMinY,
  findMaxY,
  filterTrimZero,
  hasZeroOrLessValue
} from '../math/seriaFn';

import {
  fTitle,
  fSubtitle,
  fTooltip
} from './Chart';
import {
  tooltipTreeMap
} from './Tooltip';
import {
  setPlotLinesMinMax,
  setPlotLinesDeltas,
  calcMinY,
  setYToPoints
} from './ChartFn';
import {
  crAreaConfig,
  isLineType
} from './ChartConfigFn';
import {
  crTreeMapConfig
} from './TreeMapConfigFn';
import {
  crBarConfig,
  crColumnConfig
} from './ChartFactory';

import SeriaBuilder from './SeriaBuilder';
import ConfigStockSlice from './ConfigStockSlice';

const CATEGORIES_X_AXIS = {
  type: "category",
  categories: [],
  opposite: false,
  crosshair: void 0,
  tickColor: "gray",
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

const _isObj = obj => obj && typeof obj === 'object'
, _isStr = str => typeof str === 'string'
, _isNumber = n => typeof n === 'number'
  && n - n === 0
, _isNotEmptyArr = arr => _isArr(arr)
  && arr.length > 0;

const _isArr = Array.isArray
, _assign = Object.assign
, _assignTo = (obj, propName, value) => {
    obj[propName] = _isObj(value) && !_isArr(value)
      ? _assign(obj[propName] || {}, value)
      : value
};

const _getY = (point) => _isArr(point)
 ? point[1]
 : point && point.y || 0;

const _getData = obj => obj.config?.series?.[0].data
 || [];

const _findMinY = (minY, data) => _isNumber(minY)
  ? minY
  : findMinY(data);
const _findMaxY = (maxY, data) => _isNumber(maxY)
  ? maxY
  : findMaxY(data);
const _calcYAxisMin = (min, max, noZoom) => noZoom
  && min > 0
   ? 0
   : calcMinY(min, max);

const ConfigBuilder = function(config={}) {
  if (!(this instanceof ConfigBuilder)){
    return (new ConfigBuilder(config));
  }
  this.config = config;
};

ConfigBuilder.crSeria = ({ adapter, json, option, type }) => {
  const { config } = adapter.toConfig(json, option)
  , _seria = config.series[0];
  _seria.minY = findMinY(_seria.data)
  if (type) {
    _seria.type = type
  }
  return _seria;
}

ConfigBuilder.prototype = _assign(ConfigBuilder.prototype , {
  ...SeriaBuilder,
  ...ConfigStockSlice,

  init(config={}) {
    this.config = config
    return this;
  },
  areaConfig(option){
    this.config = crAreaConfig(option);
    return this;
  },
  area2Config(title, subtitle){
    return this.areaConfig({ spacingTop: 25 })
      .addCaption(title, subtitle)
      .add('series', []);
  },
  categoryConfig(categories=[]){
    this.config = crAreaConfig({ spacingTop: 25 })
    const xAxis = {...CATEGORIES_X_AXIS, ...{ categories }}
    return this.add('xAxis', xAxis)
      .add('yAxis', CATEGORIES_Y_AXIS);
  },
  barOrColumnConfig(type, categories=[]){
    const _crConfig = type === 'BAR'
      ? crBarConfig
      : crColumnConfig;
    this.config = _crConfig()
    return this.add('xAxis', { categories });
  },
  treeMapConfig(data){
    this.config = crTreeMapConfig()
    return this.addSeries(ConfigBuilder()
      .treeMapSeria(tooltipTreeMap, { data })
      .toSeria()
    );
  },

  addTitle(text) {
    _assignTo(this.config, 'title', fTitle({ text }))
    return this;
  },
  addSubtitle(text) {
    _assignTo(this.config, 'subtitle', fSubtitle({ text }))
    return this;
  },
  addCaption(title, subtitle){
    return this
      .addTitle(title)
      .addSubtitle(subtitle);
  },

  addTooltip(tooltip) {
    this.config.tooltip = fTooltip(tooltip)
    return this;
  },

  add(propName, option){
    if (_isStr(propName)){
      _assignTo(this.config, propName, option)
    } else if (_isObj(propName)){
      let _propName;
      for (_propName in propName){
        _assignTo(this.config, _propName, propName[_propName])
      }
    }
    return this;
  },

  addZhMiniConfig(config){
    const _configs = this.config.zhMiniConfigs;
    if (_configs){
      _configs.push(config)
    } else {
      this.config.zhMiniConfigs = [config]
    }
    return this;
  },
  _addMini(data, option, crConfig){
    return data && data.length > 0
      ? this.addZhMiniConfig(crConfig(option))
      : this;
  },

  addZhPointsIf(data, propName='zhIsMfi', is=true){
    return is
      ? this.add({ zhPoints: data, [propName]: true })
      : this;
  },

  addLegend(legend){
    return _isNotEmptyArr(legend)
      ? this.add('zhConfig', { legend })
      : this;
  },

  addMinMax(data, option){
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      isFilterZero,
      isLogarithmic,
      minY,
      maxY
    } = option
    , _data = isFilterZero ? filterTrimZero(data) : data
    , min = _findMinY(minY, _data)
    , max = _findMaxY(maxY, _data);
    return this._setMinMax(min, max, isNotZoomToMinMax)
      ._setMinMaxDeltas(min, max, _data, isDrawDeltaExtrems)
      ._setYAxisType(isLogarithmic, _data)
  },


  _setMinMaxDeltas(min, max, data, isDrawDeltaExtrems){
    if (isDrawDeltaExtrems) {
      const _recentIndex = data.length-1;
      if (_recentIndex > 0) {
        setPlotLinesDeltas({
          plotLines: this.config.yAxis.plotLines,
          min, max,
          value: _getY(data[_recentIndex])
        })
      }
    }
    return this;
  },


  _setMinMax(min, max, noZoom){
    setPlotLinesMinMax({
      plotLines: this.config.yAxis.plotLines,
      min, max
    })
    return this.add('yAxis', {
      min: _calcYAxisMin(min, max, noZoom),
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    });
  },

  _setYAxisType(isLogarithmic, data) {
    if (isLogarithmic) {
      if (!isLineType(this.config)
          || hasZeroOrLessValue(data)) {
        return this;
      }
      const { yAxis } = this.config
      yAxis.type = 'logarithmic'
      //yAxis.minorTickInterval = 0.1
      if (yAxis.min <= 0) {
        yAxis.min = null
      }
    }
    return this;
  },

  _addScatterBottom(seria, name, min, max) {
    const { data } = seria;
    if (data.length > 0) {
     const { series, chart, zhConfig } = this.config;
     setYToPoints(data, calcMinY(min, max));
     seria.visible = false
     series.push(seria);
     chart.spacingBottom = 40;
     zhConfig.legend.push({
       index: series.length - 1,
       color: seria.color,
       name: name
     })
    }
    return this;
  },

  _disableAnimation(){
    this.add({
      chart: { animation: false },
      plotOptions: { series: { animation: false }},
      zhConfig: { withoutAnimation: true }
    });
  },

  _checkDataLength(){
    const data = _getData(this);
    if (data.length > 3000){
      this._disableAnimation()
    }
  },

  toConfig(){
    this._checkDataLength()
    return this.config;
  }
})

export default ConfigBuilder
