import Reflux from 'reflux';

import ChartActions, {ChartActionTypes} from '../actions/ChartActions';
import ComponentActions, {ComponentActionTypes} from '../actions/ComponentActions';
import BrowserActions, {BrowserActionTypes} from '../actions/BrowserActions';
import WatchActions from '../actions/WatchActions';

import {BrowserType, ModalDialog} from '../../constants/Type';

import Factory from '../logic/Factory';

import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import SettingSlice from './SettingSlice';
import WatchListSlice from './WatchListSlice';
import WithLimitRemaining from './WithLimitRemaining';

const CONSOLE_LOG_STYLE = 'color:rgb(237, 88, 19);';
const _fnLogLoadError = function({
  alertCaption, alertDescr, alertItemId
}){
  console.log('%c'+ alertCaption + ':' + alertItemId, CONSOLE_LOG_STYLE);
  console.log('%c' + alertDescr, CONSOLE_LOG_STYLE);
}


const ChartStore = Reflux.createStore({
  listenables : [ChartActions, ComponentActions, BrowserActions, WatchActions],
  charts : {},
  init(){
    this.initWatchList();
    this.listen(ChartActions.fnOnChangeStore);
  },

 createInitConfig(chartType){
   return {chartType: chartType, configs: [], isShow: true};
 },
 getConfigs(chartType){
   return this.charts[chartType];
 },
 isChartExist(chartType, key){
   if (!this.charts[chartType]){
     return false;
   }
   const configs = this.charts[chartType].configs;
   for (var i=0, max=configs.length; i<max; i++){
     if (configs[i].zhConfig.key === key){
       return true;
     }
   }
   return false;
 },
 showAlertDialog(option={}){
   option.modalDialogType = ModalDialog.ALERT;
   this.trigger(ComponentActionTypes.SHOW_MODAL_DIALOG, option);
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
       this.triggerWithLimitRemaining(config.zhConfig.limitRemaining);
     } else {
      this.charts[chartType] = this.createInitConfig(chartType);
      this.charts[chartType].configs.unshift(config);

      this.trigger(ChartActionTypes.LOAD_STOCK_COMPLETED);
      this.trigger(ChartActionTypes.INIT_AND_SHOW_CHART,
                  Factory.createChartContainer(chartType, browserType));
      this.triggerWithLimitRemaining(config.zhConfig.limitRemaining);            
    }

    this.trigger(BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
 },
 onLoadStockAdded(){
    this.trigger(ChartActionTypes.LOAD_STOCK_ADDED);
 },
 onLoadStockFailed(option){
   this.trigger(ChartActionTypes.LOAD_STOCK_FAILED, option);
   option.alertItemId = option.value;
   this.showAlertDialog(option);
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
     this.trigger(BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
   } else {
     this.charts[chartType] = this.createInitConfig(chartType);
     this.trigger(ChartActionTypes.INIT_AND_SHOW_CHART,
                  Factory.createChartContainer(chartType, browserType));
     this.trigger(BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
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
   this.trigger(BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
 },

 onCloseChartContainer(chartType, browserType){
   if (browserType !== BrowserType.WATCH_LIST){
     this.uncheckActiveCheckbox(chartType);
     this.setMenuItemClose(chartType, browserType);
     this.trigger(BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
   }
 },
 onCloseChartContainer2(chartType, browserType){
   this.trigger(ComponentActionTypes.CLOSE_CHART_CONTAINER_2, chartType);
 },

 ...BrowserSlice,
 ...ComponentSlice,
 ...SettingSlice,
 ...WatchListSlice,
 ...WithLimitRemaining

})

export default ChartStore
