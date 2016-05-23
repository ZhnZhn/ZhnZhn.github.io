import Reflux from 'reflux';

import ChartActions, {ChartActionTypes} from '../actions/ChartActions';
import ComponentActions, {ComponentActionTypes} from '../actions/ComponentActions';
import WatchActions from '../actions/WatchActions';

import ChartType from '../../constants/ChartType';
import {BrowserType, ModalDialog} from '../../constants/Type';

import Factory from '../logic/Factory';

import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import SettingSlice from './SettingSlice';
import WatchListSlice from './WatchListSlice';

const _consoleLogStyle = 'color:rgb(237, 88, 19);';
const _fnLogLoadError = function({caption, descr, chartId}){
  console.log('%c'+ caption + ':' + chartId, _consoleLogStyle);
  console.log('%c' + descr, _consoleLogStyle);
}


const ChartStore = Reflux.createStore({
  listenables : [ChartActions, ComponentActions, WatchActions],
  charts : {},
  init(){
    this.initWatchList()
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
   const configs = this.charts[chartType].configs;
   for (var i=0, max=configs.length; i<max; i++){
     if (configs[i].zhConfig.id === chartId){
       return true;
     }
   }
   return false;
 },

 onLoadStock(){
   this.trigger(ChartActionTypes.LOAD_STOCK);
 },
 onLoadStockCompleted(chartType, browserType, config){
     if (browserType !== BrowserType.WATCH_LIST){
       this.addMenuItemCounter(chartType, browserType);
     }

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
 onLoadStockAdded(){
    this.trigger(ChartActionTypes.LOAD_STOCK_ADDED);
 },
 onLoadStockFailed(option){
   this.trigger(ChartActionTypes.LOAD_STOCK_FAILED, option);
   option.modalDialogType = ModalDialog.ALERT;
   this.trigger(ComponentActionTypes.SHOW_MODAL_DIALOG, option);
   _fnLogLoadError(option);
 },

 onShowChart(chartType, browserType){
   if (browserType !== BrowserType.WATCH_LIST){
     this.setMenuItemOpen(chartType, browserType);
   }

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
   if (browserType !== BrowserType.WATCH_LIST){
     this.minusMenuItemCounter(chartType, browserType);
   }

   const chartCont = this.charts[chartType];
   chartCont.configs = chartCont.configs.filter(function(config){
     return config.zhConfig.id !== chartId;
   });

   if (this.activeChart && this.activeChart.options.zhConfig.id === chartId){
     this.activeChart = null;
     this.activeChart = null;
   }
   this.trigger(ChartActionTypes.CLOSE_CHART, chartCont);
   this.trigger(ComponentActionTypes.UPDATE_BROWSER_MENU, browserType);
 },

 onCloseChartContainer(chartType, browserType){
   if (browserType !== BrowserType.WATCH_LIST){
     this.setMenuItemClose(chartType, browserType);
     this.trigger(ComponentActionTypes.UPDATE_BROWSER_MENU, browserType);
   }
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
