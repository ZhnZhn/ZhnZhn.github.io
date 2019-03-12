import wrapExportChartLocal from './wrapExportChartLocal'
import wrapZhRemoveCategory from './wrapZhRemoveCategory'
import wrapZhCaption from './wrapZhCaption'


const HighchartsZhn = (Highcharts) => {
  const { wrap, Chart } = Highcharts;
  wrapExportChartLocal(wrap, Chart)
  wrapZhRemoveCategory(wrap, Chart)
  wrapZhCaption(wrap, Chart)  
};

export default HighchartsZhn
