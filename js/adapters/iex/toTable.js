"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var crRows = _toTableFn["default"].crRows;
var ID_PROP_NAME = 'symbol';
var HEADERS = [{
  name: 'Symbol',
  pn: 'symbol',
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Change %',
  pn: 'changePercent',
  toN: [2],
  isR: true
}, {
  name: 'YTD %',
  pn: 'ytdChange',
  toN: [2],
  isR: true
}, {
  name: 'Price',
  pn: 'latestPrice',
  toN: [2]
}, {
  isHide: true,
  name: 'peRatio',
  pn: 'peRatio',
  toN: [2],
  isR: true
}, {
  isHide: true,
  name: 'Company',
  pn: 'companyName'
}, {
  isHide: true,
  name: 'Exchange',
  pn: 'primaryExchange'
}];

var _crTitle = function _crTitle(title, json) {
  var _suffix = '';
  var _item = json[0];

  if (_item) {
    var _t = _item.latestTime || '',
        _s = _item.latestSource || '';

    _suffix = (_t + ' ' + _s).trim();
  }

  return title + " " + _suffix;
};

var toTable = {
  crKey: function crKey(option) {
    option.key = option.value;
    return option.key;
  },
  toConfig: function toConfig(json, option) {
    var title = option.title,
        key = option.key;
    return {
      config: {
        id: key,
        title: _crTitle(title, json),
        headers: HEADERS,
        rows: crRows(HEADERS, json, ID_PROP_NAME),
        dataSource: 'IEX Cloud',
        zhCompType: 'TABLE',
        zhConfig: {
          id: key,
          key: key
        }
      }
    };
  }
};
var _default = toTable;
exports["default"] = _default;
//# sourceMappingURL=toTable.js.map