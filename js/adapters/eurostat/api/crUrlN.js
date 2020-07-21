"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _apiFn = _interopRequireDefault(require("./apiFn"));

var DF_TAIL = _apiFn["default"].DF_TAIL,
    isCategory = _apiFn["default"].isCategory,
    isMap = _apiFn["default"].isMap,
    crUrl = _apiFn["default"].crUrl,
    getValue = _apiFn["default"].getValue;

var _isNotEmptyStr = function _isNotEmptyStr(str) {
  return str && typeof str === 'string';
};

var _addDfTailTo = function _addDfTailTo(mapSlice, dfTail) {
  dfTail.split('&').forEach(function (param) {
    var _arr = param.split('=');

    if (_arr[0] && _arr[1]) {
      mapSlice[_arr[0]] = _arr[1];
    }
  });
};

var _crMapSlice = function _crMapSlice(items, _ref) {
  var dfTail = _ref.dfTail;
  var mapSlice = {};
  items.forEach(function (item) {
    mapSlice[item.id] = getValue(item);
  });

  if (_isNotEmptyStr(dfTail)) {
    _addDfTailTo(mapSlice, dfTail);
  }

  return mapSlice;
};

var _crItems = function _crItems(_ref2) {
  var seriaType = _ref2.seriaType,
      items = _ref2.items,
      time = _ref2.time;
  return isCategory(seriaType) ? isMap(seriaType) ? items.filter(Boolean) : items.filter(Boolean).concat([{
    id: 'time',
    value: time
  }]) : items;
};

var _crQuery = function _crQuery(items, dfTail) {
  var _q = items.map(function (item) {
    return item.id + "=" + getValue(item);
  }).join('&');

  return dfTail ? _q + "&" + dfTail : _q;
};

var _updateOptionsIf = function _updateOptionsIf(seriaType, items, options) {
  if (isCategory(seriaType)) {
    options.zhMapSlice = _crMapSlice(items, options);
  }
};

var crUrlN = function crUrlN(options) {
  var seriaType = options.seriaType,
      dfTable = options.dfTable,
      dfTail = options.dfTail,
      _items = _crItems(options),
      _q = _crQuery(_items, dfTail);

  _updateOptionsIf(seriaType, _items, options);

  return isCategory(seriaType) ? crUrl(dfTable, _q, "&" + DF_TAIL) : crUrl(dfTable, _q);
};

var _default = crUrlN;
exports["default"] = _default;
//# sourceMappingURL=crUrlN.js.map