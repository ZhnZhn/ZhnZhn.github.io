"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("./AdapterFn");
var _CategoryFn = require("./CategoryFn");
var _crCategoryConfig = _interopRequireDefault(require("./crCategoryConfig"));
var _fToCategorySeries = _interopRequireDefault(require("./fToCategorySeries"));
const crItemCaptionDf = _ref => {
  let {
    subtitle,
    title
  } = _ref;
  return (0, _AdapterFn.joinBy)(': ', subtitle, title);
};
const crAdapterCategory = function (crData,
//UNCOMTRADE
crItemCaption) {
  if (crItemCaption === void 0) {
    crItemCaption = crItemCaptionDf;
  }
  const adapter = {
    toConfig: (json, option) => {
      const {
          seriaType,
          dataSource
        } = option,
        data = crData(json, option),
        _arrSeriaType = seriaType.split('_'),
        config = (0, _crCategoryConfig.default)(option.subtitle, option.title, _arrSeriaType[0], option.seriaColor, data, (0, _CategoryFn.isCategoryCluster)(seriaType), option.isAlg);

      //UNCOMTRADE toCategorySet generated _itemKey
      const {
        _itemKey
      } = option;
      config.zhConfig = {
        id: _itemKey,
        key: _itemKey,
        itemCaption: crItemCaption(option),
        itemTime: option.time,
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