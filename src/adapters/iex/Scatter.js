
import ConfigBuilder from '../../charts/ConfigBuilder'
import fns from './toFns'

const TITLE = "Source: IEX Platform";

const Scatter = function(impl) {
  if (!(this instanceof Scatter)) {
    return (new Scatter(impl));
  }
  this.impl = impl
};

Scatter.prototype = Object.assign(Scatter.prototype, {
  toConfig(json, option){
    const { crSubtitle, crSeria } = this.impl;
    return ConfigBuilder()
      .initBaseArea({ spacingTop: 25, isCrosshair: false })
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
    return fns.crToSeria(chart, seria, caption, color);
  }
});

export default Scatter
