"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _fnFetch = require("../../utils/fnFetch");
var _fGetLazyValue = require("../../utils/fGetLazyValue");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _CategoryFn = require("../CategoryFn");
var _TreeMapFn = require("../TreeMapFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _crCategoryConfig = (json, option, data, categories, itemValue) => {
  const title = (0, _fnAdapter.crCategoryTitle)(option);
  return (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)('BAR', categories), (0, _configBuilderFn.fAddCaption)(title, option.subtitle), (0, _configBuilderFn.fAdd)({
    info: (0, _fnAdapter.crInfo)(json, option),
    zhConfig: (0, _fnAdapter.crZhConfig)(option, {
      itemValue,
      isWi: false
    })
  }), (0, _configBuilderFn.fAddSeriaBy)(0, {
    data: data,
    name: title
  }), _configBuilderFn.toConfig);
};
const URL_HS_CHAPTERS = './data/uncomtrade/hs-chapters.json';
const _crAsyncHmHs = () => (0, _fnFetch.fetchJsonHm)(URL_HS_CHAPTERS),
  _getAsyncHmHs = (0, _fGetLazyValue.fGetLazyValue)(_crAsyncHmHs, true);
const _addLevelColorsTo = (data, total, option) => {
  (0, _compareByFn.sortDescCategory)(data);
  (0, _fnAdapter.addSumOfPercentToSubtitle)(option, ...(0, _TreeMapFn.addColorsTo)({
    data,
    total,
    propName: "y"
  }));
};
const _crHsData = (hmHs, json, option) => {
  const isHs = !!hmHs,
    data = [];
  let total = 0;
  json.data.forEach(item => {
    const value = (0, _fnAdapter.getItemTradeValue)(item);
    if ((0, _isTypeFn.isPositiveNumber)(value)) {
      const cmdCode = (0, _fnAdapter.getItemCmdCode)(item),
        descr = isHs && hmHs[cmdCode];
      total += value;
      data.push({
        c: descr ? cmdCode + ' ' + descr : cmdCode,
        y: value
      });
    }
  });
  _addLevelColorsTo(data, total, option);
  return [data, (0, _CategoryFn.crCategories)(data), total];
};
const _toCategoryByHs = (json, option) => _getAsyncHmHs().then(hmHs => _crHsData(hmHs, json, option)).then(dataConfigTuple => _crCategoryConfig(json, option, ...dataConfigTuple));
const _crDataPoint = (y, c) => ({
  y,
  c
});
const _toCategoryByCountry = (json, option) => {
  const [data, totalOfWorld] = (0, _fnAdapter.crCategoryData)(json, option, _crDataPoint);
  _addLevelColorsTo(data, totalOfWorld, option);
  return _crCategoryConfig(json, option, data, (0, _CategoryFn.crCategories)(data), totalOfWorld);
};
const toCategory = (json, option) => ((0, _fnAdapter.isAggregateByHs)(option) ? _toCategoryByHs : _toCategoryByCountry)(json, option);
var _default = exports.default = toCategory;
//# sourceMappingURL=toCategory.js.map