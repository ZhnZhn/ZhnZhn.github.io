import zhRemoveCategory from './zhRemoveCategory'
import zhCaption from './zhCaption'
import zhAddSeriaToYAxis from './zhAddSeriaToYAxis'
import zhToggleSeria from './zhToggleSeria'
import zhTogglePlotLines from './zhTogglePlotLines'
import zhToggle2H from './zhToggle2H'

import zhDataLabels from './zhDataLabels'
import zhSetPointWidth from './zhSetPointWidth'

import zhZoomX from './zhZoomX'
import zhIs from './zhIs'
import zhGet from './zhGet'
import zhDetailCharts from './zhDetailCharts'
import zhReflowCharts from './zhReflowCharts'
import zhUpdateSpacing from './zhUpdateSpacing'

const HighchartsZhn = (Highcharts) => {
  const { Chart } = Highcharts;
  zhCaption(Chart)
  zhTogglePlotLines(Chart)
  Object.assign(Chart.prototype, {
    zhAddSeriaToYAxis,
    //zhDetailCharts,
    zhReflowCharts,
    zhUpdateSpacing,

    zhDataLabels,
    zhSetPointWidth,

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
