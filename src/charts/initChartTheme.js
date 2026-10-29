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

const _addFixesTo = (TO_CHARTS) => {
  //https://github.com/advisories/GHSA-5793-x2q3-c3q7
  //(5.0.0-13.0.2)
  ((t)=>{if(t&&t.Chart&&!t.Chart.prototype.creditsHrefPatched){let r=t.Chart.prototype,e=r.addCredits;r.addCredits=function(n){let o=t.merge(!0,this.options.credits,n);return o&&o.href&&!c(o.href)&&delete o.href,e.call(this,o)},r.creditsHrefPatched=!0}function c(r){const e=["https://"];return"string"==typeof r&&e.some(function(t){return 0===r.indexOf(t)})}})(TO_CHARTS);

  //https://github.com/advisories/GHSA-rmqc-xvr3-v46c
  //(6.1.0-13.0.2)
  ((H)=>{const X = H.isObject;H.Point.prototype.setNestedProperty = function setNestedProperty(t,e,i){let s=i.split(".");return s.some(t=>"__proto__"===t||"constructor"===t)||s.reduce(function(t,i,s,o){let r=o.length-1===s;return t[i]=r?e:X(t[i],!0)?t[i]:{},t[i]},t),t};})(TO_CHARTS);
}

export const initChartTheme = () => {
  HighchartsExporting(Highcharts)
  HighchartsOfflineExporting(Highcharts)

  HighchartsZhn(Highcharts)

  Highcharts.setOptions(ChartTheme)

  _addFixesTo(Highcharts)
};

export const loadTreeMap = () => loadHighchartsTreeMap()
  .then(moduleDefault => moduleDefault(Highcharts))
  .catch(logErrMsg)
