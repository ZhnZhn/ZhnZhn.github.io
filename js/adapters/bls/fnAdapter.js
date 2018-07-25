'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var valueMoving = _AdapterFn2.default.valueMoving,
    ymdToUTC = _AdapterFn2.default.ymdToUTC,
    crZhFn = _AdapterFn2.default.crZhFn,
    appendWithColon = _AdapterFn2.default.appendWithColon;


var _crZhConfig = function _crZhConfig(option) {
  var title = option.title,
      dataSource = option.dataSource,
      dfTitle = option.dfTitle,
      value = option.value,
      linkFn = option.linkFn;

  return {
    id: value, key: value, item: value,
    itemCaption: title,
    isWithoutAdd: true,
    isWithLegend: false,
    dataSource: appendWithColon(dataSource, dfTitle),
    linkFn: linkFn
  };
};

var _crInfo = function _crInfo(_ref) {
  var title = _ref.title;
  return {
    name: title
  };
};

var fnAdapter = {
  crData: function crData(json) {
    var data = json.Results.series[0].data,
        _data = [];
    data.forEach(function (p) {
      var year = p.year,
          _p$period = p.period,
          period = _p$period === undefined ? '' : _p$period,
          value = p.value,
          _m = parseInt(('' + period).replace('M', ''), 10);

      if (typeof _m === 'number' && _m > 0 && _m < 13) {
        _data.push({
          x: ymdToUTC(year + '-' + _m),
          y: parseFloat(value)
        });
      }
    });
    return _data.reverse();
  },

  crConfigOption: function crConfigOption(_ref2) {
    var json = _ref2.json,
        option = _ref2.option,
        data = _ref2.data;
    return (0, _extends3.default)({
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    }, crZhFn());
  }

};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map