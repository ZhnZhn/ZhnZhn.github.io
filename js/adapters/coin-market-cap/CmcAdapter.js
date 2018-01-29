'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberFormat = _AdapterFn2.default.numberFormat;


var HEADERS = [{
  name: 'Rank',
  pn: 'rank',
  isToN: true,
  style: { textAlign: 'center' }
}, {
  name: 'Coin',
  pn: 'symbol',
  isHref: true
}, {
  name: 'MarketCap',
  pn: 'market_cap_usd',
  isToN: true,
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: '1h %',
  pn: 'percent_change_1h',
  isToN: true,
  isR: true
}, {
  name: '24h %',
  pn: 'percent_change_24h',
  isToN: true,
  isR: true
}, {
  name: '24h Vol.',
  pn: '24h_volume_usd',
  isToN: true,
  isR: true,
  isF: true
}, {
  name: '7d %',
  pn: 'percent_change_7d',
  isToN: true,
  isR: true
}];

var _toRows = function _toRows() {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _rows = [].concat((0, _toConsumableArray3.default)(rows)).map(function (r) {
    headers.forEach(function (h) {
      var pn = h.pn,
          isToN = h.isToN;

      r[pn] = isToN ? parseFloat(r[pn]) : r[pn];
    });
    return r;
  });
  return _rows;
};

var _crTitle = function _crTitle(_ref) {
  var one = _ref.one,
      two = _ref.two;

  var _two = parseFloat(two) - 1,
      _one = parseFloat(one) + 1;
  return _one + ' - ' + (_one + _two) + ': Values in USD';
};

var BASE_URL = 'https://coinmarketcap.com/currencies/';
var valueToHref = function valueToHref(id) {
  return '' + BASE_URL + id;
};

var CmcAdapter = {
  toConfig: function toConfig(json, option) {
    var one = option.one,
        two = option.two,
        _id = one + '_' + two,
        config = {
      id: _id,
      title: _crTitle(option),
      headers: HEADERS,
      tableFn: {
        numberFormat: numberFormat,
        valueToHref: valueToHref
      },
      rows: _toRows(HEADERS, json),
      zhCompType: 'COIN_CAP',
      zhConfig: {
        id: _id, key: _id
      }
    };

    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    throw new Error('ZH_1000');
  }
};

exports.default = CmcAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\coin-market-cap\CmcAdapter.js.map