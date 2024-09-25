"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("./AdapterFn");
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
      const data = crData(json, option),
        config = (0, _crCategoryConfig.default)(option.subtitle, option.title, option.seriaType, option.seriaColor, data, option.isAlg);

      //UNCOMTRADE toCategorySet generated _itemKey
      const {
        _itemKey
      } = option;
      config.zhConfig = {
        id: _itemKey,
        key: _itemKey,
        itemCaption: crItemCaption(option),
        itemTime: option.time,
        dataSource: option.dataSource
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