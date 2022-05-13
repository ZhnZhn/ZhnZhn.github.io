"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadType = require("../../constants/LoadType");

var _ChartType = require("../../constants/ChartType");

var _LoadConfig = _interopRequireDefault(require("./LoadConfig"));

const _isFn = fn => typeof fn === 'function';

const _crQuandlKey = function (option) {
  const {
    loadId,
    isLoadMeta,
    value,
    dataColumn,
    seriaType,
    viewKey
  } = option;
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

const LogicUtils = {
  createKeyForConfig(option) {
    const {
      loadId,
      _itemKey
    } = option;

    switch (loadId) {
      case _LoadType.LT_Q:
      case _LoadType.LT_QCT:
        return _itemKey || _crQuandlKey(option);

      case _LoadType.LT_EU_STAT:
      case _LoadType.LT_EIA:
      case _LoadType.LT_WL:
        return _itemKey || option.id;

      default:
        return _crKey(option);
    }
  }

};
var _default = LogicUtils;
exports.default = _default;
//# sourceMappingURL=LogicUtils.js.map