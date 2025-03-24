"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fGetLazyValue = require("../../utils/fGetLazyValue");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _TreeMapFn = require("../TreeMapFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _crConfig = (json, option, data, categories, itemValue) => {
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
const _crAsyncHmHs = () => fetch(URL_HS_CHAPTERS).then(res => {
  if (!res.ok) {
    throw new Error("Network response was not OK");
  }
  return res.json();
}).then(json => (json || {}).hm).catch(() => void 0);
const _getHmHs = (0, _fGetLazyValue.fGetLazyValue)(_crAsyncHmHs, true);
const _addLevelColorsTo = (data, total, option) => {
  (0, _compareByFn.sortDescCategory)(data);
  (0, _fnAdapter.addSumOfPercentToSubtitle)(option, ...(0, _TreeMapFn.addColorsTo)({
    data,
    total,
    propName: "y"
  }));
};
const _crCategoriesFrom = data => data.map(p => p.c);
const _crHsData = (hmHs, json, option) => {
  const isHs = !!hmHs,
    data = [];
  let total = 0;
  json.data.forEach(item => {
    const value = (0, _fnAdapter.getItemTradeValue)(item);
    if ((0, _fnAdapter.isPositiveNumber)(value)) {
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
  return [data, _crCategoriesFrom(data), total];
};
const _crAsyncData = (json, option) => _getHmHs().then(hmHs => _crHsData(hmHs, json, option));
const _crDataPoint = (y, c) => ({
  y,
  c
});
const _toCategoryByCountry = (json, option) => {
  const [data, totalOfWorld] = (0, _fnAdapter.crCategoryData)(json, option, _crDataPoint);
  _addLevelColorsTo(data, totalOfWorld, option);
  return _crConfig(json, option, data, _crCategoriesFrom(data), totalOfWorld);
};
const toCategory = (json, option) => (0, _fnAdapter.isAggregateByHs)(option) ? _crAsyncData(json).then(_ref => {
  let [data, categories, total] = _ref;
  return _crConfig(json, option, data, categories, total);
}) : _toCategoryByCountry(json, option);
var _default = exports.default = toCategory;
//# sourceMappingURL=toCategory.js.map