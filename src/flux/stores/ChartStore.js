import Reflux from 'reflux';

import ChartActions, {ChartActionTypes} from '../actions/ChartActions';
import ComponentActions, {ComponentActionTypes} from '../actions/ComponentActions';

import ChartType from '../../constants/ChartType';

import Factory from '../logic/Factory';

import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import SettingSlice from './SettingSlice';
import WatchListSlice from './WatchListSlice';

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

 onLoadStockCompleted(chartType, browserType, config){
   this.addMenuItemCounter(chartType, browserType);

   const chartCont = this.charts[chartType];
   if (chartCont){
     chartCont.configs.unshift(config);
     chartCont.isShow = true;
     this.trigger(ChartActionTypes.LOAD_STOCK_COMPLETED, chartCont);
   } else {
     this.charts[chartType] = this.createInitConfig(chartType);
     this.charts[chartType].configs.unshift(config);
     this.trigger(ChartActionTypes.INIT_AND_SHOW_CHART,
                  Factory.createChartContainer(chartType, browserType));
   }

   this.trigger(ComponentActionTypes.UPDATE_BROWSER_MENU, browserType);
 },

 onShowChart(chartType, browserType){

   this.setMenuItemOpen(chartType, browserType);

   const chartCont = this.charts[chartType];
   if (chartCont){
     chartCont.isShow = true;
     this.trigger(ChartActionTypes.SHOW_CHART, chartCont);
     this.trigger(ComponentActionTypes.UPDATE_BROWSER_MENU, browserType);
   } else {
     this.charts[chartType] = this.createInitConfig(chartType);
     this.trigger(ChartActionTypes.INIT_AND_SHOW_CHART,
                  Factory.createChartContainer(chartType, browserType));
     this.trigger(ComponentActionTypes.UPDATE_BROWSER_MENU, browserType);
   }

 },

 onCloseChart(chartType, browserType, chartId){
   this.minusMenuItemCounter(chartType, browserType);

   const chartCont = this.charts[chartType];
   chartCont.configs = chartCont.configs.filter(function(config){
     return config.stockTicket !== chartId;
   });
   this.trigger(ChartActionTypes.CLOSE_CHART, chartCont);
   this.trigger(ComponentActionTypes.UPDATE_BROWSER_MENU, browserType);
 },

 onCloseChartContainer(chartType, browserType){
   this.setMenuItemClose(chartType, browserType);
   this.trigger(ComponentActionTypes.UPDATE_BROWSER_MENU, browserType);
 },
 onCloseChartContainer2(chartType, browserType){
   this.trigger(ComponentActionTypes.CLOSE_CHART_CONTAINER_2, chartType);
 },

 ...BrowserSlice,
 ...ComponentSlice,
 ...SettingSlice,
 ...WatchListSlice

})

export default ChartStore
