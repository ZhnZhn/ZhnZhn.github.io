"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("./AdapterFn");
var _CategoryFn = require("./CategoryFn");
var _crCategoryConfig = _interopRequireDefault(require("./crCategoryConfig"));
var _fToCategorySeries = _interopRequireDefault(require("./fToCategorySeries"));
const FN_ECHO = v => v;
const crAdapterCategory = function (crData,
//FAOSTAT
crTitle) {
  if (crTitle === void 0) {
    crTitle = FN_ECHO;
  }
  const adapter = {
    toConfig: (json, option) => {
      const {
          title,
          subtitle,
          seriaType,
          seriaColor,
          _itemKey,
          time,
          dataSource
        } = option,
        data = crData(json, option),
        _arrSeriaType = seriaType.split('_'),
        config = (0, _crCategoryConfig.default)(crTitle(subtitle, json), title, _arrSeriaType[0], seriaColor, data, (0, _CategoryFn.isCategoryCluster)(seriaType));
      config.zhConfig = {
        id: _itemKey,
        key: _itemKey,
        itemCaption: (0, _AdapterFn.joinBy)(': ', subtitle, title),
        itemTime: time,
        dataSource
      };
      return {
        config
      };
    }
  };
  adapter.toSeries = (0, _fToCategorySeries.default)(adapter.toConfig);
  return adapter;
};
var _default = exports.default = crAdapterCategory;
//# sourceMappingURL=crAdapterCategory.js.map