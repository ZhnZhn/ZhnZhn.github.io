'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoadingProgressActions = require('../actions/LoadingProgressActions');

var _ChartActions = require('../actions/ChartActions');

var _BrowserActions = require('../actions/BrowserActions');

var _ChartLogic = require('./chart/ChartLogic');

var _ChartLogic2 = _interopRequireDefault(_ChartLogic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isChartExist = _ChartLogic2.default.isChartExist,
    loadConfig = _ChartLogic2.default.loadConfig,
    showChart = _ChartLogic2.default.showChart,
    removeConfig = _ChartLogic2.default.removeConfig,
    toTop = _ChartLogic2.default.toTop,
    sortBy = _ChartLogic2.default.sortBy,
    removeAll = _ChartLogic2.default.removeAll,
    checkBrowserChartTypes = _ChartLogic2.default.checkBrowserChartTypes,
    scanPostAdded = _ChartLogic2.default.scanPostAdded,
    setAlertItemIdTo = _ChartLogic2.default.setAlertItemIdTo;


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
  isChartExist: function isChartExist(option) {
    checkBrowserChartTypes(this, option);
    var chartType = option.chartType,
        key = option.key;

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
  },
  onLoadStockAdded: function onLoadStockAdded() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.triggerLoadingProgress(_LoadingProgressActions.T.LOADING_COMPLETE);
    scanPostAdded(this, option);
  },
  onLoadStockFailed: function onLoadStockFailed(option) {
    this.triggerLoadingProgress(_LoadingProgressActions.T.LOADING_FAILED);
    setAlertItemIdTo(option);
    /*
    const { alertItemId, value } = option;
    option.alertItemId = _isStr(alertItemId)
      ? alertItemId
      : _isStr(value) ? value : void 0;
    */
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
  },
  onRemoveAll: function onRemoveAll(chartType, browserType) {
    var chartSlice = removeAll(this.charts, chartType);
    this.resetMenuItemCounter(chartType, browserType);
    this.uncheckActiveCheckbox();
    this.trigger(_ChartActions.ChartActionTypes.SHOW_CHART, chartSlice);
    this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
  }
};

exports.default = ChartSlice;
//# sourceMappingURL=ChartSlice.js.map