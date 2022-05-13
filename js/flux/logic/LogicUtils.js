"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Type = require("../../constants/Type");

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
  return loadId === _Type.LoadType.QCT && !isLoadMeta ? seriaType === _ChartType.CHT_AREA ? value + "_" + _ChartType.CHT_AREA + "_" + dataColumn : value + "_" + seriaType : viewKey || value;
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
      case _Type.LoadType.Q:
      case _Type.LoadType.QCT:
        return _itemKey || _crQuandlKey(option);

      case _Type.LoadType.EU_STAT:
      case _Type.LoadType.EIA:
      case _Type.LoadType.WL:
        return _itemKey || option.id;

      default:
        return _crKey(option);
    }
  }

};
var _default = LogicUtils;
exports.default = _default;
//# sourceMappingURL=LogicUtils.js.map