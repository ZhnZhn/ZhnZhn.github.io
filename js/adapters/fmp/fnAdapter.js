"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    getFromDate = _AdapterFn["default"].getFromDate,
    getCaption = _AdapterFn["default"].getCaption,
    getValue = _AdapterFn["default"].getValue,
    joinBy = _AdapterFn["default"].joinBy,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    valueMoving = _AdapterFn["default"].valueMoving,
    crItemLink = _AdapterFn["default"].crItemLink,
    compareByDate = _AdapterFn["default"].compareByDate,
    crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf,
    stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend;

var _isNaN = Number.isNaN || isNaN;

var _isHistorical = function _isHistorical(dfPn) {
  return dfPn === 'historical';
};

var _crHistoricalItemConf = function _crHistoricalItemConf(data, option) {
  var itemCaption = option.itemCaption,
      dataSource = option.dataSource,
      items = option.items,
      dfT = option.dfT,
      dfPn = option.dfPn;
  return (0, _extends2["default"])({}, crItemConf(option), crValueConf(data), {
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
      _isH = _isHistorical(dfPn),
      itemConf = _isH ? _crHistoricalItemConf(data, option) : void 0,
      legend = _isH ? stockSeriesLegend() : void 0;

  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    itemConf: itemConf,
    dataSource: dataSource,
    legend: legend
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

var fnAdapter = {
  crError: crError,
  getFromDate: getFromDate,
  getCaption: getCaption,
  getValue: getValue,
  crData: function crData(metrics, propName) {
    var _data = [];
    metrics.forEach(function (item) {
      var _v = parseFloat(item[propName]);

      if (!_isNaN(_v)) {
        _data.push([ymdToUTC(item.date), _v]);
      }
    });
    return _data.reverse().sort(compareByDate);
  },
  crCaption: function crCaption(_ref2) {
    var items = _ref2.items;
    return {
      title: getCaption(items[0]),
      subtitle: joinBy(': ', getCaption(items[1]), getCaption(items[2]))
    };
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