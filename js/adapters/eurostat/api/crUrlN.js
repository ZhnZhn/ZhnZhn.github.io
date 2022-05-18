"use strict";

exports.__esModule = true;
exports.default = void 0;

var _apiFn = require("./apiFn");

const _isNotEmptyStr = str => str && typeof str === 'string';

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
    mapSlice[item.id] = (0, _apiFn.getValue)(item);
  });

  if (_isNotEmptyStr(dfTail)) {
    _addDfTailTo(mapSlice, dfTail);
  }

  return mapSlice;
};

const _notEmptyOrGeo = item => Boolean(item) && item.id !== 'geo';

const _crItems = _ref2 => {
  let {
    seriaType,
    items,
    time
  } = _ref2;

  if ((0, _apiFn.isCategory)(seriaType)) {
    const _items = items.filter(_notEmptyOrGeo);

    return (0, _apiFn.isMap)(seriaType) ? _items : _items.concat([{
      id: 'time',
      value: time
    }]);
  }

  return items;
};

const _crQuery = (items, dfTail) => {
  const _q = items.map(item => item.id + "=" + (0, _apiFn.getValue)(item)).join('&');

  return dfTail ? _q + "&" + dfTail : _q;
};

const _updateOptionsIf = (seriaType, items, options) => {
  if ((0, _apiFn.isCategory)(seriaType)) {
    options.zhMapSlice = _crMapSlice(items, options);
  }
};

const crUrlN = options => {
  const {
    seriaType,
    dfTable,
    dfId,
    dfTail
  } = options,
        _dfTable = dfTable || dfId,
        _items = _crItems(options),
        _q = _crQuery(_items, dfTail);

  _updateOptionsIf(seriaType, _items, options);

  return (0, _apiFn.isCategory)(seriaType) ? (0, _apiFn.crUrl)(_dfTable, _q, "&" + _apiFn.DF_TAIL) : (0, _apiFn.crUrl)(_dfTable, _q);
};

var _default = crUrlN;
exports.default = _default;
//# sourceMappingURL=crUrlN.js.map