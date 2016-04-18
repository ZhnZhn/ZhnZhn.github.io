'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _ChartActions = require('../actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

var _ComponentActions = require('../actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _BrowserSlice = require('./BrowserSlice');

var _BrowserSlice2 = _interopRequireDefault(_BrowserSlice);

var _ComponentSlice = require('./ComponentSlice');

var _ComponentSlice2 = _interopRequireDefault(_ComponentSlice);

var _SettingSlice = require('./SettingSlice');

var _SettingSlice2 = _interopRequireDefault(_SettingSlice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartStore = _reflux2.default.createStore(_extends({
  listenables: [_ChartActions2.default, _ComponentActions2.default],
  charts: {},
  init: function init() {},
  createInitConfig: function createInitConfig(chartType) {
    return { chartType: chartType, configs: [], isShow: true };
  },
  getConfigs: function getConfigs(chartType) {
    return this.charts[chartType];
  },
  isChartExist: function isChartExist(chartType, chartId) {
    if (!this.charts[chartType]) {
      return false;
    }
    var arr = this.charts[chartType].configs;
    for (var i = 0, max = arr.length; i < max; i++) {
      if (arr[i].stockTicket === chartId) {
        return true;
      }
    }
    return false;
  },
  onLoadStockCompleted: function onLoadStockCompleted(chartType, config) {
    var chartCont = this.charts[chartType];
    if (chartCont) {
      chartCont.configs.unshift(config);
      chartCont.isShow = true;
      this.trigger(_ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, chartCont);
    } else {
      this.charts[chartType] = this.createInitConfig(chartType);
      this.charts[chartType].configs.unshift(config);
      this.trigger(_ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART, _Factory2.default.createChartContainer(chartType));
    }
  },
  onShowChart: function onShowChart(chartType) {

    var chartCont = this.charts[chartType];
    if (chartCont) {
      chartCont.isShow = true;
      this.trigger(_ChartActions.ChartActionTypes.SHOW_CHART, chartCont);
    } else {
      this.charts[chartType] = this.createInitConfig(chartType);
      this.trigger(_ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART, _Factory2.default.createChartContainer(chartType));
    }
  },
  onCloseChart: function onCloseChart(chartType, chartId) {
    var chartCont = this.charts[chartType];

    chartCont.configs = chartCont.configs.filter(function (config) {
      return config.stockTicket !== chartId;
    });
    this.trigger(_ChartActions.ChartActionTypes.CLOSE_CHART, chartCont);
  }
}, _BrowserSlice2.default, _ComponentSlice2.default, _SettingSlice2.default));

exports.default = ChartStore;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\ChartStore.js.map