import seriaFns from '../math/seriaFn'
import COLOR from '../constants/Color';

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
  crSplitRatioSeria,
  crMiniVolumeConfig,
  crMiniATHConfig,
  crMiniHLConfig,
  setSerieData
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

 const _crSeriaOption = (color, option) => _assign({
   type: 'line', visible: false, color,
   marker: {
     radius: 3,
     symbol: "circle"
   }
 }, option);

 const _crScatterBottomSeria = (crSeria, data, min, max) => {
   setYToPoints(data, calcMinY(min, max));
   return crSeria(data);
 };

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
  stockConfig(id, option){
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      seriaType:sT, seriaColor, seriaWidth,
      dC, dH, dL, dO,
      minClose, maxClose,
      dVc, dV,
      dATH
    } = option
    , seriaType = _isStr(sT) ? sT.toLowerCase() : 'area';
    return this.areaConfig({
        spacingTop: 25,
        seriaType, seriaColor, seriaWidth
      })
      .addTooltip(Tooltip.vTdmyIf)
      .addMiniVolume({
        id,
        dColumn: dVc,
        dVolume: dV,
        tooltipColumn: Chart.fTooltip(Tooltip.volumeTdmyIf)
      })
      .addMiniATH({ id, data: dATH })
      .setMinMax(minClose, maxClose, isNotZoomToMinMax)
      .setMinMaxDeltas(minClose, maxClose, dC, isDrawDeltaExtrems)
      .setStockSerias(seriaType, dC, dH, dL, dO);
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
    this.config = ChartConfig.crTreeMapConfig()
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

  addZhPointsIf(data, propName='zhIsMfi', is=true){
    return is
      ? this.add({
         zhPoints: data,
         [propName]: true
       })
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
  setStockSerias(seriaType, d, dH, dL, dO){
    const config = this.config;
    setSerieData(config, d, 0, 'Close', {
      type: seriaType || 'area'
    })
    setSerieData(config, dH, 1, 'High',
      _crSeriaOption(COLOR.S_HIGH)
    )
    setSerieData(config, dL, 2, 'Low',
      _crSeriaOption(COLOR.S_LOW)
    )
    setSerieData(config, dO, 3, 'Open',
      _crSeriaOption(COLOR.S_OPEN)
    )
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

  //Used only by Alpha Vantage Daily Adjusted, Quandl EOD
  addDividend(data, min, max) {
    if (data.length > 0) {
      const seria = _crScatterBottomSeria(crDividendSeria, data, min, max)      
      this._addScatterBottom(seria, 'Dividend')
    }
    return this;
  },
  //Used only by Quandl EOD
  addSplitRatio(data, min, max) {
    if (data.length > 0) {
      const seria = _crScatterBottomSeria(crSplitRatioSeria, data, min, max)
      this._addScatterBottom(seria, 'Split Ratio')
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
