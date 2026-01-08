"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.updateMovingValues = exports.toTop = exports.sortBy = exports.showChart = exports.setAlertItemIdTo = exports.scanPostAdded = exports.removeConfig = exports.removeAll = exports.loadConfig = exports.isChartExistImpl = exports.checkBrowserChartTypes = void 0;
var _ModalDialogType = require("../../../constants/ModalDialogType");
var _isTypeFn = require("../../../utils/isTypeFn");
var _fItemContainer = require("../../logic/fItemContainer");
var _compStore = require("../compStore");
var _chartCheckBoxLogic = require("../chartCheckBoxLogic");
var _contCheckBoxLogic = require("../contCheckBoxLogic");
var _getSubSliceOf = require("./getSubSliceOf");
var _fCompareBy = _interopRequireDefault(require("./fCompareBy"));
const _isSecondDotCase = (series, _ref) => {
  let {
    seriaType
  } = _ref;
  return seriaType === 'DOT_SET' && (0, _isTypeFn.isArr)(series) && series[0].type === 'scatter' && series.length === 2;
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
const _crItemContainerEl = (browserType, dialogConf) => ({
  Comp: (0, _fItemContainer.crItemContainerEl)({
    browserType,
    dialogConf
  })
});
const loadConfig = (slice, config, option, dialogConf) => {
  const {
      chartType,
      browserType
    } = option,
    [chartSlice, configs] = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType);
  if (chartSlice) {
    configs.unshift(config);
    chartSlice.isShow = true;
    return {
      chartSlice
    };
  } else {
    _initChartSlice(slice, chartType, config);
    return _crItemContainerEl(browserType, dialogConf);
  }
};
exports.loadConfig = loadConfig;
const showChart = (slice, chartType, browserType, dialogConf) => {
  const chartSlice = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType)[0];
  if (chartSlice) {
    chartSlice.isShow = true;
    return {
      chartSlice
    };
  } else {
    _initChartSlice(slice, chartType);
    return _crItemContainerEl(browserType, dialogConf);
  }
};
exports.showChart = showChart;
const sortBy = (slice, chartType, by) => {
  const [chartSlice, configs] = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType);
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
  option.alertItemId = (0, _isTypeFn.isStr)(alertItemId) ? alertItemId : (0, _isTypeFn.isStr)(value) ? value : void 0;
};
exports.setAlertItemIdTo = setAlertItemIdTo;
const _getConfigId = c => c.zhConfig.id;
const _notConfById = id => c => _getConfigId(c) !== id;
const _confById = id => c => _getConfigId(c) === id;
const _getConfigKey = c => c.zhConfig.key;
const isChartExistImpl = (slice, chartType, key) => {
  const configs = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType)[1];
  for (let config of configs) {
    if (_getConfigKey(config) === key) {
      return true;
    }
  }
  return false;
};
exports.isChartExistImpl = isChartExistImpl;
const removeConfig = (slice, chartType, id) => {
  const [chartSlice, configs] = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType);
  chartSlice.configs = configs.filter(_notConfById(id));
  return {
    chartSlice,
    isRemoved: configs.length > chartSlice.configs.length
  };
};
exports.removeConfig = removeConfig;
const toTop = (slice, chartType, id) => {
  const [chartSlice, configs] = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType),
    _conf = configs.find(_confById(id));
  if (_conf) {
    const arrWithout = configs.filter(_notConfById(id));
    chartSlice.configs = [_conf, ...arrWithout];
  }
  return chartSlice;
};
exports.toTop = toTop;
const removeAll = (slice, chartType) => {
  const _slice = slice[chartType] || {};
  _slice.configs = [];
  return _slice;
};
exports.removeAll = removeAll;
const _isRequireUpdateMovingValues = (configs, movingValues) => configs.length === movingValues.length;
const updateMovingValues = (slice, chartType, movingValues) => {
  const configs = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType)[1];
  if (_isRequireUpdateMovingValues(configs, movingValues)) {
    const _hmConfigs = configs.reduce((hm, config) => {
      hm[_getConfigId(config)] = config;
      return hm;
    }, Object.create(null));
    movingValues.forEach(mv => {
      const _config = _hmConfigs[mv._id];
      if (_config) {
        _config.valueMoving = mv;
      }
    });
  }
};
exports.updateMovingValues = updateMovingValues;
//# sourceMappingURL=ChartLogic.js.map