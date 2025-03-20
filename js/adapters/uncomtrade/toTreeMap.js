"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _TreeMapFn = require("../TreeMapFn");
var _fnAdapter = require("./fnAdapter");
const _crTreeMapData = json => {
  const data = [];
  let total = 0;
  json.data.forEach(item => {
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
  (0, _TreeMapFn.addPercentAndColorToData)(data, total);
  return [data, total];
};
const _crDataPoint = (value, label, item) => ({
  value,
  label,
  title: (0, _fnAdapter.getItemPeriod)(item)
});
const _crDataByCountry = (json, option) => {
  const [data, totalOfWorld] = (0, _fnAdapter.crCategoryData)(json, option, _crDataPoint);
  (0, _TreeMapFn.addPercentAndColorToData)(data, totalOfWorld);
  return [data, totalOfWorld];
};
const toTreeMap = (json, option) => {
  const [data, itemValue] = (0, _fnAdapter.isAggregateByHs)(option) ? _crTreeMapData(json) : _crDataByCountry(json, option);
  return (0, _pipe.default)((0, _configBuilderFn.crTreeMapConfig)(data), (0, _configBuilderFn.fAddCaption)((0, _fnAdapter.crCategoryTitle)(option), option.subtitle), (0, _configBuilderFn.fAdd)({
    info: (0, _fnAdapter.crInfo)(json, option),
    zhConfig: (0, _fnAdapter.crZhConfig)(option, {
      itemValue
    })
  }), _configBuilderFn.toConfig);
};
var _default = exports.default = toTreeMap;
//# sourceMappingURL=toTreeMap.js.map