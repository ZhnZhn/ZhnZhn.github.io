import Highcharts from 'highcharts';
import {
  COLOR_PLOT_G1,
  COLOR_PLOT_G2,
  COLOR_PLOT_G3
} from '../constants/Color';

const _crAreaPlotOptions = (
  topColor,
  bottomColor
) => ({
  plotOptions: {
     area: {
      fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
             [0, topColor],
             [1, bottomColor]
          ]
       }
     }
  }
});


export const setChartTheme = (
  isLighTheme
) => {
  const bottomColor = isLighTheme
    ? COLOR_PLOT_G3
    : COLOR_PLOT_G2;
  Highcharts.setOptions(
    _crAreaPlotOptions(COLOR_PLOT_G1, bottomColor)
  )
}

const _crLabelsStyleColor = (
  color
) => ({
  labels: { style: { color }}
})
, DF_AXIS_LABEL_COLOR = 'grey';
export const setAxisLabelsColor = (
  xAxisColor=DF_AXIS_LABEL_COLOR,
  yAxisColor=DF_AXIS_LABEL_COLOR
) => {
  Highcharts.setOptions({
    xAxis: _crLabelsStyleColor(xAxisColor),
    yAxis: _crLabelsStyleColor(yAxisColor)
  })
}
