"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    joinBy = _AdapterFn["default"].joinBy;

var _crZhConfig = function _crZhConfig(_ref) {
  var itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource,
      dfTitle = _ref.dfTitle,
      value = _ref.value,
      linkItem = _ref.linkItem;
  return {
    id: value,
    key: value,
    item: (0, _extends2["default"])({}, linkItem),
    linkFn: 'DF',
    itemCaption: itemCaption,
    dataSource: joinBy(": ", dataSource, dfTitle)
  };
};

var _crInfo = function _crInfo(_ref2) {
  var itemCaption = _ref2.itemCaption;
  return {
    name: itemCaption
  };
};

var fnAdapter = {
  crTitle: function crTitle(_ref3) {
    var dfTitle = _ref3.dfTitle,
        _ref3$item = _ref3.item,
        item = _ref3$item === void 0 ? {} : _ref3$item,
        subtitle = _ref3.subtitle;
    return dfTitle ? joinBy(', ', dfTitle, item.t) : subtitle;
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
  crConfigOption: function crConfigOption(option) {
    return {
      zhConfig: _crZhConfig(option),
      info: _crInfo(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map