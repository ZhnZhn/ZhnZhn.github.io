import Reflux from 'reflux';

import ChartActions, {ChartActionTypes as CHAT} from '../actions/ChartActions';
import ComponentActions, {ComponentActionTypes as CAT} from '../actions/ComponentActions';
import BrowserActions, {BrowserActionTypes as BAT} from '../actions/BrowserActions';
import { T as LPA } from '../actions/LoadingProgressActions'
import AnalyticActions from '../actions/AnalyticActions';
import WatchActions from '../actions/WatchActions';

import { ModalDialog } from '../../constants/Type';

import Factory from '../logic/Factory';

import ChartLogic from './ChartLogic'

import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import SettingSlice from './SettingSlice';
import AnalyticSlice from './AnalyticSlice';
import WatchListSlice from '../watch-list/WatchListSlice';
import WithLimitRemaining from './WithLimitRemaining';
import WithLoadingProgress from './WithLoadingProgress'

const EVENT_ACTION = {
  LOAD : 'Load',
  ADD  : 'Add'
}

const CONSOLE_LOG_STYLE = 'color:rgb(237, 88, 19);';
const _fnLogLoadError = function({
  alertCaption, alertDescr, alertItemId
}){
  console.log('%c'+ alertCaption + ':' + alertItemId, CONSOLE_LOG_STYLE);
  console.log('%c' + alertDescr, CONSOLE_LOG_STYLE);
}

const {
  initChartSlice, isChartExist, removeConfig,
  sortBy, reverseConfigs
} = ChartLogic;

const ChartStore = Reflux.createStore({
  listenables : [
     ChartActions,
     ComponentActions,
     BrowserActions,
     AnalyticActions,
     WatchActions
  ],
  charts : {},
  init(){
    this.initWatchList();
    this.listenLoadingProgress(ChartActions.fnOnChangeStore);
  },

 getConfigs(chartType){
   return this.charts[chartType];
 },
 isChartExist(chartType, key){
   return isChartExist(this.charts, chartType, key);
 },
 showAlertDialog(option={}){
   option.modalDialogType = ModalDialog.ALERT;
   this.trigger(CAT.SHOW_MODAL_DIALOG, option);
 },

 onLoadStock(){
   //this.trigger(CHAT.LOAD_STOCK);
   this.triggerLoadingProgress(LPA.LOADING)
 },
 onLoadStockCompleted(option, config){
     const {
             chartType, browserType, conf,
             zhCompType, limitRemaining
           } = option;
     if (zhCompType){
       config.zhCompType = zhCompType;
     }

     this.addMenuItemCounter(chartType, browserType);

     const chartSlice = this.charts[chartType];
     if (chartSlice){
       chartSlice.configs.unshift(config);
       chartSlice.isShow = true;
       this.trigger(CHAT.LOAD_STOCK_COMPLETED, chartSlice);
     } else {
       initChartSlice(this.charts, chartType, config)
       //this.trigger(CHAT.LOAD_STOCK_COMPLETED);
       this.trigger(CHAT.INIT_AND_SHOW_CHART,
         Factory.createChartContainer(
            chartType, browserType, conf
         )
       );
    }
    this.triggerLoadingProgress(LPA.LOADING_COMPLETE)
    this.triggerLimitRemaining(limitRemaining);
    this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
    this.analyticSendEvent({
       eventAction : EVENT_ACTION.LOAD,
       eventLabel : chartType
     });
 },
 onLoadStockAdded(option={}){
    const { chartType } = option;
    //this.trigger(CHAT.LOAD_STOCK_ADDED);
    this.triggerLoadingProgress(LPA.LOADING_COMPLETE)
    this.analyticSendEvent({
       eventAction : EVENT_ACTION.ADD,
       eventLabel : chartType
     });
 },
 onLoadStockFailed(option){
   //this.trigger(CHAT.LOAD_STOCK_FAILED, option);
   this.triggerLoadingProgress(LPA.LOADING_FAILED)
   const { alertItemId, value } = option;
   option.alertItemId = alertItemId || value;
   this.showAlertDialog(option);
   _fnLogLoadError(option);
 },

 onLoadStockByQuery(){
   this.onLoadStock()
 },
 onLoadStockByQueryCompleted(option, config){
   this.onLoadStockCompleted(option, config)
 },
 onLoadStockByQueryFailed(option){
   this.onLoadStockFailed(option)
 },


 onShowChart(chartType, browserType, conf){
   this.setMenuItemOpen(chartType, browserType);

   const chartSlice = this.charts[chartType];
   if (chartSlice){
     chartSlice.isShow = true;
     this.trigger(CHAT.SHOW_CHART, chartSlice);
   } else {
     initChartSlice(this.charts, chartType)
     this.trigger(
       CHAT.INIT_AND_SHOW_CHART,
       Factory.createChartContainer(
          chartType, browserType, conf
        )
      );
   }
   this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);

 },

 resetActiveChart(id){
   if (
     this.activeChart &&
     this.activeChart.options.zhConfig.id === id
   ){
     this.activeChart = null;
   }
 },

 onCloseChart(chartType, browserType, chartId){
   const {
           chartSlice, isRemoved
         } = removeConfig(this.charts, chartType, chartId)

   if (isRemoved) {
     this.resetActiveChart(chartId)
     this.minusMenuItemCounter(chartType, browserType);

     this.trigger(CHAT.CLOSE_CHART, chartSlice);
     this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
   }
 },

 onCloseChartContainer(chartType, browserType){
   this.uncheckActiveCheckbox(chartType);
   if(this.isWithItemCounter(browserType)){
     this.setMenuItemClose(chartType, browserType);
     this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
   }
 },
 onCloseChartContainer2(chartType, browserType){
   this.trigger(CAT.CLOSE_CHART_CONTAINER_2, chartType);
 },

 onCopy(chart){
   this.fromChart = chart
 },
 getCopyFromChart(){
   return this.fromChart;
 },

 onSortBy(chartType, by){
   const chartSlice = sortBy(this.charts, chartType, by)
   this.trigger(CHAT.SHOW_CHART, chartSlice);   
 },
 onReverseCharts(chartType){
   const chartSlice = reverseConfigs(this.charts, chartType)
   this.trigger(CHAT.SHOW_CHART, chartSlice);
 },

 ...BrowserSlice,
 ...ComponentSlice,
 ...SettingSlice,
 ...AnalyticSlice,
 ...WatchListSlice,
 ...WithLimitRemaining,
 ...WithLoadingProgress

})

export default ChartStore
