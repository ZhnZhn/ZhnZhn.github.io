
const _isArr = Array.isArray;

const zhDetailCharts = {
  zhGetDetailCharts() {
    return (this.options || {}).zhDetailCharts;
  },
  zhAddDetailChart(detailChart) {
    const _charts = this.zhGetDetailCharts();
    if (_isArr(_charts)) {
     _charts.push(detailChart)
    }
  },
  zhRemoveDetailChart(detailChart) {
    const _charts = this.zhGetDetailCharts();
    if (_isArr(_charts)){
      this.options.zhDetailCharts = _charts
       .filter(chart => chart !== detailChart)
    }
  }
};

export default zhDetailCharts
