"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _TreeMapFn = require("../TreeMapFn");

var _fnAdapter = require("./fnAdapter");

const _isNumber = n => typeof n === 'number' && n - n === 0;

const _compareByValue = (a, b) => b.value - a.value;

const _crTreeMapData = json => {
  const data = [];
  let _total = 0;
  json.dataset.forEach(item => {
    const value = item.TradeValue,
          cmdCode = item.cmdCode,
          period = item.period;

    if (_isNumber(value) && value > 0) {
      _total += value;
      data.push({
        value,
        label: (cmdCode || '').length === 2 ? cmdCode : (0, _domSanitize.default)(cmdCode),
        _d: (0, _domSanitize.default)(item.cmdDescE),
        title: _isNumber(period) ? '' + period : (0, _domSanitize.default)(period)
      });
    }
  });

  const _onePercent = _total / 100;

  data.forEach(item => {
    item.percent = (0, _fnAdapter.roundBy)(item.value / _onePercent);
    item.name = (0, _TreeMapFn.crPointName)(item.label + ' ' + item._d, item.value, item.percent);
    item._d = void 0;
  });
  data.sort(_compareByValue);
  (0, _TreeMapFn.addColorsTo)(data, _total);
  return data;
};

const _crTitle = _ref => {
  let {
    title,
    period
  } = _ref;
  return [title, 'in', period].filter(Boolean).join(' ');
};

const toTreeMap = (json, option) => {
  const config = (0, _ConfigBuilder.default)().treeMapConfig(_crTreeMapData(json)).addCaption(_crTitle(option), option.subtitle).add({
    info: (0, _fnAdapter.crInfo)(json, option),
    zhConfig: (0, _fnAdapter.crZhConfig)(option)
  }).toConfig();
  return config;
};

var _default = toTreeMap;
exports.default = _default;
//# sourceMappingURL=toTreeMap.js.map