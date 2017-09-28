import Chart from './Chart'
import ChartConfig from './ChartConfig'

import SeriaBuilder from './SeriaBuilder'

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

  toConfig(){
    return this.config;
  }
}

export default ConfigBuilder
