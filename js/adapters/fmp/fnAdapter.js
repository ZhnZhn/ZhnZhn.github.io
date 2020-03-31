"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    valueMoving = _AdapterFn["default"].valueMoving,
    crItemLink = _AdapterFn["default"].crItemLink,
    compareByDate = _AdapterFn["default"].compareByDate;

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
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
      return [ymdToUTC(item.date), parseFloat(item[propName])];
    }).reverse().sort(compareByDate);
  },
  crCaption: function crCaption(_ref3) {
    var items = _ref3.items;
    return {
      title: fnAdapter.getCaption(items[0]),
      subtitle: items[1] ? fnAdapter.getCaption(items[1]) + ': ' + fnAdapter.getCaption(items[2]) : ''
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
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map