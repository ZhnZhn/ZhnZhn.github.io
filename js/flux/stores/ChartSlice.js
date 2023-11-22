"use strict";

exports.__esModule = true;
exports.default = void 0;
var _LoadingProgressActions = require("../actions/LoadingProgressActions");
var _ChartActions = require("../actions/ChartActions");
var _browserLogic = require("./browserLogic");
var _compStore = require("./compStore");
var _chartCheckBoxLogic = require("./chartCheckBoxLogic");
var _dialogLogic = require("./dialogLogic");
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
    (0, _ChartLogic.checkBrowserChartTypes)(option);
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
    const _dialogConf = dialogConf || (0, _dialogLogic.getDialogConf)(void 0, chartType),
      {
        chartSlice,
        Comp
      } = (0, _ChartLogic.loadConfig)(this.charts, config, option, _dialogConf, this);
    (0, _browserLogic.addMenuItemCounter)(chartType, browserType);
    if (chartSlice) {
      this.trigger(_ChartActions.CHAT_LOAD_COMPLETED, chartSlice);
    } else {
      this.trigger(_ChartActions.CHAT_INIT_AND_SHOW, Comp);
      (0, _compStore.hideAbout)();
    }
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_COMPLETE);
    this.triggerLimitRemaining(limitRemaining);
  },
  onLoadItemAdded(option) {
    if (option === void 0) {
      option = {};
    }
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_COMPLETE);
    (0, _ChartLogic.scanPostAdded)(option);
  },
  onLoadItemFailed(option) {
    this.triggerLoadingProgress(_LoadingProgressActions.LPAT_LOADING_FAILED);
    (0, _ChartLogic.setAlertItemIdTo)(option);
    (0, _compStore.showAlertDialog)(option);
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
    (0, _browserLogic.setMenuItemOpen)(chartType, browserType);
    const dialogConf = (0, _dialogLogic.getDialogConf)(dialogConfOr, chartType);
    const {
      chartSlice,
      Comp
    } = (0, _ChartLogic.showChart)(this.charts, chartType, browserType, dialogConf, this);
    if (chartSlice) {
      this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
    } else {
      this.trigger(_ChartActions.CHAT_INIT_AND_SHOW, Comp);
      (0, _compStore.hideAbout)();
    }
  },
  onCloseChart(chartType, browserType, chartId) {
    const {
      chartSlice,
      isRemoved
    } = (0, _ChartLogic.removeConfig)(this.charts, chartType, chartId);
    if (isRemoved) {
      (0, _chartCheckBoxLogic.resetActiveChart)(chartId);
      (0, _browserLogic.minusMenuItemCounter)(chartType, browserType);
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
    (0, _browserLogic.resetMenuItemCounter)(chartType, browserType);
    (0, _chartCheckBoxLogic.uncheckActiveCheckbox)();
    this.trigger(_ChartActions.CHAT_SHOW, chartSlice);
  }
};
var _default = exports.default = ChartSlice;
//# sourceMappingURL=ChartSlice.js.map