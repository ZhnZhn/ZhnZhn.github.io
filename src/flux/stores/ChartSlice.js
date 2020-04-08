import { T as LPA } from '../actions/LoadingProgressActions'
import { ChartActionTypes as CHAT } from '../actions/ChartActions';
import { BrowserActionTypes as BAT } from '../actions/BrowserActions';

import ChartLogic from './chart/ChartLogic'

const {
  isChartExist,
  loadConfig, showChart,
  removeConfig,
  toTop,
  updateMovingValues,
  sortBy,
  removeAll,
  checkBrowserChartTypes,
  scanPostAdded,
  setAlertItemIdTo
} = ChartLogic;

const CONSOLE_LOG_STYLE = 'color:rgb(237, 88, 19);';
const _fnLogLoadError = function({
  alertCaption, alertDescr, alertItemId
}){
  console.log('%c'+ alertCaption + ':' + alertItemId, CONSOLE_LOG_STYLE);
  console.log('%c' + alertDescr, CONSOLE_LOG_STYLE);
}

const ChartSlice = {
  charts : {},

  getConfigs(chartType){
    return this.charts[chartType];
  },
  isChartExist(option){
    checkBrowserChartTypes(this, option)
    const { chartType, key } = option;
    return isChartExist(this.charts, chartType, key);
  },

  onLoadStock(){
    this.triggerLoadingProgress(LPA.LOADING)
  },
  onLoadStockCompleted(option, config){
      const {
        chartType, browserType,
        dialogConf,
        limitRemaining
      } = option;

      this.addMenuItemCounter(chartType, browserType);

      const _dialogConf = dialogConf
        || this.getDialogConf(void 0, chartType);
      const {
        chartSlice, Comp
      } = loadConfig(this.charts, config, option, _dialogConf, this);
      if (chartSlice){
        this.trigger(CHAT.LOAD_STOCK_COMPLETED, chartSlice);
      } else {
        this.trigger(CHAT.INIT_AND_SHOW_CHART, Comp);
      }
      this.triggerLoadingProgress(LPA.LOADING_COMPLETE)
      this.triggerLimitRemaining(limitRemaining);
      this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
  },
  onLoadStockAdded(option={}){
     this.triggerLoadingProgress(LPA.LOADING_COMPLETE)
     scanPostAdded(this, option)
  },
  onLoadStockFailed(option){
    this.triggerLoadingProgress(LPA.LOADING_FAILED)
    setAlertItemIdTo(option)
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

  onShowChart(chartType, browserType, dialogConfOr){
    this.setMenuItemOpen(chartType, browserType);
    const dialogConf = this.getDialogConf(dialogConfOr, chartType);
    const {
      chartSlice, Comp
     } = showChart(this.charts, chartType, browserType, dialogConf, this);
    if (chartSlice){
      this.trigger(CHAT.SHOW_CHART, chartSlice);
    } else {
      this.trigger(CHAT.INIT_AND_SHOW_CHART, Comp)
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

  onToTop(chartType, id){
    const chartSlice = toTop(this.charts, chartType, id)
    this.trigger(CHAT.SHOW_CHART, chartSlice);
  },

  onCopy(chart){
    this.fromChart = chart
  },
  getCopyFromChart(){
    return this.fromChart;
  },

  onUpdateMovingValues(chartType, movingValues){
    updateMovingValues(this.charts, chartType, movingValues)
  },

  onSortBy(chartType, by){
    const chartSlice = sortBy(this.charts, chartType, by);
    this.trigger(CHAT.SHOW_CHART, chartSlice);
  },
  onRemoveAll(chartType, browserType){
    const chartSlice = removeAll(this.charts, chartType);
    this.resetMenuItemCounter(chartType, browserType)
    this.uncheckActiveCheckbox()
    this.trigger(CHAT.SHOW_CHART, chartSlice);
    this.trigger(BAT.UPDATE_BROWSER_MENU, browserType);
  }

};

export default ChartSlice
