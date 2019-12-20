
import Builder from '../../charts/ConfigBuilder'
import fns from './toFns'

const TITLE = "Source: IEX Cloud";

const TemplateScatter = function(impl) {
  if (!(this instanceof TemplateScatter)) {
    return (new TemplateScatter(impl));
  }
  this.impl = impl
};

Object.assign(TemplateScatter.prototype, {
  crKey(option){
    option.key = option.value
    return option.value;
  },

  toConfig(json, option){
    const { crSubtitle, crSeria } = this.impl;
    return Builder()
      .areaConfig({
         spacingTop: 25,
         isCrosshair: false
       })
      .addCaption(TITLE, crSubtitle(option))
      .addSeriaTo(0, crSeria(json, option))
      .add({ zhConfig: fns.crZhConfig(option) })
      .toConfig();
  },

  toSeries(json, option, chart){
    const {
           caption, color,
           crSeria
          } = this.impl
         , seria = crSeria(json, option);
    return fns.crToSeria({
      chart, seria, caption, color, option
    });
  }
});

export default TemplateScatter
