"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crItemLink = _AdapterFn["default"].crItemLink;

var _crDescription = crItemLink.bind(null, 'Coin Gecko');

var _crInfo = function _crInfo(_ref) {
  var title = _ref.title,
      _nativeUrl = _ref._nativeUrl;
  return {
    name: title,
    description: _crDescription(_nativeUrl)
  };
};

var _crMvOption = function _crMvOption(btTitle, currency, dVolume) {
  return {
    btTitle: btTitle,
    title: btTitle + " " + currency,
    dVolume: dVolume
  };
};

var crData = function crData(_ref2) {
  var prices = _ref2.prices;
  return prices;
},
    addConfOption = function addConfOption(option) {
  return {
    info: _crInfo(option)
  };
},
    addConfig = function addConfig(builder, json, option) {
  var total_volumes = json.total_volumes,
      market_caps = json.market_caps,
      _currency = option._currency;
  return builder.addMiniVolume(_crMvOption('Volume', _currency, total_volumes)).addMiniVolume(_crMvOption('Market Cap', _currency, market_caps));
};

var toChart = (0, _crAdapterType["default"])({
  crData: crData,
  addConfOption: addConfOption,
  addConfig: addConfig
});
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map