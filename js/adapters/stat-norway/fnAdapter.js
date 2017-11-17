'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crDescr = function _crDescr(updated, option) {
  var _date = updated.replace('T', ' ').replace('Z', ''),
      _option$dfId = option.dfId,
      dfId = _option$dfId === undefined ? '' : _option$dfId;


  return 'TableId: ' + dfId + ' <BR/> Statisctics Norway: ' + _date;
};

var _crItemCaption = function _crItemCaption(option) {
  var items = option.items,
      _option$dfId2 = option.dfId,
      dfId = _option$dfId2 === undefined ? 'id' : _option$dfId2,
      caption = items[0] ? items[0].caption : 'All Items';

  return dfId + '_' + caption;
};

var fnAdapter = {
  crId: function crId() {
    return _AdapterFn2.default.crId();
  },

  crTid: function crTid(time, ds) {
    if (time) {
      return time;
    }
    var tidIds = ds.Dimension("Tid").id;
    return tidIds[tidIds.length - 1];
  },

  crInfo: function crInfo(_ref, option) {
    var _ref$label = _ref.label,
        label = _ref$label === undefined ? '' : _ref$label,
        _ref$updated = _ref.updated,
        updated = _ref$updated === undefined ? '' : _ref$updated;
    return {
      name: label,
      description: _crDescr(updated, option)
    };
  },

  crZhConfig: function crZhConfig(option) {
    var dataSource = option.dataSource,
        id = fnAdapter.crId(),
        itemCaption = _crItemCaption(option);

    return {
      id: id, key: id,
      itemCaption: itemCaption,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource: dataSource
    };
  },

  crValueMoving: function crValueMoving(d) {
    if (Array.isArray(d)) {
      return _AdapterFn2.default.valueMoving(d);
    }
    return { date: d, direction: 'empty' };
  },

  crChartOption: function crChartOption(ds, data, option) {
    return {
      info: fnAdapter.crInfo(ds, option),
      valueMoving: fnAdapter.crValueMoving(data),
      zhConfig: fnAdapter.crZhConfig(option)
    };
  },

  numberFormat: function numberFormat(value) {
    var arrSplit = (value + '').split('.'),
        decimal = arrSplit[1] ? arrSplit[1].length : 0;
    return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
  }

};

exports.default = fnAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\fnAdapter.js.map