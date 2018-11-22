import wrapExportChartLocal from './wrapExportChartLocal'
import wrapZhRemoveCategory from './wrapZhRemoveCategory'

const HighchartsZhn = (Highcharts) => {
  const { wrap, Chart } = Highcharts;  
  wrapExportChartLocal(wrap, Chart)
  wrapZhRemoveCategory(wrap, Chart)
};

export default HighchartsZhn
