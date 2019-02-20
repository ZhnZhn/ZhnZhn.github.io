'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _apiFn = require('./apiFn');

var _apiFn2 = _interopRequireDefault(_apiFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_TAIL = _apiFn2.default.DF_TAIL,
    isCategory = _apiFn2.default.isCategory,
    crUrl = _apiFn2.default.crUrl;


var _isStrNotEmpty = function _isStrNotEmpty(str) {
  return typeof str === 'string' && str;
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
    mapSlice[item.id] = item.value;
  });
  if (_isStrNotEmpty(dfTail)) {
    _addDfTailTo(mapSlice, dfTail);
  }
  return mapSlice;
};

var _crItems = function _crItems(_ref2) {
  var seriaType = _ref2.seriaType,
      items = _ref2.items,
      time = _ref2.time;
  return isCategory(seriaType) ? [].concat((0, _toConsumableArray3.default)(items.filter(Boolean)), [{ id: 'time', value: time }]) : items;
};

var _crQuery = function _crQuery(items) {
  return items.map(function (item) {
    return item.id + '=' + item.value;
  }).join('&');
};

var _updateOptionsIf = function _updateOptionsIf(seriaType, items, options) {
  if (isCategory(seriaType)) {
    options.zhMapSlice = _crMapSlice(items, options);
  }
};

var crUrlN = function crUrlN(options) {
  var seriaType = options.seriaType,
      dfTable = options.dfTable,
      _items = _crItems(options),
      _q = _crQuery(_items);

  _updateOptionsIf(seriaType, _items, options);

  return isCategory(seriaType) ? crUrl(dfTable, _q, '&' + DF_TAIL) : crUrl(dfTable, _q);
};

exports.default = crUrlN;
//# sourceMappingURL=crUrlN.js.map