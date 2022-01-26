import wrapExportChartLocal from './wrapExportChartLocal'
import zhRemoveCategory from './zhRemoveCategory'
import zhCaption from './zhCaption'
import zhAddSeriaToYAxis from './zhAddSeriaToYAxis'
import zhToggleSeria from './zhToggleSeria'
import zhTogglePlotLines from './zhTogglePlotLines'
import zhToggle2H from './zhToggle2H'
import zhEnableDataLabels from './zhEnableDataLabels'
import zhZoomX from './zhZoomX'
import zhIs from './zhIs'
import zhGet from './zhGet'
import zhDetailCharts from './zhDetailCharts'
import zhReflowCharts from './zhReflowCharts'
import zhUpdateSpacing from './zhUpdateSpacing'

const HighchartsZhn = (Highcharts) => {
  const { wrap, Chart } = Highcharts;
  wrapExportChartLocal(wrap, Chart)
  zhCaption(Chart)
  zhTogglePlotLines(Chart)
  Object.assign(Chart.prototype, {
    zhAddSeriaToYAxis,
    //zhDetailCharts,
    zhReflowCharts,
    zhUpdateSpacing,
    zhEnableDataLabels,
    zhToggleSeria,
    zhToggle2H,
    zhRemoveCategory,
    zhZoomX,
    ...zhIs,
    ...zhGet,
    ...zhDetailCharts
  })
};

export default HighchartsZhn
