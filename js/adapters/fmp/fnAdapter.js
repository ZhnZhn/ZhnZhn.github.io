'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crError = _AdapterFn2.default.crError,
    ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving,
    crItemLink = _AdapterFn2.default.crItemLink;


var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      _symbol = _ref._symbol,
      _propName = _ref._propName,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey, key: _itemKey,
    itemCaption: _symbol + '_' + _propName,
    isWithoutAdd: true,
    dataSource: dataSource
  };
};

var _crName = function _crName(items) {
  return items.map(function (item) {
    return item.caption;
  }).join(': ');
};
var _crDescription = crItemLink.bind(null, 'Financial Modeling Prep');

var _crInfo = function _crInfo(_ref2) {
  var items = _ref2.items,
      _itemUrl = _ref2._itemUrl;
  return {
    name: _crName(items),
    description: _crDescription(_itemUrl)
  };
};

var _fGetByPropName = function _fGetByPropName(propName) {
  return function (obj) {
    return obj && obj[propName] || '';
  };
};

var fnAdapter = {
  crError: crError,
  getCaption: _fGetByPropName('caption'),
  getValue: _fGetByPropName('value'),

  crData: function crData(metrics, propName) {
    return metrics.map(function (item) {
      return {
        x: ymdToUTC(item.date),
        y: parseFloat(item[propName])
      };
    }).reverse();
  },

  crCaption: function crCaption(_ref3) {
    var items = _ref3.items;
    return {
      title: fnAdapter.getCaption(items[0]),
      subtitle: fnAdapter.getCaption(items[1]) + ': ' + fnAdapter.getCaption(items[2])
    };
  },
  crSeriaType: function crSeriaType(seriaType) {
    return seriaType === 'COLUMN' ? 'column' : 'spline';
  },

  crConfigOption: function crConfigOption(_ref4) {
    var json = _ref4.json,
        option = _ref4.option,
        data = _ref4.data;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map