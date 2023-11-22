import {
  LPAT_LOADING,
  LPAT_LOADING_COMPLETE,
  LPAT_LOADING_FAILED
} from '../actions/LoadingProgressActions';
import {
  CHAT_LOAD_COMPLETED,
  CHAT_INIT_AND_SHOW,
  CHAT_SHOW,
  CHAT_CLOSE
} from '../actions/ChartActions';

import {
  setMenuItemOpen,
  addMenuItemCounter,
  minusMenuItemCounter,
  resetMenuItemCounter
} from './browserLogic';

import {
  hideAbout,
  showAlertDialog
} from './compStore';
import {
  uncheckActiveCheckbox,
  resetActiveChart
} from './chartCheckBoxLogic';

import {
  getDialogConf
} from './dialogLogic';

import {
  isChartExist,
  removeConfig,
  toTop,
  removeAll,
  updateMovingValues,
  loadConfig,
  showChart,
  sortBy,
  checkBrowserChartTypes,
  scanPostAdded,
  setAlertItemIdTo
} from './chart/ChartLogic';

const CONSOLE_LOG_STYLE = 'color:rgb(237, 88, 19);';
const _logErrorToConsole = function({
  alertCaption,
  alertItemId,
  alertDescr,
}){
  const _title = [alertCaption, alertItemId]
    .filter(Boolean)
    .join(": ");
  console.log('%c'+ _title, CONSOLE_LOG_STYLE);
  console.log('%c' + alertDescr, CONSOLE_LOG_STYLE);
}

const ChartSlice = {
  charts : {},

  getConfigs(chartType){
    return this.charts[chartType];
  },
  isChartExist(option){
    checkBrowserChartTypes(option)
    const { chartType, key } = option;
    return isChartExist(this.charts, chartType, key);
  },

  onLoadItem(){
    this.triggerLoadingProgress(LPAT_LOADING)
  },
  onLoadItemCompleted(option, config){
      const {
        chartType,
        browserType,
        dialogConf,
        limitRemaining,
        key
      } = option;

      if (isChartExist(this.charts, chartType, key)) {
        return;
      }

      const _dialogConf = dialogConf || getDialogConf(void 0, chartType)
      , {
        chartSlice,
        Comp
      } = loadConfig(this.charts, config, option, _dialogConf, this);

      addMenuItemCounter(chartType, browserType);
      if (chartSlice){
        this.trigger(CHAT_LOAD_COMPLETED, chartSlice);
      } else {
        this.trigger(CHAT_INIT_AND_SHOW, Comp);
        hideAbout()
      }
      this.triggerLoadingProgress(LPAT_LOADING_COMPLETE)
      this.triggerLimitRemaining(limitRemaining);
  },
  onLoadItemAdded(option={}){
     this.triggerLoadingProgress(LPAT_LOADING_COMPLETE)
     scanPostAdded(option)
  },
  onLoadItemFailed(option){
    this.triggerLoadingProgress(LPAT_LOADING_FAILED)
    setAlertItemIdTo(option)
    showAlertDialog(option)
    _logErrorToConsole(option);
  },

  onLoadItemByQuery(){
    this.onLoadItem()
  },
  onLoadItemByQueryCompleted(option, config){
    this.onLoadItemCompleted(option, config)
  },
  onLoadItemByQueryFailed(option){
    this.onLoadItemFailed(option)
  },

  onShowChart(chartType, browserType, dialogConfOr){
    setMenuItemOpen(chartType, browserType)
    const dialogConf = getDialogConf(dialogConfOr, chartType);
    const {
      chartSlice, Comp
     } = showChart(this.charts, chartType, browserType, dialogConf, this);
    if (chartSlice){
      this.trigger(CHAT_SHOW, chartSlice);
    } else {
      this.trigger(CHAT_INIT_AND_SHOW, Comp)
      hideAbout()
    }
  },

  onCloseChart(chartType, browserType, chartId){
    const {
      chartSlice,
      isRemoved
    } = removeConfig(this.charts, chartType, chartId);

    if (isRemoved) {
      resetActiveChart(chartId)
      minusMenuItemCounter(chartType, browserType);

      this.trigger(CHAT_CLOSE, chartSlice);
    }
  },

  onToTop(chartType, id){
    const chartSlice = toTop(this.charts, chartType, id)
    this.trigger(CHAT_SHOW, chartSlice);
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
    this.trigger(CHAT_SHOW, chartSlice);
  },
  onRemoveAll(chartType, browserType){
    const chartSlice = removeAll(this.charts, chartType);
    resetMenuItemCounter(chartType, browserType)
    uncheckActiveCheckbox()
    this.trigger(CHAT_SHOW, chartSlice);
  }

};

export default ChartSlice
