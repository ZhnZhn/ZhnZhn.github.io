import ChartConfig from './ChartConfig'

const C = {
  TYPE_A: 'A',
  TYPE_B: 'B'
};

const _crLegendItem = (index, color, name, is=false) => ({
  index, color, name,
  isVisible: is
});

const SeriaBuilder = {

  initBaseSeria(){
    this.config = ChartConfig.fSeries()
    return this;
  },

  addSeriaBy(index, obj) {
    if (this.config.series[index]) {
      Object.assign(this.config.series[index], obj)
    } else {
      this.config.series.push(obj)
    }
    return this;
  },

  addSeriesWithLegend(id, points, maxVisible=6){
    const _legend = [];
    points.forEach((data, i) => {
      const _isShow = i<maxVisible ? true : false
          , _color = ChartConfig.getColor(i)
          , { seriaName } = data;
      _legend.push(_crLegendItem(i, _color, seriaName, _isShow))
      this.addSeriaBy(i, {
           type: 'spline',
           data: data,
           name: seriaName,
           zhValueText: seriaName,
           zhSeriaId: id + '_' + i,
           visible: _isShow
        })
    })
    return this.add('zhConfig', {
      isWithLegend: true,
      legend: _legend
    });
  },

  addPoints(id, { type, points }){
    switch(type){
      case C.TYPE_A:
        return this.addSeriaBy(0, {
           type: 'spline',
           data: points,
           zhSeriaId: id
        });
      case C.TYPE_B:
        return this.addSeriesWithLegend(id, points)
      default: return this;
    }
  }
}

export default SeriaBuilder
