import {
  STACKED_SPACING_TOP,
  SPACING_BOTTOM,
  STACKED_HEIGHT,
  fPlotOptionsColumn,
  fPlotOptionsArea,
  fTitle,
  fSubtitle,
  fTooltip,
  fCreditsRightBottom,
  fCrosshair,
  fXAxisOpposite,
  fYAxisOpposite,
  fPlotOptionsSeries,
  fLegend
} from './Chart';
import { tooltipSparkStackedArea } from './Tooltip';

const _crPlotOption = (
  type,
  stacking
) => type === 'column'
  ? { column: fPlotOptionsColumn({ stacking }) }
  : { area: fPlotOptionsArea({ stacking }) };

const crStackedConfig = ({
  type='area',
  stacking='normal',
  categories=[]
}) => ({
  zhSeries: {
    count: 0
  },
  zhDetailCharts: [],

  credits: fCreditsRightBottom(),
  chart: {
    type: type,
    spacingTop: STACKED_SPACING_TOP,
    spacingBottom: SPACING_BOTTOM,
    height: STACKED_HEIGHT,
    zoomType: 'xy'
  },
  title: fTitle(),
  subtitle: fSubtitle(),
  tooltip: fTooltip(tooltipSparkStackedArea),

  xAxis: fXAxisOpposite({
    type: "category",
    categories: categories,
    startOnTick: false,
    min: 1,
    crosshair: fCrosshair()
  }),
  yAxis: fYAxisOpposite(),

  plotOptions: {
     ..._crPlotOption(type, stacking),
     series: fPlotOptionsSeries()
 },
 legend: fLegend()
})

export default crStackedConfig
