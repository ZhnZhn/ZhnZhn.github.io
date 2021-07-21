"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    crZhConfig = _AdapterFn["default"].crZhConfig,
    getFromDate = _AdapterFn["default"].getFromDate,
    getCaption = _AdapterFn["default"].getCaption,
    getValue = _AdapterFn["default"].getValue,
    joinBy = _AdapterFn["default"].joinBy,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    compareByDate = _AdapterFn["default"].compareByDate,
    crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf;
var _isNaN = Number.isNaN;

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

var _crHistZhConfig = function _crHistZhConfig(data, option) {
  return (0, _extends2["default"])({}, crZhConfig(option), {
    itemConf: _crHistoricalItemConf(data, option)
  });
};

var _crName = function _crName(items) {
  return items.map(getCaption).join(': ');
};

var _crInfo = function _crInfo(_ref) {
  var items = _ref.items,
      _itemUrl = _ref._itemUrl;
  return {
    name: _crName(items)
  };
};

var fnAdapter = {
  crError: crError,
  getFromDate: getFromDate,
  getCaption: getCaption,
  getValue: getValue,
  crData: function crData(json, option) {
    var dfPn = option.dfPn,
        _propName = option._propName,
        _metrics = dfPn ? json[dfPn] : json,
        _data = [];

    _metrics.forEach(function (item) {
      var _v = parseFloat(item[_propName]);

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
  addConfOption: function addConfOption(option) {
    return {
      info: _crInfo(option)
    };
  },
  crHistOption: function crHistOption(_ref3) {
    var option = _ref3.option,
        data = _ref3.data;
    return {
      info: _crInfo(option),
      zhConfig: _crHistZhConfig(data, option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map