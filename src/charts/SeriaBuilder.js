import { findMinY } from '../math/seriaFn';

import { fTooltip } from './Chart';
import { getSeriaColorByIndex } from './ChartTheme';
import { crSeriaConfig } from './ChartConfigFn';
import { CONFIG_TREE_MAP } from './TreeMapConfigFn';
import {
  crLegendItem,
} from './seriaBuilderHelpers';
import {
  fAddSeries
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

const _isArr = Array.isArray
, _assign = Object.assign;

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
  stockSeria(id, data){
    return this
      .initSeria({ minY: findMinY(data) })
      .addPoints(id, data);
  },

  addSeriaBy(index, obj) {
    if (this.config.series[index]) {
      _assign(this.config.series[index], obj)
    } else {
      this.config.series.push(obj)
    }
    return this;
  },
  addSeriaTo(index, seria) {
    this.config.series[index] = seria
    return this;
  },

  _addSeriaPoints(points, { maxVisible=6 }={}){
    const _legend = [];
    points.forEach((data, index) => {
      const is = index<maxVisible ? true : false
          , color = getSeriaColorByIndex(index)
          , { seriaName } = data;
      _legend.push(crLegendItem({
        index, color, name: seriaName, is
      }))
      this.addSeriaBy(index, {
           type: 'spline',
           data: data,
           name: seriaName,
           zhValueText: seriaName,
           visible: is
        })
    })
    if (_legend.length !== 0){
      this.addLegend(_legend);
    }
    return this;
  },

  _addPointsToConfig(points){
    if (points[0]
        && _isArr(points[0])
        && points[0][0]
        && typeof points[0][0] !== 'number'
    ) {
      this._addSeriaPoints(points)
    } else {
      this.addSeriaBy(0, {
         type: 'spline',
         data: points
      });
    }
  },

  addPoints(id, points, text){
    if (this._type !== 'S') {
      this._addPointsToConfig(points)
    } else {
      this.add({
        data: points,
        zhValueText: text ? text : id
      })
    }
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
