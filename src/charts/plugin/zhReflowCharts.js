import calcYAxisOffset from '../calcYAxisOffset';

const _isArr = Array.isArray;

function zhReflowCharts(isAnimate, width) {
  const _isAnimate = isAnimate && this.zhIsAnimation()
  , zhDetailCharts = this.zhGetDetailCharts();
  this.setSize(width, void 0, _isAnimate)
  if (_isArr(zhDetailCharts)) {
    const spacingLeft = calcYAxisOffset(this);
    zhDetailCharts.forEach(chart => {
      if (spacingLeft) {
        chart.update({ chart: { spacingLeft } }, false)
      }
      chart.setSize(width, void 0, _isAnimate)
    })
  }
}

export default zhReflowCharts
