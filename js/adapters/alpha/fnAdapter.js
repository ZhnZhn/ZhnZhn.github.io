"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _legendFn = require("../legendFn");

const {
  crError,
  getValue,
  getCaption,
  joinBy,
  crItemConf,
  crValueConf,
  valueMoving,
  ymdToUTC,
  compareByDate,
  roundBy
} = _AdapterFn.default;

const _crItemConf = (_ref, option) => {
  let {
    data
  } = _ref;
  const {
    _itemKey,
    dfFn,
    dfSubId,
    items,
    dataSource
  } = option;
  return dfFn === 'TIME_SERIES_DAILY' ? {
    _itemKey,
    ...crItemConf(option),
    ...crValueConf(data),
    items: [...(items || [])],
    dfSubId,
    dfFn,
    dataSource
  } : void 0;
};

const _crZhConfig = (config, option) => {
  const {
    _itemKey,
    itemCaption
  } = option,
        {
    id,
    dataSource
  } = config,
        _id = _itemKey || id,
        itemConf = _crItemConf(config, option);

  return {
    id: _id,
    key: _id,
    itemCaption,
    itemConf,
    legend: (0, _legendFn.stockSeriesLegend)(),
    dataSource: dataSource || "Alpha Vantage"
  };
};

const fnAdapter = {
  crError,
  getValue,
  getCaption,
  joinBy,
  valueMoving,
  ymdToUTC,
  compareByDate,
  roundBy,
  crIntradayConfigOption: (config, option) => ({
    zhConfig: _crZhConfig(config, option),
    valueMoving: valueMoving(config.data)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map