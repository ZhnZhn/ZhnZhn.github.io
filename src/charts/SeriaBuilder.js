import { fTooltip } from './Chart';
import { crSeriaConfig } from './ChartConfigFn';
import { CONFIG_TREE_MAP } from './TreeMapConfigFn';
import {
  fAddSeries,
  fAddSeriaBy
} from './configBuilderFn';

const CONFIG_SERIA = {
   //type: 'spline',
   visible: true,
   marker: {
    symbol: 'circle'
   }
}
, CONFIG_SCATTER = {
   type: 'scatter'
};


const SeriaBuilder = {

  initSeria(option){
    this._type = 'S'
    this.config = crSeriaConfig(option)
    return this;
  },
  splineSeria(option){
    return this.initSeria({...CONFIG_SERIA, ...option});
  },
  _seria(CONFIG, tooltip, option){
    this._type = 'S'
    this.config = { ...CONFIG, ...option }
    this.add('tooltip', fTooltip(tooltip))
    return this;
  },
  treeMapSeria(tooltip, option){
    return this._seria(CONFIG_TREE_MAP, tooltip, option);
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

  //INSEE
  addPoints(id, points, text){
    this.add({
      data: points,
      zhValueText: text ? text : id
    })
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
