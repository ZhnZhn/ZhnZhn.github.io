"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var Builder = _crConfigType["default"].Builder;
var crItemLink = _AdapterFn["default"].crItemLink;

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

var _crConfigOption = function _crConfigOption(option) {
  return {
    zhConfig: _crZhConfig(option),
    info: _crInfo(option)
  };
};

var toChart = {
  crKey: function crKey(option) {
    return option._itemKey;
  },
  toConfig: function toConfig(json, option) {
    var data = json.prices,
        total_volumes = json.total_volumes,
        market_caps = json.market_caps,
        _currency = option._currency,
        confOption = _crConfigOption(option),
        config = Builder((0, _crConfigType["default"])({
      option: option,
      data: data,
      confOption: confOption
    })).addMiniVolume({
      btTitle: 'Volume',
      title: 'Volume ' + _currency,
      dVolume: total_volumes
    }).addMiniVolume({
      btTitle: 'Market Cap',
      title: 'Market Cap ' + _currency,
      dVolume: market_caps
    }).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return Builder.crSeria({
      adapter: toChart,
      json: json,
      option: option
    });
  }
};
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map