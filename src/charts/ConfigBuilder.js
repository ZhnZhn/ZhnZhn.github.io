import seriaFns from '../math/seriaFn'

import Chart from './Chart'
import ChartConfig from './ChartConfig'
import Factory from './ChartFactory'
import Tooltip from './Tooltip'

import SeriaBuilder from './SeriaBuilder'

const { findMinY, findMaxY } = seriaFns;

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

const ConfigBuilder = function(config={}) {
  if (!(this instanceof ConfigBuilder)){
    return (new ConfigBuilder(config));
  }
  this.config = config;
};

ConfigBuilder.prototype = Object.assign(ConfigBuilder.prototype , {
  ...SeriaBuilder,

  init(config={}) {
    this.config = config
    return this;
  },
  areaConfig(option){
    this.config = ChartConfig.fBaseAreaConfig(option);
    return this;
  },
  area2Config(title, subtitle){
    this.areaConfig({ spacingTop: 25 })
      .addCaption(title, subtitle)
      .clearSeries()
    return this;
  },
  stockConfig(id, dataOption){
    const {
            dataVolumeColumn, dataVolume,
            dataATH,
            minClose, maxClose, isNotZoomToMinMax,
            data, dataHigh, dataLow, dataOpen
          } = dataOption;
    this.areaConfig({ spacingTop: 25 })
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
      .setStockSerias(id, data, dataHigh, dataLow, dataOpen)
    return this;
  },
  categoryConfig(categories=[]){
    this.config = ChartConfig.fBaseAreaConfig()
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
    Object.assign(
      this.config.navigation.buttonOptions, { x: -10, y: -20 }
    )
    return this;
  },


  addTitle(title) {
    const _to = this.config.title || {};
    this.config.title = Object.assign(_to,
      Chart.fTitle({
        text: title,
        y: Chart.STACKED_TITLE_Y
      })
    )
    return this;
  },
  addSubtitle(subtitle) {
    const _to = this.config.subtitle || {};
    this.config.subtitle = Object.assign(_to,
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
    if (typeof propName === 'string'){
      const _to = this.config[propName];
      if (_to && typeof _to === 'object') {
        Object.assign(this.config[propName], option)
      } else {
        this.config[propName] = option
      }
    } else if (propName && typeof propName === 'object'){
      let _propName;
      for (_propName in propName){
        const _to = this.config[_propName]
            , _from = propName[_propName];
        if (_to) {
          Object.assign(_to, _from)
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
      ? this.addZhMiniConfig(
          ChartConfig.fMiniVolumeConfig(option)
        )
      :this;
  },
  addMiniATH(option){
    const { data } = option;
    return data && data.length>0
      ? this.addZhMiniConfig(
          ChartConfig.fMiniATHConfig(option)
        )
      : this;
  },
  addMiniHL(option){
    const { data } = option;
    return data && data.length>0
     ? this.addZhMiniConfig(
         ChartConfig.fMiniHLConfig(option)
       )
     : this;
  },

  addZhPoints(data, fn){
    this.add({
      zhPoints: data,
      zhIsMfi: true,
      zhFnGetMfiConfig: fn
    })
    return this;
  },

  addLegend(legend){
    return this.add('zhConfig', {
      legend, isWithLegend: true,
    });
  },

  addMinMax(data, option){
    return this.setMinMax(
      findMinY(data),
      findMaxY(data),
      option.isNotZoomToMinMax
    );
  },

  setMinMax(minValue, maxValue, noZoom){
    const plotLines = this.config.yAxis.plotLines;
    plotLines[0].value = maxValue;
    plotLines[0].label.text = `${ChartConfig.fnNumberFormat(maxValue)}`;
    plotLines[1].value = minValue;
    plotLines[1].label.text = `${ChartConfig.fnNumberFormat(minValue)}`;

    const _min = noZoom && minValue > 0
      ? 0
      : Chart.calcMinY({
          minPoint: minValue,
          maxPoint: maxValue
        })
    this.add('yAxis', {
      min: _min,
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    })

    return this;
  },
  setStockSerias(id, d, dH, dL, dO){
    ChartConfig.setStockSerias(
      this.config, d, dH, d, dO, id
    )
    return this;
  },

  toConfig(){
    return this.config;
  }
})

export default ConfigBuilder
