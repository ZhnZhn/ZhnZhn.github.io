"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadingProgressActions = require("../actions/LoadingProgressActions");

var _ChartActions = require("../actions/ChartActions");

var _BrowserActions = require("../actions/BrowserActions");

var _ChartLogic = _interopRequireDefault(require("./chart/ChartLogic"));

const {
  isChartExist,
  loadConfig,
  showChart,
  removeConfig,
  toTop,
  updateMovingValues,
  sortBy,
  removeAll,
  checkBrowserChartTypes,
  scanPostAdded,
  setAlertItemIdTo
} = _ChartLogic.default;
const CONSOLE_LOG_STYLE = 'color:rgb(237, 88, 19);';

const _logErrorToConsole = function ({
  alertCaption,
  alertItemId,
  alertDescr
}) {
  const _title = [alertCaption, alertItemId].filter(Boolean).join(": ");

  console.log('%c' + _title, CONSOLE_LOG_STYLE);
  console.log('%c' + alertDescr, CONSOLE_LOG_STYLE);
};

const ChartSlice = {
  charts: {},

  getConfigs(chartType) {
    return this.charts[chartType];
  },

  isChartExist(option) {
    checkBrowserChartTypes(this, option);
    const {
      chartType,
      key
    } = option;
    return isChartExist(this.charts, chartType, key);
  },

  onLoadItem() {
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING);
  },

  onLoadItemCompleted(option, config) {
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

    const _dialogConf = dialogConf || this.getDialogConf(void 0, chartType),
          {
      chartSlice,
      Comp
    } = loadConfig(this.charts, config, option, _dialogConf, this);

    this.addMenuItemCounter(chartType, browserType);

    if (chartSlice) {
      this.trigger(_ChartActions.CHAT_LOAD_COMPLETED, chartSlice);
    } else {
      this.trigger(_ChartActions.CHAT_INIT_AND_SHOW, Comp);
    }

    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_COMPLETE);
    this.triggerLimitRemaining(limitRemaining);
    this.trigger(_BrowserActions.BAT_UPDATE_BROWSER_MENU, browserType);
  },

  onLoadItemAdded(option = {}) {
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_COMPLETE);
    scanPostAdded(this, option);
  },

  onLoadItemFailed(option) {
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_FAILED);
    setAlertItemIdTo(option);
    this.showAlertDialog(option);

    _logErrorToConsole(option);
  },

  onLoadItemByQuery() {
    this.onLoadItem();
  },

  onLoadItemByQueryCompleted(option, config) {
    this.onLoadItemCompleted(option, config);
  },

  onLoadItemByQueryFailed(option) {
    this.onLoadItemFailed(option);
  },

  onShowChart(chartType, browserType, dialogConfOr) {
    this.setMenuItemOpen(chartType, browserType);
    const dialogConf = this.getDialogConf(dialogConfOr, chartType);
    const {
      chartSlice,
      Comp
    } = showChart(this.charts, chartType, browserType, dialogConf, this);

    if (chartSlice) {
      this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
    } else {
      this.trigger(_ChartActions.CHAT_INIT_AND_SHOW, Comp);
    }

    this.trigger(_BrowserActions.BAT_UPDATE_BROWSER_MENU, browserType);
  },

  resetActiveChart(id) {
    if (this.activeChart && this.activeChart.options.zhConfig.id === id) {
      this.activeChart = null;
    }
  },

  onCloseChart(chartType, browserType, chartId) {
    const {
      chartSlice,
      isRemoved
    } = removeConfig(this.charts, chartType, chartId);

    if (isRemoved) {
      this.resetActiveChart(chartId);
      this.minusMenuItemCounter(chartType, browserType);
      this.trigger(_ChartActions.CHAT_CLOSE, chartSlice);
      this.trigger(_BrowserActions.BAT_UPDATE_BROWSER_MENU, browserType);
    }
  },

  onToTop(chartType, id) {
    const chartSlice = toTop(this.charts, chartType, id);
    this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
  },

  onCopy(chart) {
    this.fromChart = chart;
  },

  getCopyFromChart() {
    return this.fromChart;
  },

  onUpdateMovingValues(chartType, movingValues) {
    updateMovingValues(this.charts, chartType, movingValues);
  },

  onSortBy(chartType, by) {
    const chartSlice = sortBy(this.charts, chartType, by);
    this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
  },

  onRemoveAll(chartType, browserType) {
    const chartSlice = removeAll(this.charts, chartType);
    this.resetMenuItemCounter(chartType, browserType);
    this.uncheckActiveCheckbox();
    this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
    this.trigger(_BrowserActions.BAT_UPDATE_BROWSER_MENU, browserType);
  }

};
var _default = ChartSlice;
exports.default = _default;
//# sourceMappingURL=ChartSlice.js.map