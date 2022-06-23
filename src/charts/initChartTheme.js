import Highcharts from 'highcharts';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import HighchartsZhn from './plugin/zhn-highcharts';

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

import ChartTheme from './ChartTheme';

const initChartTheme = () => {
  HighchartsTreemap(Highcharts)
  HighchartsExporting(Highcharts)
  HighchartsOfflineExporting(Highcharts)

  HighchartsZhn(Highcharts)

  Highcharts.setOptions(ChartTheme)
};

export default initChartTheme
