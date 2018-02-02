import Reflux from 'reflux';

import ChartActions, {ChartActionTypes as CHAT} from '../actions/ChartActions';
import ComponentActions, {ComponentActionTypes as CAT} from '../actions/ComponentActions';
import BrowserActions, {BrowserActionTypes as BAT} from '../actions/BrowserActions';
import AnalyticActions from '../actions/AnalyticActions';
import WatchActions from '../actions/WatchActions';

import { ModalDialog } from '../../constants/Type';

import Factory from '../logic/Factory';

import BrowserSlice from './BrowserSlice';
import ComponentSlice from './ComponentSlice';
import SettingSlice from './SettingSlice';
import AnalyticSlice from './AnalyticSlice';
import WatchListSlice from '../watch-list/WatchListSlice';
import WithLimitRemaining from './WithLimitRemaining';

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
    this.listen(ChartActions.fnOnChangeStore);
  },

 createInitConfig(chartType){
   return {
     chartType: chartType,
     configs: [],
     isShow: true
   };
 },
 getConfigs(chartType){
   return this.charts[chartType];
 },
 isChartExist(chartType, key){
   if (!this.charts[chartType]){
     return false;
   }
   const configs = this.charts[chartType].configs
       , _max = configs.length;
   let i = 0;
   for (; i<_max; i++){
     if (configs[i].zhConfig.key === key){
       return true;
     }
   }
   return false;
 },
 showAlertDialog(option={}){
   option.modalDialogType = ModalDialog.ALERT;
   this.trigger(CAT.SHOW_MODAL_DIALOG, option);
 },

 onLoadStock(){
   this.trigger(CHAT.LOAD_STOCK);
 },
 onLoadStockCompleted(option, config){
     const {
             chartType, browserType, conf,
             zhCompType
           } = option
         , { zhConfig={} } = config
         , { limitRemaining } = zhConfig;
     if (zhCompType){
       config.zhCompType = zhCompType;
     }

     this.addMenuItemCounter(chartType, browserType);

     const chartCont = this.charts[chartType];
     if (chartCont){
       chartCont.configs.unshift(config);
       chartCont.isShow = true;

       this.trigger(CHAT.LOAD_STOCK_COMPLETED, chartCont);
       this.triggerWithLimitRemaining(limitRemaining);
     } else {
      this.charts[chartType] = this.createInitConfig(chartType);
      this.charts[chartType].configs.unshift(config);

      this.trigger(CHAT.LOAD_STOCK_COMPLETED);
      this.trigger(CHAT.INIT_AND_SHOW_CHART,
         Factory.createChartContainer(
            chartType, browserType, conf
         )
      );
      this.triggerWithLimitRemaining(limitRemaining);
    }

    this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
    this.analyticSendEvent({
       eventAction : EVENT_ACTION.LOAD,
       eventLabel : chartType
     });
 },
 onLoadStockAdded(option={}){
    const { chartType } = option;
    this.trigger(CHAT.LOAD_STOCK_ADDED);
    this.analyticSendEvent({
       eventAction : EVENT_ACTION.ADD,
       eventLabel : chartType
     });
 },
 onLoadStockFailed(option){
   this.trigger(CHAT.LOAD_STOCK_FAILED, option);
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

   const chartCont = this.charts[chartType];
   if (chartCont){
     chartCont.isShow = true;
     this.trigger(CHAT.SHOW_CHART, chartCont);
     this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
   } else {
     this.charts[chartType] = this.createInitConfig(chartType);
     this.trigger(
       CHAT.INIT_AND_SHOW_CHART,
       Factory.createChartContainer(
          chartType, browserType, conf
        )
      );
     this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
   }

 },

 onCloseChart(chartType, browserType, chartId){

   this.minusMenuItemCounter(chartType, browserType);

   const chartCont = this.charts[chartType];
   chartCont.configs = chartCont.configs.filter(function(config){
     return config.zhConfig.id !== chartId;
   });

   if (this.activeChart && this.activeChart.options.zhConfig.id === chartId){
     this.activeChart = null;
     this.activeChart = null;
   }
   this.trigger(CHAT.CLOSE_CHART, chartCont);
   this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
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

 ...BrowserSlice,
 ...ComponentSlice,
 ...SettingSlice,
 ...AnalyticSlice,
 ...WatchListSlice,
 ...WithLimitRemaining

})

export default ChartStore
