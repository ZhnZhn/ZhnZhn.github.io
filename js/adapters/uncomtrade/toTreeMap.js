"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _dompurify = _interopRequireDefault(require("dompurify"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = require("./fnAdapter");

const _sanitize = _dompurify.default.sanitize;

const _isNumber = n => typeof n === 'number' && n - n === 0;

const NUMBER_STYLE = 'style="color:#333;"',
      _crPointName = (label, value, percent) => label + " <br/>\n    <span " + NUMBER_STYLE + ">" + (0, _fnAdapter.numberFormat)(value) + " (" + percent + "%)</span>";

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
        label: (cmdCode || '').length === 2 ? cmdCode : _sanitize(cmdCode),
        _d: _sanitize(item.cmdDescE),
        title: _isNumber(period) ? '' + period : _sanitize(period)
      });
    }
  });

  const _onePercent = _total / 100;

  data.forEach(item => {
    item.percent = (0, _fnAdapter.roundBy)(item.value / _onePercent);
    item.name = _crPointName(item.label + ' ' + item._d, item.value, item.percent);
    item._d = void 0;
  });
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