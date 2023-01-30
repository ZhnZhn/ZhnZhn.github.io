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
