'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoadingProgressActions = require('../actions/LoadingProgressActions');

var _ChartActions = require('../actions/ChartActions');

var _BrowserActions = require('../actions/BrowserActions');

var _ChartLogic = require('./ChartLogic');

var _ChartLogic2 = _interopRequireDefault(_ChartLogic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isChartExist = _ChartLogic2.default.isChartExist,
    loadConfig = _ChartLogic2.default.loadConfig,
    showChart = _ChartLogic2.default.showChart,
    removeConfig = _ChartLogic2.default.removeConfig,
    toTop = _ChartLogic2.default.toTop,
    sortBy = _ChartLogic2.default.sortBy;


var EVENT_ACTION = {
  LOAD: 'Load',
  ADD: 'Add'
};

var CONSOLE_LOG_STYLE = 'color:rgb(237, 88, 19);';
var _fnLogLoadError = function _fnLogLoadError(_ref) {
  var alertCaption = _ref.alertCaption,
      alertDescr = _ref.alertDescr,
      alertItemId = _ref.alertItemId;

  console.log('%c' + alertCaption + ':' + alertItemId, CONSOLE_LOG_STYLE);
  console.log('%c' + alertDescr, CONSOLE_LOG_STYLE);
};

var ChartSlice = {
  charts: {},

  getConfigs: function getConfigs(chartType) {
    return this.charts[chartType];
  },
  isChartExist: function isChartExist(chartType, key) {
    return _isChartExist(this.charts, chartType, key);
  },
  onLoadStock: function onLoadStock() {
    this.triggerLoadingProgress(_LoadingProgressActions.T.LOADING);
  },
  onLoadStockCompleted: function onLoadStockCompleted(option, config) {
    var chartType = option.chartType,
        browserType = option.browserType,
        limitRemaining = option.limitRemaining;


    this.addMenuItemCounter(chartType, browserType);

    var _loadConfig = loadConfig(this.charts, config, option),
        chartSlice = _loadConfig.chartSlice,
        Comp = _loadConfig.Comp;

    if (chartSlice) {
      this.trigger(_ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, chartSlice);
    } else {
      this.trigger(_ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART, Comp);
    }
    this.triggerLoadingProgress(_LoadingProgressActions.T.LOADING_COMPLETE);
    this.triggerLimitRemaining(limitRemaining);
    this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
    this.analyticSendEvent({
      eventAction: EVENT_ACTION.LOAD,
      eventLabel: chartType
    });
  },
  onLoadStockAdded: function onLoadStockAdded() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var chartType = option.chartType;

    this.triggerLoadingProgress(_LoadingProgressActions.T.LOADING_COMPLETE);
    this.analyticSendEvent({
      eventAction: EVENT_ACTION.ADD,
      eventLabel: chartType
    });
  },
  onLoadStockFailed: function onLoadStockFailed(option) {
    this.triggerLoadingProgress(_LoadingProgressActions.T.LOADING_FAILED);
    var alertItemId = option.alertItemId,
        value = option.value;

    option.alertItemId = alertItemId || value;
    this.showAlertDialog(option);
    _fnLogLoadError(option);
  },
  onLoadStockByQuery: function onLoadStockByQuery() {
    this.onLoadStock();
  },
  onLoadStockByQueryCompleted: function onLoadStockByQueryCompleted(option, config) {
    this.onLoadStockCompleted(option, config);
  },
  onLoadStockByQueryFailed: function onLoadStockByQueryFailed(option) {
    this.onLoadStockFailed(option);
  },
  onShowChart: function onShowChart(chartType, browserType, conf) {
    this.setMenuItemOpen(chartType, browserType);

    var _showChart = showChart(this.charts, chartType, browserType, conf),
        chartSlice = _showChart.chartSlice,
        Comp = _showChart.Comp;

    if (chartSlice) {
      this.trigger(_ChartActions.ChartActionTypes.SHOW_CHART, chartSlice);
    } else {
      this.trigger(_ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART, Comp);
    }
    this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
  },
  resetActiveChart: function resetActiveChart(id) {
    if (this.activeChart && this.activeChart.options.zhConfig.id === id) {
      this.activeChart = null;
    }
  },
  onCloseChart: function onCloseChart(chartType, browserType, chartId) {
    var _removeConfig = removeConfig(this.charts, chartType, chartId),
        chartSlice = _removeConfig.chartSlice,
        isRemoved = _removeConfig.isRemoved;

    if (isRemoved) {
      this.resetActiveChart(chartId);
      this.minusMenuItemCounter(chartType, browserType);

      this.trigger(_ChartActions.ChartActionTypes.CLOSE_CHART, chartSlice);
      this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
    }
  },
  onToTop: function onToTop(chartType, id) {
    var chartSlice = toTop(this.charts, chartType, id);
    this.trigger(_ChartActions.ChartActionTypes.SHOW_CHART, chartSlice);
  },
  onCopy: function onCopy(chart) {
    this.fromChart = chart;
  },
  getCopyFromChart: function getCopyFromChart() {
    return this.fromChart;
  },
  onSortBy: function onSortBy(chartType, by) {
    var chartSlice = sortBy(this.charts, chartType, by);
    this.trigger(_ChartActions.ChartActionTypes.SHOW_CHART, chartSlice);
  }
};

exports.default = ChartSlice;
//# sourceMappingURL=ChartSlice.js.map