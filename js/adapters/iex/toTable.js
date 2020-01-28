"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var crRows = _toTableFn["default"].crRows;
var HEADERS = [{
  name: 'Symbol',
  pn: 'symbol',
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Change %',
  pn: 'changePercent',
  isToN: true,
  isToFixed: true,
  isR: true
}, {
  name: 'YTD %',
  pn: 'ytdChange',
  isToN: true,
  isToFixed: true,
  isR: true
}, {
  name: 'Price',
  pn: 'latestPrice',
  isToN: true,
  isToFixed: true
}
/*,{
 name: 'Company',
 pn: 'companyName',
}*/
];

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
      id: key,
      title: _crTitle(title, json),
      headers: HEADERS,

      /*
      tableFn: {
        numberFormat,
        valueToHref
      },
      */
      rows: crRows(HEADERS, json),
      zhCompType: 'TABLE',
      zhConfig: {
        id: key,
        key: key
      }
    };
  }
};
var _default = toTable;
exports["default"] = _default;
//# sourceMappingURL=toTable.js.map