"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ChartType = require("../../constants/ChartType");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _mathFn = require("../../math/mathFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
var _JsonStatFn = require("../JsonStatFn");
var _TreeMapFn = require("../TreeMapFn");
var _fnAdapter = require("./fnAdapter");
const _toHm = arr => {
  const hm = Object.create(null);
  arr.forEach(item => {
    hm[item.caption] = item;
  });
  return hm;
};
const _fIsPoint = (dfT, hm) => p => {
  if (dfT && p.label === dfT) {
    return false;
  }
  if (p.label.split(' ')[0].length !== 2) {
    return false;
  }
  return p.y !== null && p.y !== 0;
};
const _addPercent = data => {
  const _total = data.reduce((acc, item) => acc + item.value, 0),
    _onePercent = _total / 100;
  return [data.map(p => {
    p.percent = (0, _mathFn.roundBy)(p.value / _onePercent);
    p.name = (0, _TreeMapFn.crPointName)(p.label, p.percent);
    return p;
  }), _total];
};
const _crData = (json, option) => (0, _compareByFn.sortDescByPnValue)((0, _JsonStatFn.crData)((0, _CategoryFn.fCrTreeMapPoint)(option.time), json).filter(_fIsPoint(option.cTotal, _toHm(option.selectOptions[0]))));
const _crSubtitle = (items, time) => `${((items || [])[1] || {}).caption || ''}: ${time}`;
const _crConfig = (json, option) => {
  const {
      time
    } = option,
    _title = (0, _fnAdapter.crTitle)(option),
    _subtitle = _crSubtitle(option.items, time),
    _data = _crData(json, option),
    [data, total] = _addPercent(_data);
  if (option.isCluster) {
    (0, _TreeMapFn.addColorsTo)({
      data,
      total
    });
  }
  return (0, _pipe.default)((0, _configBuilderFn.crTreeMapConfig)(data), (0, _configBuilderFn.fAddCaption)(_title, _subtitle), (0, _configBuilderFn.fAdd)((0, _fnAdapter.crChartOption)(time, option, json)), _configBuilderFn.toConfig);
};
const _fCrConfig = function (configOption) {
  if (configOption === void 0) {
    configOption = {};
  }
  return (json, option) => _crConfig(json, {
    ...option,
    ...configOption
  });
};
const routerTreeMap = {
  [_ChartType.CHT_TREE_MAP]: _fCrConfig(),
  [_ChartType.CHT_TREE_MAP_CLUSTER]: _fCrConfig({
    isCluster: true
  })
};
var _default = exports.default = routerTreeMap;
//# sourceMappingURL=toTreeMap.js.map