"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var valueMoving = _AdapterFn["default"].valueMoving,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    appendWithColon = _AdapterFn["default"].appendWithColon;

var _crZhConfig = function _crZhConfig(option) {
  var title = option.title,
      dataSource = option.dataSource,
      dfTitle = option.dfTitle,
      value = option.value,
      linkItem = option.linkItem;
  return {
    id: value,
    key: value,
    item: (0, _extends2["default"])({}, linkItem),
    linkFn: 'DF',
    itemCaption: title,
    isWithoutAdd: true,
    dataSource: appendWithColon(dataSource, dfTitle)
  };
};

var _crInfo = function _crInfo(_ref) {
  var title = _ref.title;
  return {
    name: title
  };
};

var fnAdapter = {
  crTitle: function crTitle(_ref2) {
    var dfTitle = _ref2.dfTitle,
        item = _ref2.item,
        subtitle = _ref2.subtitle;
    return dfTitle ? item.t ? dfTitle + ', ' + item.t : dfTitle : subtitle;
  },
  crData: function crData(json) {
    var data = json.Results.series[0].data,
        _data = [];
    data.forEach(function (p) {
      var year = p.year,
          _p$period = p.period,
          period = _p$period === void 0 ? '' : _p$period,
          value = p.value,
          _m = parseInt(('' + period).replace('M', ''), 10);

      if (typeof _m === 'number' && _m > 0 && _m < 13) {
        _data.push({
          x: ymdToUTC(year + "-" + _m),
          y: parseFloat(value)
        });
      }
    });
    return _data.reverse();
  },
  crConfigOption: function crConfigOption(_ref3) {
    var json = _ref3.json,
        option = _ref3.option,
        data = _ref3.data;
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