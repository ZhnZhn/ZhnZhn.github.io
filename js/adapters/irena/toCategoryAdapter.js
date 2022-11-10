"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _CategoryFn = require("../CategoryFn");

var _crCategoryConfig = _interopRequireDefault(require("../crCategoryConfig"));

var _fToCategorySeries = _interopRequireDefault(require("../fToCategorySeries"));

const _crData = json => json.data.map(arrP => ({
  y: arrP[1],
  name: arrP[0],
  c: arrP[0]
}));

const toCategoryAdapter = {
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
          data = _crData(json),
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
toCategoryAdapter.toSeries = (0, _fToCategorySeries.default)(toCategoryAdapter.toConfig);
var _default = toCategoryAdapter;
exports.default = _default;
//# sourceMappingURL=toCategoryAdapter.js.map