import {
  fAddSeries,
  fAddSeriaBy
} from './configBuilderFn';

const SeriaBuilder = {
  addSeriaBy(index, obj) {
    fAddSeriaBy(index, obj)(this.config)
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
