import Chart from './Chart'
import ChartConfig from './ChartConfig'

const C = {
  SPLINE: {
     type: 'spline',
     visible: true,
     marker: {
       symbol: 'circle'
     }
  },
  AREA_RANGE: {
    type: 'arearange',
    color: '#7cb5ec',
    fillColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
         [0, "rgba(69, 114, 167, 1)"],
         [1, "rgba(2, 0, 0, 0)"]
      ]
    },
    marker: {
      radius: 0
    }
  },
  TREE_MAP: {
        //zhSeriaId : zhSeriaId,
        type : 'treemap',
        layoutAlgorithm: 'squarified',
        //layoutAlgorithm : 'sliceAndDice',
        borderColor : 'gray',
        dataLabels : {
          align : 'left',
          verticalAlign : 'top',
          style : {
            fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            color : 'black',
            textShadow: 'none'
          }
        },
        //data : data,
        states : {
          hover : {
            borderColor : 'yellow',
            brightness: 0
          }
        }
    },
    SCATTER: {
      type: 'scatter'
    }
};

const _crLegendItem = ({ index, color, name, is=false }) => ({
  index, color, name,
  isVisible: is
});

const _addSeriesImpl = (to, series) => {
  const _legend = [];
  series.forEach((seria, index) => {
    const { color, zhValueText='', visible } = seria;
    to.push(seria)
    _legend.push(_crLegendItem({
       index, color, name:zhValueText, is:visible
     }))
  })
  return _legend;
}

const SeriaBuilder = {

  initBaseSeria(option){
    this._type = 'S'
    this.config = Object.assign(ChartConfig.fSeries(), option)
    return this;
  },
  initSpline(option){
    return this.initBaseSeria({ ...C.SPLINE, ...option });
  },
  _initBaseSeria(BASE, tooltip, option){
    this._type = 'S'
    this.config = { ...BASE, ...option }
    this.add('tooltip', Chart.fTooltip(tooltip))
    return this;
  },
  initAreaRange(tooltip, option){
    return this._initBaseSeria(C.AREA_RANGE, tooltip, option);
  },
  initTreeMap(tooltip, option){
    return this._initBaseSeria(C.TREE_MAP, tooltip, option);
  },
  scatterSeria(tooltip, option){
    return this._initBaseSeria(C.SCATTER, tooltip, option);
  },

  addLegend(legend){
    return this.add('zhConfig', {
      legend, isWithLegend: true,
    });
  },

  addSeriaBy(index, obj) {
    if (this.config.series[index]) {
      Object.assign(this.config.series[index], obj)
    } else {
      this.config.series.push(obj)
    }
    return this;
  },
  addSeriaTo(index, seria) {
    this.config.series[index] = seria
    return this;
  },

  addSeriaPoints(id, points, { maxVisible=6, isWithLegend=false }={}){
    const _legend = [];
    points.forEach((data, index) => {
      const is = index<maxVisible ? true : false
          , color = ChartConfig.getColor(index)
          , { seriaName } = data;
      _legend.push(_crLegendItem({
        index, color, name: seriaName, is
      }))
      this.addSeriaBy(index, {
           type: 'spline',
           data: data,
           name: seriaName,
           zhValueText: seriaName,
           zhSeriaId: id + '_' + index,
           visible: is
        })
    })
    if (!isWithLegend){
      this.addLegend(_legend);
    }
    return this;
  },

  _addPointsToConfig(id, points){
    if (points[0]
        && Array.isArray(points[0])
        && points[0][0]
        && typeof points[0][0] !== 'number'
    ) {
      this.addSeriaPoints(id, points)
    } else {
      this.addSeriaBy(0, {
         type: 'spline',
         data: points,
         zhSeriaId: id
      });
    }
  },

  addPoints(id, points, text){
    if (this._type !== 'S') {
      this._addPointsToConfig(id, points)
    } else {
      this.add({
        data: points,
        zhSeriaId: id,
        zhValueText: text ? text : id
      })
    }
    return this;
  },

  clearSeries(){
    this.config.series = []
    return this;
  },

  addSeries(series, isWithoutLegend=false){
    const _to = Array.isArray(this.config.series)
             ? this.config.series
             : this.config.series = [];
    if (Array.isArray(series)){
      const _legend = _addSeriesImpl(_to, series);
      if (!isWithoutLegend) {
        this.addLegend(_legend)
      }
    } else if (typeof series === 'object') {
      _to[0] = series
    }
    return this;
  },

  toSeria(){
    return this.config;
  }

}

export default SeriaBuilder
