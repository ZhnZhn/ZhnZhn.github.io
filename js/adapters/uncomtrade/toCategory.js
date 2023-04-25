"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _TreeMapFn = require("../TreeMapFn");
var _fnAdapter = require("./fnAdapter");
const _crConfig = (json, option, data, categories, itemValue) => {
  const title = (0, _fnAdapter.crCategoryTitle)(option);
  const config = (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)('BAR', categories), (0, _configBuilderFn.fAddCaption)(title, option.subtitle), (0, _configBuilderFn.fAdd)({
    info: (0, _fnAdapter.crInfo)(json, option),
    zhConfig: (0, _fnAdapter.crZhConfig)(option, {
      itemValue,
      isWi: false
    })
  }), (0, _configBuilderFn.fAddSeriaBy)(0, {
    data: data,
    name: title
  }), _configBuilderFn.toConfig);
  return config;
};
const URL_HS_CHAPTERS = './data/uncomtrade/hs-chapters.json';
let _hmHs;
const _fetchHs = () => _hmHs ? Promise.resolve(_hmHs) : fetch(URL_HS_CHAPTERS).then(res => {
  if (!res.ok) {
    throw new Error("Network response was not OK");
  }
  return res.json();
}).then(json => {
  return _hmHs = (json || {}).hm;
}).catch(() => void 0);
const _compareByY = (a, b) => b.y - a.y;
const _crCategoriesAndAddColors = (data, total) => {
  data.sort(_compareByY);
  (0, _TreeMapFn.addColorsTo)({
    data,
    total,
    propName: "y"
  });
  return data.map(p => p.c);
};
const _crHsData = (json, hmHs) => {
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
  const categories = _crCategoriesAndAddColors(data, total);
  return [data, categories, total];
};
const _crAsyncData = json => _fetchHs().then(hmHs => _crHsData(json, hmHs));
const _crDataPoint = (y, c) => ({
  y,
  c
});
const _toCategoryByCountry = (json, option) => {
  const [data, totalOfWorld] = (0, _fnAdapter.crCategoryData)(json, option, _crDataPoint),
    categories = _crCategoriesAndAddColors(data, totalOfWorld);
  return _crConfig(json, option, data, categories, totalOfWorld);
};
const toCategory = (json, option) => (0, _fnAdapter.isTotalByAll)(option) ? _toCategoryByCountry(json, option) : _crAsyncData(json).then(_ref => {
  let [data, categories, total] = _ref;
  return _crConfig(json, option, data, categories, total);
});
var _default = toCategory;
exports.default = _default;
//# sourceMappingURL=toCategory.js.map