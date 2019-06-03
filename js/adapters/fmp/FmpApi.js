'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCaption = _fnAdapter2.default.getCaption,
    getValue = _fnAdapter2.default.getValue,
    crError = _fnAdapter2.default.crError;


var C = {
  URI: 'https://financialmodelingprep.com/api/v3',
  ERR_EMPTY: 'Response is empty'
};

var _configOption = function _configOption(option) {
  var dfT = option.dfT,
      _option$items = option.items,
      items = _option$items === undefined ? [] : _option$items,
      dataSource = option.dataSource,
      _option$conf = option.conf,
      conf = _option$conf === undefined ? {} : _option$conf,
      _conf$chartContainerC = conf.chartContainerCaption,
      chartContainerCaption = _conf$chartContainerC === undefined ? '' : _conf$chartContainerC,
      _items = (0, _slicedToArray3.default)(items, 3),
      it1 = _items[0],
      it2 = _items[1],
      it3 = _items[2],
      _symbol = getValue(it1),
      _period = getValue(it3),
      _propName = getCaption(it2),
      _query = _period ? '?period=' + _period : '',
      _itemUrl = C.URI + '/' + dfT + '/' + _symbol + _query;

  Object.assign(option, {
    _itemUrl: _itemUrl,
    _symbol: _symbol, _period: _period,
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

exports.default = FmpApi;
//# sourceMappingURL=FmpApi.js.map