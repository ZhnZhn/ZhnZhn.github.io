import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

import HighchartsZhn from './plugin/zhn-highcharts';

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

import { MSG_OFFLINE } from '../constants/Msg';
import { ChartTheme } from './ChartTheme';

export const initChartTheme = () => {
  HighchartsExporting(Highcharts)
  HighchartsOfflineExporting(Highcharts)

  HighchartsZhn(Highcharts)

  Highcharts.setOptions(ChartTheme)
};

export const loadTreeMap = () => {
  /*eslint-disable no-undef */
  if ( process.env.NODE_ENV === '_development' ) {
    //
    return import("highcharts/modules/treemap")
      .then(module => (module.default)(Highcharts))
      .catch(err => console.log(MSG_OFFLINE));
 /*eslint-enable no-undef */
 }
 return import(
    /* webpackChunkName: "treemap" */
    /* webpackMode: "lazy" */
     "highcharts/modules/treemap"
    )
   .then(module => (module.default)(Highcharts))
   .catch(err => console.log(MSG_OFFLINE));
}
