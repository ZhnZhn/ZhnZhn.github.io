'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _apiFn = require('./apiFn');

var _apiFn2 = _interopRequireDefault(_apiFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCategory = _apiFn2.default.isCategory,
    crUrl = _apiFn2.default.crUrl;


var _crMapSlice = function _crMapSlice(items) {
  var mapSlice = {};
  items.forEach(function (item) {
    mapSlice[item.id] = item.value;
  });
  return mapSlice;
};

var _crItems = function _crItems(_ref) {
  var seriaType = _ref.seriaType,
      items = _ref.items,
      time = _ref.time;
  return isCategory(seriaType) ? [{ id: time, value: time }].concat((0, _toConsumableArray3.default)(items.slice(1))) : items;
};

var _crQuery = function _crQuery(items) {
  return items.map(function (item) {
    return item.id + '=' + item.value;
  }).join('&');
};

var _updateOptionsIf = function _updateOptionsIf(seriaType, items, options) {
  if (isCategory(seriaType)) {
    options.zhMapSlice = _crMapSlice(items);
  }
};

var crUrlN = function crUrlN(options) {
  var seriaType = options.seriaType,
      dfTable = options.dfTable,
      _items = _crItems(options),
      _q = _crQuery(_items);

  _updateOptionsIf(seriaType, _items, options);

  return crUrl(dfTable, _q);
};

exports.default = crUrlN;
//# sourceMappingURL=crUrlN.js.map