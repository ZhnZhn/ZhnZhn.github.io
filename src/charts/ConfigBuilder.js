import seriaFns from '../math/seriaFn'

import Chart from './Chart'
import ChartFn from './ChartFn'
import ChartConfig from './ChartConfig'
import Factory from './ChartFactory'
import Tooltip from './Tooltip'

import SeriaBuilder from './SeriaBuilder'

const {
  findMinY,
  findMaxY,
  filterTrimZero
} = seriaFns;
const {
  setPlotLinesMinMax,
  setPlotLinesDeltas,
  calcMinY,
  setYToPoints,
} = ChartFn;
const {
  crDividendSeria,
  crMiniVolumeConfig,
  crMiniATHConfig,
  crMiniHLConfig
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

const _assign = Object.assign;
const _isArr = Array.isArray;

const _isObj = obj => obj && typeof obj === 'object';
const _isStr = str => typeof str === 'string';
const _isNumber = n => typeof n === 'number'
  && n - n === 0;

const _getY = (point) => _isArr(point)
 ? point[1]
 : point && point.y || 0;

const _getData = obj => obj.config?.series?.[0].data
 || [];

const ConfigBuilder = function(config={}) {
  if (!(this instanceof ConfigBuilder)){
    return (new ConfigBuilder(config));
  }
  this.config = config;
};

ConfigBuilder.prototype = _assign(ConfigBuilder.prototype , {
  ...SeriaBuilder,

  init(config={}) {
    this.config = config
    return this;
  },
  areaConfig(option){
    this.config = ChartConfig.crAreaConfig(option);
    return this;
  },
  area2Config(title, subtitle){
    return this.areaConfig({ spacingTop: 25 })
      .addCaption(title, subtitle)
      .clearSeries();
  },
  stockConfig(id, dataOption){
    const {
      dataVolumeColumn, dataVolume,
      dataATH,
      minClose, maxClose,
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      data, dataHigh, dataLow, dataOpen
    } = dataOption;
    return this.areaConfig({ spacingTop: 25 })
      .addTooltip(Tooltip.fnBasePointFormatter)
      .addMiniVolume({
        id,
        dColumn: dataVolumeColumn,
        dVolume: dataVolume
      })
      .addMiniATH({
        id, data: dataATH
      })
      .setMinMax(minClose, maxClose, isNotZoomToMinMax)
      .setMinMaxDeltas(minClose, maxClose, data, isDrawDeltaExtrems)
      .setStockSerias(id, data, dataHigh, dataLow, dataOpen);
  },
  intradayConfig({
    id,
    data, dH, dL, dO,
    minClose, maxClose,
    dVolume, dColumn
  }){
    return this.areaConfig()
      .add('chart', { spacingTop: 25, marginBottom: 20 })
      .addTooltip(Tooltip.fnBasePointFormatterT)
      .setStockSerias(id, data, dH, dL, dO)
      .setMinMax(minClose, maxClose, false)
      .addMiniVolume({
        id, dVolume, dColumn,
        tooltipColumn: Chart.fTooltip(Tooltip.volumeDmyt)
      });
  },
  categoryConfig(categories=[]){
    this.config = ChartConfig.crAreaConfig()
    const xAxis = {...C.CATEGORIES_X_AXIS, ...{ categories }}
    this.add('xAxis', xAxis)
    this.add('yAxis', C.CATEGORIES_Y_AXIS)
    return this;
  },
  _columnConfig(categories=[], option){
    this.config = Factory.crColumnConfig(option)
    this.add('xAxis', { categories })
    return this;
  },
  _barConfig(categories=[], option){
    this.config = Factory.crBarConfig(option)
    this.add('xAxis', { categories })
    return this;
  },
  barOrColumnConfig(type, categories=[], option){
    if (type === 'BAR') {
      return this._barConfig(categories, option);
    }
    return this._columnConfig(categories, option);
  },
  treeMapConfig(){
    this.config = ChartConfig.fBaseTreeMapConfig()
    return this;
  },

  alignButtonExport(){
    _assign(
      this.config.navigation.buttonOptions, { x: -10, y: -20 }
    )
    return this;
  },


  addTitle(title) {
    const _to = this.config.title || {};
    this.config.title = _assign(_to,
      Chart.fTitle({
        text: title,
        y: Chart.STACKED_TITLE_Y
      })
    )
    return this;
  },
  addSubtitle(subtitle) {
    const _to = this.config.subtitle || {};
    this.config.subtitle = _assign(_to,
       Chart.fSubtitle({
         text: subtitle,
         y: Chart.STACKED_SUBTITLE_Y
       })
    )
    return this;
  },
  addCaption(title='', subtitle=''){
    return this
      .addTitle(title)
      .addSubtitle(subtitle);
  },

  addTooltip(tooltip) {
    this.config.tooltip = Chart.fTooltip(tooltip)
    return this;
  },

  addXAxisCrosshair(){
    this.add('xAxis', { crosshair : Chart.fCrosshair() })
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
  addMiniVolume(option){
    const { dVolume } = option;
    return dVolume && dVolume.length > 0
     ? this.addZhMiniConfig(crMiniVolumeConfig(option))
     : this;
  },
  addMiniATH(option){
    const { data } = option;
    return data && data.length>0
     ? this.addZhMiniConfig(crMiniATHConfig(option))
     : this;
  },
  addMiniHL(option){
    const { data } = option;
    return data && data.length>0
     ? this.addZhMiniConfig(crMiniHLConfig(option))
     : this;
  },

  addZhPoints(data, fn){
    this.add({
      zhPoints: data,
      zhIsMfi: true
      //zhFnGetMfiConfig: fn
    })
    return this;
  },

  addLegend(legend){
    return this.add('zhConfig', { legend });
  },

  addMinMax(data, option){
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      isFilterZero,
      minY, maxY
    } = option
    , _data = isFilterZero
        ? filterTrimZero(data)
        : data
    , min = _isNumber(minY)
       ? minY
       : findMinY(_data)
    , max = _isNumber(maxY)
       ? maxY
       : findMaxY(_data);
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
      : Chart.calcMinY({
          minPoint: min,
          maxPoint: max
        });
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
  setStockSerias(id, d, dH, dL, dO){
    ChartConfig.setStockSerias(
      this.config, d, dH, dL, dO, id
    )
    return this;
  },

  /*
  checkThreshold(seriaIndex=0){
    const config = this.config
    , { series=[] } = config
    , seria = series[seriaIndex] || {}
    , data = seria.data || [];
    /*
    if (_isArr(data) && data.length > 1000) {
      config.plotOptions = _assign(
        config.plotOptions || {}, {
          series: {
            turboThreshold: 0
          }
        }
      )
    }
    return this;
  },
  */

  addDividend({ dataDividend, minClose, maxClose }) {
    if (dataDividend.length > 0) {
      setYToPoints(
        dataDividend,
        calcMinY({ min: minClose, max: maxClose })
      );
      this.config.series.push(crDividendSeria(dataDividend, 'exDividend'));
      this.config.chart.spacingBottom = 40;
    }
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
