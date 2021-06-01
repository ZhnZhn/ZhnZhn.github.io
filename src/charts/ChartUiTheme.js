import Highcharts from 'highcharts';
import COLOR from '../constants/Color';

const _crAreaPlotOptions = (topColor, bottomColor) => ({
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

const ChartUiTheme = {
  setTheme: (isLighTheme) => {
    const bottomColor = isLighTheme
      ? COLOR.PLOT_G3
      : COLOR.PLOT_G2;
    Highcharts.setOptions(
      _crAreaPlotOptions(COLOR.PLOT_G1, bottomColor)
    )
  }
};

export default ChartUiTheme
