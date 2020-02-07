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

const HighchartsZhn = (Highcharts) => {
  const { wrap, Chart } = Highcharts;
  wrapExportChartLocal(wrap, Chart)
  zhCaption(Chart)
  zhTogglePlotLines(Chart)
  Object.assign(Chart.prototype, {
    zhAddSeriaToYAxis,
    zhEnableDataLabels,
    zhToggleSeria,
    zhToggle2H,
    zhRemoveCategory,
    zhZoomX,
    ...zhIs,
    ...zhGet    
  })
};

export default HighchartsZhn
