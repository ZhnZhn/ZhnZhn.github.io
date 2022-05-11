"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.updateMovingValues = exports.toTop = exports.sortBy = exports.showChart = exports.setAlertItemIdTo = exports.scanPostAdded = exports.removeConfig = exports.removeAll = exports.loadConfig = exports.isChartExist = exports.checkBrowserChartTypes = void 0;

var _ChartLogicFn = require("./ChartLogicFn");

exports.isChartExist = _ChartLogicFn.isChartExist;
exports.removeConfig = _ChartLogicFn.removeConfig;
exports.toTop = _ChartLogicFn.toTop;
exports.removeAll = _ChartLogicFn.removeAll;
exports.updateMovingValues = _ChartLogicFn.updateMovingValues;

var _ModalDialogType = require("../../../constants/ModalDialogType");

var _ComponentActions = require("../../actions/ComponentActions");

var _fItemContainer = _interopRequireDefault(require("../../logic/fItemContainer"));

var _getSlice = _interopRequireDefault(require("./getSlice"));

var _fCompareBy = _interopRequireDefault(require("./fCompareBy"));

const {
  crItemContainerEl
} = _fItemContainer.default;
const _isArr = Array.isArray;

const _isStr = str => typeof str === 'string';

const _isSecondDotCase = (series, _ref) => {
  let {
    seriaType
  } = _ref;
  return seriaType === 'DOT_SET' && _isArr(series) && series[0].type === 'scatter' && series.length === 2;
};

const _initChartSlice = (slice, chartType, config) => {
  if (!slice[chartType]) {
    slice[chartType] = {
      chartType,
      configs: config ? [config] : [],
      isShow: true
    };
  }
};

const loadConfig = (slice, config, option, dialogConf, store) => {
  const {
    chartType,
    browserType
  } = option,
        {
    chartSlice,
    configs
  } = (0, _getSlice.default)(slice, chartType);

  if (chartSlice) {
    configs.unshift(config);
    chartSlice.isShow = true;
    return {
      chartSlice
    };
  } else {
    _initChartSlice(slice, chartType, config);

    return {
      Comp: crItemContainerEl({
        browserType,
        dialogConf,
        store
      })
    };
  }
};

exports.loadConfig = loadConfig;

const showChart = (slice, chartType, browserType, dialogConf, store) => {
  const {
    chartSlice
  } = (0, _getSlice.default)(slice, chartType);

  if (chartSlice) {
    chartSlice.isShow = true;
    return {
      chartSlice
    };
  } else {
    _initChartSlice(slice, chartType);

    return {
      Comp: crItemContainerEl({
        browserType,
        dialogConf,
        store
      })
    };
  }
};

exports.showChart = showChart;

const sortBy = (slice, chartType, by) => {
  const {
    chartSlice,
    configs
  } = (0, _getSlice.default)(slice, chartType);

  if (by) {
    configs.sort((0, _fCompareBy.default)(by));
  } else {
    configs.reverse();
  }

  return chartSlice;
};

exports.sortBy = sortBy;

const checkBrowserChartTypes = (slice, option) => {
  const {
    activeContChb: chb
  } = slice;

  if (chb) {
    option.chartType = chb.chartType;
    option.browserType = chb.browserType;
  }
};

exports.checkBrowserChartTypes = checkBrowserChartTypes;

const scanPostAdded = (store, option) => {
  const chart = store.getActiveChart();

  if (chart && _isSecondDotCase(chart.series, option)) {
    store.trigger(_ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG, {
      modalDialogType: _ModalDialogType.MDT_COLUMN_RANGE,
      chart
    });
  }
};

exports.scanPostAdded = scanPostAdded;

const setAlertItemIdTo = option => {
  const {
    alertItemId,
    value
  } = option;
  option.alertItemId = _isStr(alertItemId) ? alertItemId : _isStr(value) ? value : void 0;
};

exports.setAlertItemIdTo = setAlertItemIdTo;
//# sourceMappingURL=ChartLogic.js.map