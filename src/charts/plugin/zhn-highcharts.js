import wrapExportChartLocal from './wrapExportChartLocal'
import zhRemoveCategory from './zhRemoveCategory'
import zhCaption from './zhCaption'
import zhAddSeriaToYAxis from './zhAddSeriaToYAxis'
import zhToggleSeria from './zhToggleSeria'
import zhTogglePlotLines from './zhTogglePlotLines'
import zhToggle2H from './zhToggle2H'
import zhEnableDataLabels from './zhEnableDataLabels'
import zhIsDaily from './zhIsDaily'
import zhIsAnimation from './zhIsAnimation'
import zhGetId from './zhGetId'
import zhGetDetailCharts from './zhGetDetailCharts'
import zhGetFromToDates from './zhGetFromToDates'
import zhZoomX from './zhZoomX'

const HighchartsZhn = (Highcharts) => {
  const { wrap, Chart } = Highcharts;
  wrapExportChartLocal(wrap, Chart)
  zhCaption(Chart)
  zhTogglePlotLines(Chart)
  Object.assign(Chart.prototype, {
    zhRemoveCategory,
    zhAddSeriaToYAxis,
    zhToggleSeria,
    zhToggle2H,
    zhEnableDataLabels,
    zhIsDaily,
    zhIsAnimation,
    zhGetId,
    zhGetDetailCharts,
    zhGetFromToDates,
    zhZoomX
  })
};

export default HighchartsZhn
