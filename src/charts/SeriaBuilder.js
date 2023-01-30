import { fTooltip } from './Chart';
import {
  fAddSeries,
  fAddSeriaBy
} from './configBuilderFn';

const CONFIG_SCATTER = {
   type: 'scatter'
};

const SeriaBuilder = {
  _seria(CONFIG, tooltip, option){
    this._type = 'S'
    this.config = { ...CONFIG, ...option }
    this.add('tooltip', fTooltip(tooltip))
    return this;
  },
  scatterSeria(tooltip, option){
    return this._seria(CONFIG_SCATTER, tooltip, option);
  },

  addSeriaBy(index, obj) {
    fAddSeriaBy(index, obj)(this.config)
    return this;
  },
  addSeriaTo(index, seria) {
    this.config.series[index] = seria
    return this;
  },

  addSeries(series, isWithoutLegend=false){
    fAddSeries(series, isWithoutLegend)(this.config)
    return this;
  },

  toSeria(){
    return this.config;
  }

}

export default SeriaBuilder
