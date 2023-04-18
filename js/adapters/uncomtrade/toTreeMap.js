"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _TreeMapFn = require("../TreeMapFn");
var _fnAdapter = require("./fnAdapter");
var _conf = require("./conf");
const _compareByValue = (a, b) => b.value - a.value;
const _addPercentAndColorToData = (data, total) => {
  if (total !== 0) {
    const _onePercent = total / 100;
    data.forEach(item => {
      item.percent = (0, _fnAdapter.roundBy)(item.value / _onePercent);
      item.name = (0, _TreeMapFn.crPointName)(item.label, item.percent > 1 ? item.percent : '');
    });
    data.sort(_compareByValue);
    (0, _TreeMapFn.addColorsTo)({
      data,
      total
    });
  } else {
    data = [];
  }
};
const _crTreeMapData = json => {
  const data = [];
  let total = 0;
  json.dataset.forEach(item => {
    const value = (0, _fnAdapter.getItemTradeValue)(item);
    if ((0, _fnAdapter.isPositiveNumber)(value)) {
      total += value;
      data.push({
        value,
        label: (0, _fnAdapter.getItemCmdCode)(item) + ' ' + (0, _fnAdapter.getItemCmdDescE)(item),
        title: (0, _fnAdapter.getItemPeriod)(item)
      });
    }
  });
  _addPercentAndColorToData(data, total);
  return data;
};
const _crDataByCountry = (json, option) => {
  const data = [];
  let totalWorld = 0,
    total = 0,
    _hm = (0, _fnAdapter.getHmTradePartners)(option.tradePartners);
  json.dataset.forEach(item => {
    const value = (0, _fnAdapter.getItemTradeValue)(item),
      ptTitle = (0, _fnAdapter.getItemPtTitle)(item);
    if (ptTitle === _conf.WORLD_CODE && (0, _fnAdapter.isSameTradePartnerCode)(item)) {
      totalWorld = value;
    } else if ((0, _fnAdapter.isNotNested)(ptTitle) && (0, _fnAdapter.isPositiveNumber)(value) && (0, _fnAdapter.isSameTradePartnerCode)(item)) {
      total += value;
      data.push({
        value,
        label: _hm[ptTitle] || ptTitle,
        title: (0, _fnAdapter.getItemPeriod)(item)
      });
    }
  });
  _addPercentAndColorToData(data, totalWorld || total);
  return data;
};
const toTreeMap = (json, option) => {
  const data = (0, _fnAdapter.isTotalByAll)(option) ? _crDataByCountry(json, option) : _crTreeMapData(json);
  return (0, _pipe.default)((0, _configBuilderFn.crTreeMapConfig)(data), (0, _configBuilderFn.fAddCaption)((0, _fnAdapter.crCategoryTitle)(option), option.subtitle), (0, _configBuilderFn.fAdd)({
    info: (0, _fnAdapter.crInfo)(json, option),
    zhConfig: (0, _fnAdapter.crZhConfig)(option)
  }), _configBuilderFn.toConfig);
};
var _default = toTreeMap;
exports.default = _default;
//# sourceMappingURL=toTreeMap.js.map