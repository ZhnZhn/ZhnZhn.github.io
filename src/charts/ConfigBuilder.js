import {
  findMinY
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
  calcMinY,
  setYToPoints
} from './ChartFn';
import {
  crAreaConfig
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

import {
  fAddCaption,
  fAdd,
  fAddMinMax,
  fAddLegend,
  toConfig
} from './configBuilderFn';

import {
  assignTo
} from './configBuilderHelpers';

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
    assignTo(this.config, 'title', fTitle({ text }))
    return this;
  },
  addSubtitle(text) {
    assignTo(this.config, 'subtitle', fSubtitle({ text }))
    return this;
  },
  addCaption(title, subtitle){
    fAddCaption(title, subtitle)(this.config)
    return this;
  },

  addTooltip(tooltip) {
    this.config.tooltip = fTooltip(tooltip)
    return this;
  },

  add(propName, option){
    fAdd(propName, option)(this.config)
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
    fAddLegend(legend)(this.config)
    return this;
  },

  addMinMax(data, option){
    fAddMinMax(data, option)(this.config)
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

  toConfig(){
    return toConfig(this.config);
  }
})

export default ConfigBuilder
