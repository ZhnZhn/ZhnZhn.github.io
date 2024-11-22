"use strict";

exports.__esModule = true;
exports.crRouter = exports.crKeyForConfig = void 0;
var _crRouter = require("../../utils/crRouter");
exports.crRouter = _crRouter.crRouter;
var _isTypeFn = require("../../utils/isTypeFn");
var _LoadType = require("../../constants/LoadType");
var _LoadImpl = require("./LoadImpl");
const _crNdlKey = _ref => {
  let {
    loadId,
    isLoadMeta,
    value,
    dataColumn,
    seriaType,
    viewKey
  } = _ref;
  return viewKey || value;
};
const _crItemKey = option => {
  const {
      loadId,
      value,
      _itemKey
    } = option,
    loadConfig = (0, _LoadImpl.getLoadImpl)(loadId) || {},
    {
      crKey
    } = loadConfig;
  return (0, _isTypeFn.isFn)(crKey) ? crKey(option) : _itemKey || value || 'key';
};
const crKeyForConfig = option => {
  const {
    _itemKey
  } = option;
  switch (option.loadId) {
    case _LoadType.LT_Q:
      return _itemKey || _crNdlKey(option);
    case _LoadType.LT_EU_STAT:
    case _LoadType.LT_EIA:
    case _LoadType.LT_WL:
      return _itemKey || option.id;
    default:
      return _crItemKey(option);
  }
};
exports.crKeyForConfig = crKeyForConfig;
//# sourceMappingURL=LogicFn.js.map