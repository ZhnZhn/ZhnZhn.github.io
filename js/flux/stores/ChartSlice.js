"use strict";

exports.__esModule = true;
exports.default = void 0;
var _LoadingProgressActions = require("../actions/LoadingProgressActions");
var _ChartActions = require("../actions/ChartActions");
var _ChartLogic = require("./chart/ChartLogic");
const CONSOLE_LOG_STYLE = 'color:rgb(237, 88, 19);';
const _logErrorToConsole = function (_ref) {
  let {
    alertCaption,
    alertItemId,
    alertDescr
  } = _ref;
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
    (0, _ChartLogic.checkBrowserChartTypes)(this, option);
    const {
      chartType,
      key
    } = option;
    return (0, _ChartLogic.isChartExist)(this.charts, chartType, key);
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
    if ((0, _ChartLogic.isChartExist)(this.charts, chartType, key)) {
      return;
    }
    const _dialogConf = dialogConf || this.getDialogConf(void 0, chartType),
      {
        chartSlice,
        Comp
      } = (0, _ChartLogic.loadConfig)(this.charts, config, option, _dialogConf, this);
    this.addMenuItemCounter(chartType, browserType);
    if (chartSlice) {
      this.trigger(_ChartActions.CHAT_LOAD_COMPLETED, chartSlice);
    } else {
      this.trigger(_ChartActions.CHAT_INIT_AND_SHOW, Comp);
    }
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_COMPLETE);
    this.triggerLimitRemaining(limitRemaining);
  },
  onLoadItemAdded(option) {
    if (option === void 0) {
      option = {};
    }
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_COMPLETE);
    (0, _ChartLogic.scanPostAdded)(this, option);
  },
  onLoadItemFailed(option) {
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_FAILED);
    (0, _ChartLogic.setAlertItemIdTo)(option);
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
    } = (0, _ChartLogic.showChart)(this.charts, chartType, browserType, dialogConf, this);
    if (chartSlice) {
      this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
    } else {
      this.trigger(_ChartActions.CHAT_INIT_AND_SHOW, Comp);
    }
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
    } = (0, _ChartLogic.removeConfig)(this.charts, chartType, chartId);
    if (isRemoved) {
      this.resetActiveChart(chartId);
      this.minusMenuItemCounter(chartType, browserType);
      this.trigger(_ChartActions.CHAT_CLOSE, chartSlice);
    }
  },
  onToTop(chartType, id) {
    const chartSlice = (0, _ChartLogic.toTop)(this.charts, chartType, id);
    this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
  },
  onCopy(chart) {
    this.fromChart = chart;
  },
  getCopyFromChart() {
    return this.fromChart;
  },
  onUpdateMovingValues(chartType, movingValues) {
    (0, _ChartLogic.updateMovingValues)(this.charts, chartType, movingValues);
  },
  onSortBy(chartType, by) {
    const chartSlice = (0, _ChartLogic.sortBy)(this.charts, chartType, by);
    this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
  },
  onRemoveAll(chartType, browserType) {
    const chartSlice = (0, _ChartLogic.removeAll)(this.charts, chartType);
    this.resetMenuItemCounter(chartType, browserType);
    this.uncheckActiveCheckbox();
    this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
  }
};
var _default = ChartSlice;
exports.default = _default;
//# sourceMappingURL=ChartSlice.js.map