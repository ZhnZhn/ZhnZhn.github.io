"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _itemFn = require("../../../utils/itemFn");
var _EuroStatFn = require("../EuroStatFn");
var _apiFn = require("./apiFn");
const _addDfTailTo = (mapSlice, dfTail) => {
  dfTail.split('&').forEach(param => {
    const _arr = param.split('=');
    if (_arr[0] && _arr[1]) {
      mapSlice[_arr[0]] = _arr[1];
    }
  });
};
const _crMapSlice = (items, _ref) => {
  let {
    dfTail
  } = _ref;
  const mapSlice = {};
  items.forEach(item => {
    mapSlice[item.id] = (0, _itemFn.getValue)(item);
  });
  if ((0, _isTypeFn.isStrNotBlank)(dfTail)) {
    _addDfTailTo(mapSlice, dfTail);
  }
  return mapSlice;
};
const _crItemsFilter = (dfC, dfCmx) => dfC ? item => Boolean(item) && item.id !== dfC : dfCmx ? item => item : item => Boolean(item) && (0, _EuroStatFn.isNotGeoOrReporter)(item.id);
const _crItems = _ref2 => {
  let {
    seriaType,
    dfC,
    dfCmx,
    items,
    time
  } = _ref2;
  if ((0, _apiFn.isCategory)(seriaType)) {
    const _items = items.filter(_crItemsFilter(dfC, dfCmx));
    return (0, _apiFn.isMap)(seriaType) ? _items : _items.concat([{
      id: 'time',
      value: time
    }]);
  }
  return items;
};
const _crQuery = (items, dfTail) => {
  const _q = items.map(item => `${item.id}=${(0, _itemFn.getValue)(item)}`).join('&');
  return dfTail ? `${_q}&${dfTail}` : _q;
};
const _updateOptionsIf = (seriaType, items, options) => {
  if ((0, _apiFn.isCategory)(seriaType)) {
    options.zhMapSlice = _crMapSlice(items, options);
  }
};
const crUrlN = options => {
  const {
      seriaType,
      dfCmx,
      dfTable,
      dfId,
      dfTail
    } = options,
    _dfTable = dfTable || dfId,
    _items = _crItems(options),
    _q = _crQuery(_items, dfTail);
  _updateOptionsIf(seriaType, _items, options);
  return (0, _apiFn.crUrl)(!!dfCmx, _dfTable, _q, (0, _apiFn.isCategory)(seriaType) ? _apiFn.DF_TAIL : void 0);
};
var _default = exports.default = crUrlN;
//# sourceMappingURL=crUrlN.js.map