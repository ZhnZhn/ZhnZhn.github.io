"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crKeyForConfig = void 0;
var _LoadType = require("../../constants/LoadType");
var _ChartType = require("../../constants/ChartType");
var _LoadConfig = _interopRequireDefault(require("./LoadConfig"));
const _isFn = fn => typeof fn === 'function';
const _crNdlKey = _ref => {
  let {
    loadId,
    isLoadMeta,
    value,
    dataColumn,
    seriaType,
    viewKey
  } = _ref;
  return loadId === _LoadType.LT_QCT && !isLoadMeta ? seriaType === _ChartType.CHT_AREA ? value + "_" + _ChartType.CHT_AREA + "_" + dataColumn : value + "_" + seriaType : viewKey || value;
};
const _crKey = option => {
  const {
      loadId,
      value,
      _itemKey
    } = option,
    loadConfig = _LoadConfig.default[loadId] || {},
    {
      crKey
    } = loadConfig;
  return _isFn(crKey) ? crKey(option) : _itemKey || value || 'key';
};
const crKeyForConfig = option => {
  const {
    loadId,
    _itemKey,
    id
  } = option;
  switch (loadId) {
    case _LoadType.LT_Q:
    case _LoadType.LT_QCT:
      return _itemKey || _crNdlKey(option);
    case _LoadType.LT_EU_STAT:
    case _LoadType.LT_EIA:
    case _LoadType.LT_WL:
      return _itemKey || id;
    default:
      return _crKey(option);
  }
};
exports.crKeyForConfig = crKeyForConfig;
//# sourceMappingURL=LogicFn.js.map