"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getCaption = _fnAdapter["default"].getCaption,
    getValue = _fnAdapter["default"].getValue,
    crError = _fnAdapter["default"].crError;
var C = {
  URI: 'https://financialmodelingprep.com/api/v3',
  ERR_EMPTY: 'Response is empty'
};

var _configOption = function _configOption(option) {
  var dfT = option.dfT,
      _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      dataSource = option.dataSource,
      _option$conf = option.conf,
      conf = _option$conf === void 0 ? {} : _option$conf,
      _conf$chartContainerC = conf.chartContainerCaption,
      chartContainerCaption = _conf$chartContainerC === void 0 ? '' : _conf$chartContainerC,
      it1 = items[0],
      it2 = items[1],
      it3 = items[2],
      _symbol = getValue(it1),
      _period = getValue(it3),
      _propName = getCaption(it2),
      _query = _period ? "?period=" + _period : '',
      _itemUrl = C.URI + "/" + dfT + "/" + _symbol + _query;

  Object.assign(option, {
    _itemUrl: _itemUrl,
    _symbol: _symbol,
    _period: _period,
    _propName: _propName,
    dataSource: dataSource || chartContainerCaption
  });
};

var FmpApi = {
  getRequestUrl: function getRequestUrl(option) {
    _configOption(option);

    return option._itemUrl;
  },
  checkResponse: function checkResponse(json, options) {
    var dfPn = options.dfPn,
        _symbol = options._symbol,
        _json = json || {},
        _values = _json[dfPn];

    if (Array.isArray(_values) && json.symbol === _symbol) {
      json._values = _values;
      return true;
    }

    throw crError(_symbol, json.Error || C.ERR_EMPTY);
  }
};
var _default = FmpApi;
exports["default"] = _default;
//# sourceMappingURL=FmpApi.js.map