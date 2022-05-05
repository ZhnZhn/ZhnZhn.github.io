"use strict";

exports.__esModule = true;
exports.ymdhmsToUTC = exports.ymdToUTC = exports.roundBy = exports.joinBy = exports.getValue = exports.getCaption = exports.crIntradayConfigOption = exports.crError = exports.compareByDate = exports._isNaN = void 0;

var _AdapterFn = require("../AdapterFn");

exports._isNaN = _AdapterFn._isNaN;
exports.getValue = _AdapterFn.getValue;
exports.getCaption = _AdapterFn.getCaption;
exports.joinBy = _AdapterFn.joinBy;
exports.valueMoving = _AdapterFn.valueMoving;
exports.ymdToUTC = _AdapterFn.ymdToUTC;
exports.ymdhmsToUTC = _AdapterFn.ymdhmsToUTC;
exports.roundBy = _AdapterFn.roundBy;

var _compareByFn = require("../compareByFn");

exports.compareByDate = _compareByFn.compareByDate;

var _crFn = require("../crFn");

exports.crError = _crFn.crError;

var _legendFn = require("../legendFn");

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
    ...(0, _crFn.crItemConf)(option),
    ...(0, _crFn.crValueConf)(data),
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

const crIntradayConfigOption = (config, option) => ({
  zhConfig: _crZhConfig(config, option),
  valueMoving: (0, _AdapterFn.valueMoving)(config.data)
});

exports.crIntradayConfigOption = crIntradayConfigOption;
//# sourceMappingURL=fnAdapter.js.map