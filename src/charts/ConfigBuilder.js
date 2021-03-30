import seriaFns from '../math/seriaFn';

import Chart from './Chart';
import ChartFn from './ChartFn';
import ChartConfig from './ChartConfig';
import Factory from './ChartFactory';

import SeriaBuilder from './SeriaBuilder';
import ConfigStockSlice from './ConfigStockSlice';

const {
  findMinY,
  findMaxY,
  filterTrimZero
} = seriaFns;
const {
  fTitle,
  fSubtitle,
  fTooltip
} = Chart;
const {
  setPlotLinesMinMax,
  setPlotLinesDeltas,
  calcMinY
} = ChartFn;
const {
  crAreaConfig,
  crTreeMapConfig
} = ChartConfig;

const C = {
  CATEGORIES_X_AXIS: {
    type: "category",
    categories: [],
    opposite: false,
    labels: {
      y: 18
    },
    crosshair: undefined,
    tickColor: "gray",
    tickWidth: 3,
    tickLength: 7,
    tickPosition: "outside",
    gridLineWidth: 0
  },

  CATEGORIES_Y_AXIS: {
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
  }
};

const _isArr = Array.isArray
, _assign = Object.assign
, _assignTo = (obj, propName, value) => {
  obj[propName] = _assign(obj[propName] || {}, value)
};

const _isObj = obj => obj && typeof obj === 'object'
, _isStr = str => typeof str === 'string'
, _isNumber = n => typeof n === 'number'
  && n - n === 0
, _isNotEmptyArr = arr => _isArr(arr)
  && arr.length > 0;

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
    this.config = crAreaConfig()
    const xAxis = {...C.CATEGORIES_X_AXIS, ...{ categories }}
    this.add('xAxis', xAxis)
    this.add('yAxis', C.CATEGORIES_Y_AXIS)
    return this;
  },
  barOrColumnConfig(type, categories=[], option){
    const _crConfig = type === 'BAR'
      ? Factory.crBarConfig
      : Factory.crColumnConfig;
    this.config = _crConfig(option)
    return this.add('xAxis', { categories })
  },
  treeMapConfig(){
    this.config = crTreeMapConfig()
    return this;
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
      const _to = this.config[propName];
      if (_isObj(_to)) {
        _assign(_to, option)
      } else {
        this.config[propName] = option
      }
    } else if (_isObj(propName)){
      let _propName;
      for (_propName in propName){
        const _to = this.config[_propName]
            , _from = propName[_propName];
        if (_to) {
          _assign(_to, _from)
        } else {
          this.config[_propName] = _from
        }
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
      minY, maxY
    } = option
    , _data = isFilterZero ? filterTrimZero(data) : data
    , min = _findMinY(minY, _data)
    , max = _findMaxY(maxY, _data);
    return this.setMinMax(min, max, isNotZoomToMinMax)
      .setMinMaxDeltas(min, max, _data, isDrawDeltaExtrems);
  },


  setMinMaxDeltas(min, max, data, isDrawDeltaExtrems){
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


  _setYAxisMin(min, max, noZoom){
    const _min = noZoom && min > 0
      ? 0
      : calcMinY(min, max);
    this.add('yAxis', {
      min: _min,
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    })
  },

  setMinMax(min, max, noZoom){
    setPlotLinesMinMax({
      plotLines: this.config.yAxis.plotLines,
      min, max
    })
    this._setYAxisMin(min, max, noZoom)
    return this;
  },

  _addScatterBottom(seria, name) {
    const { series, chart, zhConfig } = this.config;
    series.push({ ...seria, visible: false });
    chart.spacingBottom = 40;
    zhConfig.legend.push({
      index: series.length - 1,
      color: seria.color,
      name: name
    })
    return this;
  },

  _disableAnimation(){
    return this.add({
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
    return this;
  },

  toConfig(){
    this._checkDataLength()
    return this.config;
  }
})

export default ConfigBuilder
