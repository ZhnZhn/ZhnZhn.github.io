import Reflux from 'reflux';

import ChartActions, {ChartActionTypes} from '../actions/ChartActions';
import ComponentActions from '../actions/ComponentActions';

import ChartType from '../../constants/ChartType';

import Factory from '../logic/Factory';

import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import SettingSlice from './SettingSlice';

const ChartStore = Reflux.createStore({
  listenables : [ChartActions, ComponentActions],
  charts : {},
  init(){
   },

 createInitConfig(chartType){
   return {chartType: chartType, configs: [], isShow: true};
 },
 getConfigs(chartType){
   return this.charts[chartType];
 },
 isChartExist(chartType, chartId){
   if (!this.charts[chartType]){
     return false;
   }
   const arr = this.charts[chartType].configs;
   for (var i=0, max=arr.length; i<max; i++){
     if (arr[i].stockTicket === chartId){
       return true;
     }
   }
   return false;
 },

 onLoadStockCompleted(chartType, config){
   const chartCont = this.charts[chartType];
   if (chartCont){
     chartCont.configs.unshift(config);
     chartCont.isShow = true;
     this.trigger(ChartActionTypes.LOAD_STOCK_COMPLETED, chartCont);
   } else {
     this.charts[chartType] = this.createInitConfig(chartType);
     this.charts[chartType].configs.unshift(config);
     this.trigger(ChartActionTypes.INIT_AND_SHOW_CHART,
                  Factory.createChartContainer(chartType));
   }
 },

 onShowChart(chartType){

   const chartCont = this.charts[chartType];
   if (chartCont){
     chartCont.isShow = true;
     this.trigger(ChartActionTypes.SHOW_CHART, chartCont);
   } else {
     this.charts[chartType] = this.createInitConfig(chartType);
     this.trigger(ChartActionTypes.INIT_AND_SHOW_CHART,
                  Factory.createChartContainer(chartType));
   }

 },

 onCloseChart(chartType, chartId){
   const chartCont = this.charts[chartType];

   chartCont.configs = chartCont.configs.filter(function(config){
     return config.stockTicket !== chartId;
   });
   this.trigger(ChartActionTypes.CLOSE_CHART, chartCont);
 },

 ...BrowserSlice,
 ...ComponentSlice,
 ...SettingSlice

})

export default ChartStore
