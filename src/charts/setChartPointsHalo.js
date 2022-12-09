import Highcharts from 'highcharts';

const _crHaloOption = (
  is=false
) => ({
  plotOptions: {
    series: {
      states: {
        hover: {
          enabled: is
        }
      }
    }
  }
});

const setChartPointsHalo = (
  is
) => Highcharts.setOptions(_crHaloOption(is));

export default setChartPointsHalo
