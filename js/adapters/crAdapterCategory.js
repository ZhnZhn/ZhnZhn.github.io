"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("./CategoryFn");
var _crCategoryConfig = _interopRequireDefault(require("./crCategoryConfig"));
var _fToCategorySeries = _interopRequireDefault(require("./fToCategorySeries"));
const crAdapterCategory = crData => {
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
        config = (0, _crCategoryConfig.default)(subtitle, title, _arrSeriaType[0], seriaColor, data, (0, _CategoryFn.isCategoryCluster)(seriaType));
      config.zhConfig = {
        id: _itemKey,
        key: _itemKey,
        itemCaption: subtitle + ": " + title,
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
var _default = crAdapterCategory;
exports.default = _default;
//# sourceMappingURL=crAdapterCategory.js.map