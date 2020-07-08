"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var valueMoving = _AdapterFn["default"].valueMoving,
    crItemLink = _AdapterFn["default"].crItemLink;

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    dataSource: dataSource
  };
};

var _crDescription = crItemLink.bind(null, 'Coin Gecko');

var _crInfo = function _crInfo(_ref2) {
  var title = _ref2.title,
      _nativeUrl = _ref2._nativeUrl;
  return {
    name: title,
    description: _crDescription(_nativeUrl)
  };
};

var _crConfigOption = function _crConfigOption(_ref3) {
  var json = _ref3.json,
      option = _ref3.option,
      data = _ref3.data;
  return {
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option)
  };
};

var toChart = {
  crKey: function crKey(option) {
    return option._itemKey;
  },
  toConfig: function toConfig(json, option) {
    var data = json.prices,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        title = option.title,
        subtitle = option.subtitle,
        _currency = option._currency,
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth,
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder["default"])().area2Config(title, subtitle).addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, _crConfigOption({
      json: json,
      option: option,
      data: data
    }))).addMiniVolume({
      btTitle: 'Volume',
      title: 'Volume ' + _currency,
      dVolume: json.total_volumes
    }).addMiniVolume({
      btTitle: 'Market Cap',
      title: 'Market Cap ' + _currency,
      dVolume: json.market_caps
    }).toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return _ConfigBuilder["default"].crSeria({
      adapter: toChart,
      json: json,
      option: option
    });
  }
};
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map