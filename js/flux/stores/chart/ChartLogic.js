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
var _compStore = require("../compStore");
var _chartCheckBoxLogic = require("../chartCheckBoxLogic");
var _contCheckBoxLogic = require("../contCheckBoxLogic");
var _fItemContainer = require("../../logic/fItemContainer");
var _storeApi = require("../../storeApi");
var _getSlice = _interopRequireDefault(require("./getSlice"));
var _fCompareBy = _interopRequireDefault(require("./fCompareBy"));
const _isArr = Array.isArray;
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
const loadConfig = (slice, config, option, dialogConf) => {
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
      Comp: (0, _fItemContainer.crItemContainerEl)({
        browserType,
        dialogConf
      })
    };
  }
};
exports.loadConfig = loadConfig;
const showChart = (slice, chartType, browserType, dialogConf) => {
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
      Comp: (0, _fItemContainer.crItemContainerEl)({
        browserType,
        dialogConf
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
const checkBrowserChartTypes = option => {
  const chb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
  if (chb) {
    option.chartType = chb.chartType;
    option.browserType = chb.browserType;
  }
};
exports.checkBrowserChartTypes = checkBrowserChartTypes;
const scanPostAdded = option => {
  const chart = (0, _chartCheckBoxLogic.getActiveChart)();
  if (chart && _isSecondDotCase(chart.series, option)) {
    (0, _compStore.showModalDialog)(_ModalDialogType.MDT_COLUMN_RANGE, {
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
  option.alertItemId = (0, _storeApi.isStr)(alertItemId) ? alertItemId : (0, _storeApi.isStr)(value) ? value : void 0;
};
exports.setAlertItemIdTo = setAlertItemIdTo;
//# sourceMappingURL=ChartLogic.js.map