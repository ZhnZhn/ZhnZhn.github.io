import Chart from './Chart'
import ChartConfig from './ChartConfig'
import Factory from './ChartFactory'

import SeriaBuilder from './SeriaBuilder'

const C = {
  CATEGORIES_X_AXIS: {
    type: 'category',
    categories: [],
    opposite: false,
    labels: {
      y: 18
    },
    crosshair: undefined,
    tickColor: 'gray',
    tickWidth: 3,
    tickLength: 7,
    tickPosition: 'outside',
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
}


const ConfigBuilder = function(config={}) {
  if (!(this instanceof ConfigBuilder)){
    return (new ConfigBuilder(config));
  }
  this.config = config;
}

ConfigBuilder.prototype = {
  ...SeriaBuilder,

  init(config={}) {
    this.config = config
    return this;
  },
  initBaseArea(){
    this.config = ChartConfig.fBaseAreaConfig()
    return this;
  },
  initBaseCategories(categories=[]){
    this.config = ChartConfig.fBaseAreaConfig()
    const xAxis = {...C.CATEGORIES_X_AXIS, ...{ categories }}
    this.add('xAxis', xAxis)
    this.add('yAxis', C.CATEGORIES_Y_AXIS)
    return this;
  },
  initBaseColumn(categories=[]){
    this.config = Factory.crColumnConfig()
    this.add('xAxis', { categories })
    return this;
  },
  initBaseBar(categories=[]){
    this.config = Factory.crBarConfig()
    this.add('xAxis', { categories })
    return this;
  },
  initBaseColumnOrBar(categories=[], type){
    if (type === 'BAR') {
      return this.initBaseBar(categories);
    } else {
      return this.initBaseColumn(categories);
    }
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
      Object.assign(this.config, propName)
    }
    return this;
  },

  addZhVolumeConfig(id, dColumn, dVolume){
    this.add('zhVolumeConfig',
       ChartConfig.fIndicatorVolumeConfig(id, dColumn, dVolume)
    )
    return this;
  },
  addZhATHConfig(id, data){
    this.add('zhATHConfig',
       ChartConfig.fIndicatorATHConfig(id, data)
    )
    return this;
  },
  addZhPoints(data, fn){
    this.add({
      zhPoints: data,
      zhIsMfi: true,
      zhFnGetMfiConfig: fn
    })
    return this;
  },


  setMinMax(minValue, maxValue){
    const plotLines = this.config.yAxis.plotLines;
    plotLines[0].value = maxValue;
    plotLines[0].label.text = `${ChartConfig.fnNumberFormat(maxValue)}`;
    plotLines[1].value = minValue;
    plotLines[1].label.text = `${ChartConfig.fnNumberFormat(minValue)}`;
    this.add('yAxis', {
      min: Chart.calcMinY({ minPoint: minValue, maxPoint: maxValue}),
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
}

export default ConfigBuilder
