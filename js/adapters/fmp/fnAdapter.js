"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    getFromDate = _AdapterFn["default"].getFromDate,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    valueMoving = _AdapterFn["default"].valueMoving,
    crItemLink = _AdapterFn["default"].crItemLink,
    compareByDate = _AdapterFn["default"].compareByDate,
    crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf;

var _isHistorical = function _isHistorical(dfPn) {
  return dfPn === 'historical';
};

var _crHistoricalItemConf = function _crHistoricalItemConf(data, option) {
  var itemCaption = option.itemCaption,
      dataSource = option.dataSource,
      items = option.items,
      dfT = option.dfT,
      dfPn = option.dfPn;
  return (0, _extends2["default"])({}, crItemConf(option), {}, crValueConf(data), {
    _itemKey: 'FMP/' + itemCaption,
    dataSource: dataSource,
    items: items,
    dfT: dfT,
    dfPn: dfPn
  });
};

var _crZhConfig = function _crZhConfig(data, option) {
  var _itemKey = option._itemKey,
      itemCaption = option.itemCaption,
      dataSource = option.dataSource,
      dfPn = option.dfPn,
      itemConf = _isHistorical(dfPn) ? _crHistoricalItemConf(data, option) : void 0;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    itemConf: itemConf,
    isWithoutAdd: !itemConf,
    dataSource: dataSource
  };
};

var _crName = function _crName(items) {
  return items.map(function (item) {
    return item.caption;
  }).join(': ');
};

var _crDescription = crItemLink.bind(null, 'Financial Modeling Prep');

var _crInfo = function _crInfo(_ref) {
  var items = _ref.items,
      _itemUrl = _ref._itemUrl;
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
  getFromDate: getFromDate,
  getCaption: _fGetByPropName('caption'),
  getValue: _fGetByPropName('value'),
  crData: function crData(metrics, propName) {
    return metrics.map(function (item) {
      return [ymdToUTC(item.date), parseFloat(item[propName])];
    }).reverse().sort(compareByDate);
  },
  crCaption: function crCaption(_ref2) {
    var items = _ref2.items;
    return {
      title: fnAdapter.getCaption(items[0]),
      subtitle: items[1] ? fnAdapter.getCaption(items[1]) + ': ' + fnAdapter.getCaption(items[2]) : ''
    };
  },
  crSeriaType: function crSeriaType(seriaType) {
    return seriaType === 'COLUMN' ? 'column' : 'spline';
  },
  crConfigOption: function crConfigOption(_ref3) {
    var json = _ref3.json,
        option = _ref3.option,
        data = _ref3.data;
    return {
      zhConfig: _crZhConfig(data, option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map