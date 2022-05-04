"use strict";

exports.__esModule = true;
exports.default = void 0;

var _toTableFn = require("../toTableFn");

const ID_PROP_NAME = 'symbol';
const HEADERS = [{
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

const _crTitle = (title, json) => {
  let _suffix = '';
  const _item = json[0];

  if (_item) {
    const _t = _item.latestTime || '',
          _s = _item.latestSource || '';

    _suffix = (_t + ' ' + _s).trim();
  }

  return title + " " + _suffix;
};

const toTable = {
  crKey(option) {
    option.key = option.value;
    return option.key;
  },

  toConfig(json, option) {
    const {
      title,
      key
    } = option;
    return {
      config: (0, _toTableFn.crTableConfig)({
        id: key,
        title: _crTitle(title, json),
        headers: HEADERS,
        rows: (0, _toTableFn.crTableRows)(HEADERS, json, ID_PROP_NAME),
        dataSource: 'IEX Cloud'
      })
    };
  }

};
var _default = toTable;
exports.default = _default;
//# sourceMappingURL=toTable.js.map