"use strict";

exports.__esModule = true;
exports.ymdhmsToUTC = exports.toUpperCaseFirst = exports.numberFormat = exports.joinBy = exports.isTokenInStr = exports.isInArrStr = exports.isArr = exports.getValueCaption = exports.getValue = exports.getCaption = exports.fCrData = exports.crIntradayConfigOption = exports.crError = exports.DF_FN_EOD = void 0;
var _AdapterFn = require("../AdapterFn");
exports.isArr = _AdapterFn.isArr;
exports.isInArrStr = _AdapterFn.isInArrStr;
exports.isTokenInStr = _AdapterFn.isTokenInStr;
exports.getValue = _AdapterFn.getValue;
exports.getCaption = _AdapterFn.getCaption;
exports.getValueCaption = _AdapterFn.getValueCaption;
exports.toUpperCaseFirst = _AdapterFn.toUpperCaseFirst;
exports.joinBy = _AdapterFn.joinBy;
exports.valueMoving = _AdapterFn.valueMoving;
exports.ymdToUTC = _AdapterFn.ymdToUTC;
exports.ymdhmsToUTC = _AdapterFn.ymdhmsToUTC;
exports.roundBy = _AdapterFn.roundBy;
exports.numberFormat = _AdapterFn.numberFormat;
exports.crError = _AdapterFn.crError;
var _compareByFn = require("../compareByFn");
var _crFn = require("../crFn");
var _legendFn = require("../legendFn");
const DF_FN_EOD = "EOD";
exports.DF_FN_EOD = DF_FN_EOD;
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
const fCrData = (paramNameY, paramNameX, yConfig) => data => {
  const _crY = yConfig === '10' ? v => parseInt(v, 10) : yConfig === 'round' ? _AdapterFn.roundBy : parseFloat;
  return (data || []).reduce(function (arr, item) {
    if (item === void 0) {
      item = {};
    }
    const _y = _crY(item[paramNameY]);
    if (!(0, _AdapterFn._isNaN)(_y)) {
      arr.push([(0, _AdapterFn.ymdToUTC)(item[paramNameX]), _y]);
    }
    return arr;
  }, []).sort(_compareByFn.compareByDate);
};
exports.fCrData = fCrData;
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