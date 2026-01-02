"use strict";

exports.__esModule = true;
exports.ymdhmsToUTC = exports.valueMoving = exports.isArr = exports.fCrData = exports.crIntradayConfigOption = exports.crError = exports.crDfItemKey = exports.DF_FN_EOD = void 0;
var _AdapterFn = require("../AdapterFn");
exports.isArr = _AdapterFn.isArr;
exports.crDfItemKey = _AdapterFn.crDfItemKey;
exports.valueMoving = _AdapterFn.valueMoving;
exports.ymdhmsToUTC = _AdapterFn.ymdhmsToUTC;
exports.crError = _AdapterFn.crError;
var _AvFn = require("../av/AvFn");
exports.fCrData = _AvFn.fCrData;
var _crFn = require("../crFn");
var _legendFn = require("../legendFn");
const DF_FN_EOD = exports.DF_FN_EOD = "EOD";
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
  return dfFn === DF_FN_EOD ? {
    _itemKey,
    ...(0, _crFn.crItemConf)(option),
    ...(0, _crFn.crValueConf)(data),
    items: [...(items || [])],
    dfFn,
    dfSubId,
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
  zhConfig: _crZhConfig(config, option)
});
exports.crIntradayConfigOption = crIntradayConfigOption;
//# sourceMappingURL=fnAdapter.js.map