import wrapExportChartLocal from './wrapExportChartLocal'
import zhRemoveCategory from './zhRemoveCategory'
import zhCaption from './zhCaption'
import zhAddSeriaToYAxis from './zhAddSeriaToYAxis'
import zhToggleSeria from './zhToggleSeria'
import zhTogglePlotLines from './zhTogglePlotLines'
import zhToggle2H from './zhToggle2H'

const HighchartsZhn = (Highcharts) => {
  const { wrap, Chart } = Highcharts;
  wrapExportChartLocal(wrap, Chart)
  zhRemoveCategory(Chart)
  zhCaption(Chart)
  zhAddSeriaToYAxis(Chart)
  zhToggleSeria(Chart)
  zhTogglePlotLines(Chart)
  zhToggle2H(Chart)
};

export default HighchartsZhn
