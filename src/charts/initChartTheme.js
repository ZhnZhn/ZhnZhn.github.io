import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import HighchartsZhn from './plugin/zhn-highcharts';

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

import { logErrMsg } from '../routers/asyncFn';
import { loadHighchartsTreeMap } from '../routers/loadAsset';
import { ChartTheme } from './ChartTheme';

export const initChartTheme = () => {
  HighchartsExporting(Highcharts)
  HighchartsOfflineExporting(Highcharts)

  HighchartsZhn(Highcharts)

  Highcharts.setOptions(ChartTheme)
};

export const loadTreeMap = () => loadHighchartsTreeMap()
  .then(moduleDefault => moduleDefault(Highcharts))
  .catch(logErrMsg)
