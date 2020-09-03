import Chart from './Chart';
import Tooltip from './Tooltip';

const _crPlotOption = (type, stacking) => type === 'column'
  ? { column: Chart.fPlotOptionsColumn({ stacking }) }
  : { area: Chart.fPlotOptionsArea({ stacking }) };

const crStackedConfig = ({
  type='area',
  stacking='normal',
  categories=[]
}) => ({
  zhSeries: {
    count: 0
  },
  zhDetailCharts: [],

  credits: Chart.fCreditsRightBottom(),
  chart: {
    type: type,
    spacingTop: Chart.STACKED_SPACING_TOP,
    spacingBottom: Chart.SPACING_BOTTOM,
    height: Chart.STACKED_HEIGHT,
    zoomType: 'xy',
    resetZoomButton: Chart.fResetZoomButton()
  },
  title: Chart.fTitle({ y:Chart.STACKED_TITLE_Y }),
  subtitle: Chart.fSubtitle({ y:Chart.STACKED_SUBTITLE_Y }),
  tooltip: Chart.fTooltip(Tooltip.sparkStackedArea),

  xAxis: Chart.fXAxisOpposite({
    type: "category",
    categories: categories,
    startOnTick: false,
    min: 1,
    crosshair: Chart.fCrosshair()
  }),
  yAxis: Chart.fYAxisOpposite(),

  plotOptions: {
     ..._crPlotOption(type, stacking),
     series: Chart.fPlotOptionsSeries()
 },
 legend: Chart.fLegend()
})

export default crStackedConfig
