"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var roundBy = _AdapterFn["default"].roundBy;
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

var _getCellValue = function _getCellValue(r, h) {
  var pn = h.pn,
      isToN = h.isToN,
      isToFixed = h.isToFixed;
  return isToN ? isToFixed ? roundBy(r[pn], 2) : parseFloat(r[pn]) : r[pn];
};

var _toRows = function _toRows(headers, rows) {
  if (rows === void 0) {
    rows = [];
  }

  var _rows = rows.map(function (r) {
    headers.forEach(function (h) {
      r[h.pn] = _getCellValue(r, h);
    });
    return r;
  });

  return _rows;
};

var toTable = {
  crKey: function crKey(option) {
    option.key = option.value;
    return option.value;
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
      rows: _toRows(HEADERS, json),
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