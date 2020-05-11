"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var numberFormat = _AdapterFn["default"].numberFormat;
var crRows = _toTableFn["default"].crRows;
var crPageConfig = _fnAdapter["default"].crPageConfig;
var HEADERS = [{
  name: 'Rank',
  pn: 'market_cap_rank',
  isToN: true,
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Name',
  pn: 'name'
}, {
  isHide: true,
  name: 'Coin',
  pn: 'symbol',
  style: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
}, {
  name: '1h %',
  pn: 'price_change_percentage_1h_in_currency',
  isToN: true,
  isToFixed: true,
  toFixedBy: 3,
  isR: true
}, {
  name: '24h %',
  pn: 'price_change_percentage_24h',
  isToN: true,
  isToFixed: true,
  toFixedBy: 3,
  isR: true
}, {
  name: '7d %',
  pn: 'price_change_percentage_7d_in_currency',
  isToN: true,
  isToFixed: true,
  toFixedBy: 3,
  isR: true
}, {
  name: 'Price',
  pn: 'current_price',
  isToN: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: 'MarketCap',
  pn: 'market_cap',
  isToN: true,
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  isHide: true,
  name: 'Updated UTC',
  pn: 'last_updated'
}];

var _toDate = function _toDate(rowDate) {
  var _rowDate = rowDate || '';

  return _rowDate.replace('T', ' ').split('.')[0];
};

var _transformDate = function _transformDate(json) {
  return json.map(function (item) {
    item.last_updated = _toDate(item.last_updated);
    return item;
  });
};

var _crDataSource = function _crDataSource(rows) {
  return "CoinGecko " + rows[0].last_updated + " UTC";
};

var toList = {
  crKey: function crKey(option) {
    option.key = crPageConfig(option).join('_');
    return option.key;
  },
  toConfig: function toConfig(json, option) {
    var _id = option.key,
        _json = _transformDate(json),
        _rows = crRows(HEADERS, _json),
        _dataSource = _crDataSource(_rows),
        config = {
      id: _id,
      title: option.title,
      headers: HEADERS,
      tableFn: {
        numberFormat: numberFormat //valueToHref

      },
      rows: _rows,
      dataSource: _dataSource,
      zhCompType: 'TABLE',
      zhConfig: {
        id: _id,
        key: _id
      }
    };

    return {
      config: config
    };
  }
};
var _default = toList;
exports["default"] = _default;
//# sourceMappingURL=toList.js.map