"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _LoadConfig = _interopRequireDefault(require("./LoadConfig"));

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crQuandlKey = function _crQuandlKey(option) {
  var loadId = option.loadId,
      isLoadMeta = option.isLoadMeta,
      value = option.value,
      dataColumn = option.dataColumn,
      seriaType = option.seriaType,
      viewKey = option.viewKey;
  return loadId === _Type.LoadType.QCT && !isLoadMeta ? seriaType === _Type.ChartType.AREA ? value + "_" + _Type.ChartType.AREA + "_" + dataColumn : value + "_" + seriaType : viewKey || value;
};

var _crKey = function _crKey(option) {
  var loadId = option.loadId,
      value = option.value,
      _itemKey = option._itemKey,
      loadConfig = _LoadConfig["default"][loadId] || {},
      crKey = loadConfig.crKey;
  return _isFn(crKey) ? crKey(option) : _itemKey || value || 'key';
};

var LogicUtils = {
  createKeyForConfig: function createKeyForConfig(option) {
    var loadId = option.loadId,
        _itemKey = option._itemKey;

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
exports["default"] = _default;
//# sourceMappingURL=LogicUtils.js.map