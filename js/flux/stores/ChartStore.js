'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _ChartActions = require('../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _BrowserActions = require('../actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _AnalyticActions = require('../actions/AnalyticActions');

var _AnalyticActions2 = _interopRequireDefault(_AnalyticActions);

var _WatchActions = require('../actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _Type = require('../../constants/Type');

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _BrowserSlice = require('./BrowserSlice');

var _BrowserSlice2 = _interopRequireDefault(_BrowserSlice);

var _ComponentSlice = require('./ComponentSlice');

var _ComponentSlice2 = _interopRequireDefault(_ComponentSlice);

var _SettingSlice = require('./SettingSlice');

var _SettingSlice2 = _interopRequireDefault(_SettingSlice);

var _AnalyticSlice = require('./AnalyticSlice');

var _AnalyticSlice2 = _interopRequireDefault(_AnalyticSlice);

var _WatchListSlice = require('../watch-list/WatchListSlice');

var _WatchListSlice2 = _interopRequireDefault(_WatchListSlice);

var _WithLimitRemaining = require('./WithLimitRemaining');

var _WithLimitRemaining2 = _interopRequireDefault(_WithLimitRemaining);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ChartStore = _reflux2.default.createStore((0, _extends3.default)({
  listenables: [_ChartActions2.default, _ComponentActions2.default, _BrowserActions2.default, _AnalyticActions2.default, _WatchActions2.default],
  charts: {},
  init: function init() {
    this.initWatchList();
    this.listen(_ChartActions2.default.fnOnChangeStore);
  },
  createInitConfig: function createInitConfig(chartType) {
    return {
      chartType: chartType,
      configs: [],
      isShow: true
    };
  },
  getConfigs: function getConfigs(chartType) {
    return this.charts[chartType];
  },
  isChartExist: function isChartExist(chartType, key) {
    if (!this.charts[chartType]) {
      return false;
    }
    var configs = this.charts[chartType].configs,
        _max = configs.length;
    var i = 0;
    for (; i < _max; i++) {
      if (configs[i].zhConfig.key === key) {
        return true;
      }
    }
    return false;
  },
  showAlertDialog: function showAlertDialog() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    option.modalDialogType = _Type.ModalDialog.ALERT;
    this.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, option);
  },
  onLoadStock: function onLoadStock() {
    this.trigger(_ChartActions.ChartActionTypes.LOAD_STOCK);
  },
  onLoadStockCompleted: function onLoadStockCompleted(option, config) {
    var chartType = option.chartType,
        browserType = option.browserType,
        conf = option.conf,
        zhCompType = option.zhCompType,
        _config$zhConfig = config.zhConfig,
        zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
        limitRemaining = zhConfig.limitRemaining;

    if (zhCompType) {
      config.zhCompType = zhCompType;
    }

    this.addMenuItemCounter(chartType, browserType);

    var chartCont = this.charts[chartType];
    if (chartCont) {
      chartCont.configs.unshift(config);
      chartCont.isShow = true;

      this.trigger(_ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, chartCont);
      this.triggerWithLimitRemaining(limitRemaining);
    } else {
      this.charts[chartType] = this.createInitConfig(chartType);
      this.charts[chartType].configs.unshift(config);

      this.trigger(_ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED);
      this.trigger(_ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART, _Factory2.default.createChartContainer(chartType, browserType, conf));
      this.triggerWithLimitRemaining(limitRemaining);
    }

    this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
    this.analyticSendEvent({
      eventAction: EVENT_ACTION.LOAD,
      eventLabel: chartType
    });
  },
  onLoadStockAdded: function onLoadStockAdded() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var chartType = option.chartType;

    this.trigger(_ChartActions.ChartActionTypes.LOAD_STOCK_ADDED);
    this.analyticSendEvent({
      eventAction: EVENT_ACTION.ADD,
      eventLabel: chartType
    });
  },
  onLoadStockFailed: function onLoadStockFailed(option) {
    this.trigger(_ChartActions.ChartActionTypes.LOAD_STOCK_FAILED, option);
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

    var chartCont = this.charts[chartType];
    if (chartCont) {
      chartCont.isShow = true;
      this.trigger(_ChartActions.ChartActionTypes.SHOW_CHART, chartCont);
      this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
    } else {
      this.charts[chartType] = this.createInitConfig(chartType);
      this.trigger(_ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART, _Factory2.default.createChartContainer(chartType, browserType, conf));
      this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
    }
  },
  onCloseChart: function onCloseChart(chartType, browserType, chartId) {

    this.minusMenuItemCounter(chartType, browserType);

    var chartCont = this.charts[chartType];
    chartCont.configs = chartCont.configs.filter(function (config) {
      return config.zhConfig.id !== chartId;
    });

    if (this.activeChart && this.activeChart.options.zhConfig.id === chartId) {
      this.activeChart = null;
      this.activeChart = null;
    }
    this.trigger(_ChartActions.ChartActionTypes.CLOSE_CHART, chartCont);
    this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
  },
  onCloseChartContainer: function onCloseChartContainer(chartType, browserType) {
    this.uncheckActiveCheckbox(chartType);
    if (this.isWithItemCounter(browserType)) {
      this.setMenuItemClose(chartType, browserType);
      this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU, browserType);
    }
  },
  onCloseChartContainer2: function onCloseChartContainer2(chartType, browserType) {
    this.trigger(_ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2, chartType);
  },
  onCopy: function onCopy(chart) {
    this.fromChart = chart;
  },
  getCopyFromChart: function getCopyFromChart() {
    return this.fromChart;
  }
}, _BrowserSlice2.default, _ComponentSlice2.default, _SettingSlice2.default, _AnalyticSlice2.default, _WatchListSlice2.default, _WithLimitRemaining2.default));

exports.default = ChartStore;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\ChartStore.js.map