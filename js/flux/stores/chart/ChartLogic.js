"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Type = require("../../../constants/Type");

var _ComponentActions = require("../../actions/ComponentActions");

var _fItemContainer = _interopRequireDefault(require("../../logic/fItemContainer"));

var _getSlice5 = _interopRequireDefault(require("./getSlice"));

var _fCompareBy = _interopRequireDefault(require("./fCompareBy"));

var _ChartLogicFn = _interopRequireDefault(require("./ChartLogicFn"));

var crItemContainerEl = _fItemContainer["default"].crItemContainerEl;
var _isArr = Array.isArray;

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _isSecondDotCase = function _isSecondDotCase(series, _ref) {
  var seriaType = _ref.seriaType;
  return seriaType === 'DOT_SET' && _isArr(series) && series[0].type === 'scatter' && series.length === 2;
};

var ChartLogic = (0, _extends2["default"])({}, _ChartLogicFn["default"], {
  _initChartSlice: function _initChartSlice(slice, chartType, config) {
    if (!slice[chartType]) {
      slice[chartType] = {
        chartType: chartType,
        configs: config ? [config] : [],
        isShow: true
      };
    }
  },
  loadConfig: function loadConfig(slice, config, option, dialogConf, store) {
    var chartType = option.chartType,
        browserType = option.browserType,
        _getSlice2 = (0, _getSlice5["default"])(slice, chartType),
        chartSlice = _getSlice2.chartSlice,
        configs = _getSlice2.configs;

    if (chartSlice) {
      configs.unshift(config);
      chartSlice.isShow = true;
      return {
        chartSlice: chartSlice
      };
    } else {
      ChartLogic._initChartSlice(slice, chartType, config);

      return {
        Comp: crItemContainerEl({
          browserType: browserType,
          dialogConf: dialogConf,
          store: store
        })
      };
    }
  },
  showChart: function showChart(slice, chartType, browserType, dialogConf, store) {
    var _getSlice3 = (0, _getSlice5["default"])(slice, chartType),
        chartSlice = _getSlice3.chartSlice;

    if (chartSlice) {
      chartSlice.isShow = true;
      return {
        chartSlice: chartSlice
      };
    } else {
      ChartLogic._initChartSlice(slice, chartType);

      return {
        Comp: crItemContainerEl({
          browserType: browserType,
          dialogConf: dialogConf,
          store: store
        })
      };
    }
  },
  sortBy: function sortBy(slice, chartType, by) {
    var _getSlice4 = (0, _getSlice5["default"])(slice, chartType),
        chartSlice = _getSlice4.chartSlice,
        configs = _getSlice4.configs;

    if (by) {
      configs.sort((0, _fCompareBy["default"])(by));
    } else {
      configs.reverse();
    }

    return chartSlice;
  },
  checkBrowserChartTypes: function checkBrowserChartTypes(slice, option) {
    var chb = slice.activeContChb;

    if (chb) {
      option.chartType = chb.chartType;
      option.browserType = chb.browserType;
    }
  },
  scanPostAdded: function scanPostAdded(store, option) {
    var chart = store.getActiveChart();

    if (chart && _isSecondDotCase(chart.series, option)) {
      store.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, {
        modalDialogType: _Type.ModalDialog.COLUMN_RANGE,
        chart: chart
      });
    }
  },
  setAlertItemIdTo: function setAlertItemIdTo(option) {
    var alertItemId = option.alertItemId,
        value = option.value;
    option.alertItemId = _isStr(alertItemId) ? alertItemId : _isStr(value) ? value : void 0;
  }
});
var _default = ChartLogic;
exports["default"] = _default;
//# sourceMappingURL=ChartLogic.js.map