import { crAreaConfig } from './ChartConfigFn';

import SeriaBuilder from './SeriaBuilder';
import ConfigStockSlice from './ConfigStockSlice';

import {
  crSeriaConfigFromAdapter,
  crArea2Config,  
  fAddCaption,
  fAdd,
  fAddMinMax,
  fAddLegend,
  fAddTooltip,
  toConfig
} from './configBuilderFn';

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

const _assign = Object.assign;

const ConfigBuilder = function(config={}) {
  if (!(this instanceof ConfigBuilder)){
    return (new ConfigBuilder(config));
  }
  this.config = config;
};

ConfigBuilder.crSeria = crSeriaConfigFromAdapter

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
    this.config = crArea2Config(title, subtitle);
    return this;
  },
  categoryConfig(categories=[]){
    this.config = crAreaConfig({ spacingTop: 25 })
    const xAxis = {...CATEGORIES_X_AXIS, ...{ categories }}
    return this.add('xAxis', xAxis)
      .add('yAxis', CATEGORIES_Y_AXIS);
  },

  addCaption(title, subtitle){
    fAddCaption(title, subtitle)(this.config)
    return this;
  },

  addTooltip(tooltip) {
    fAddTooltip(tooltip)(this.config)
    return this;
  },

  add(propName, option){
    fAdd(propName, option)(this.config)
    return this;
  },

  addZhPointsIf(data, propName='zhIsMfi', is=true){
    return is
      ? this.add({ zhPoints: data, [propName]: true })
      : this;
  },

  addLegend(legend){
    fAddLegend(legend)(this.config)
    return this;
  },

  addMinMax(data, option){
    fAddMinMax(data, option)(this.config)
    return this;
  },

  toConfig(){
    return toConfig(this.config);
  }
})

export default ConfigBuilder
