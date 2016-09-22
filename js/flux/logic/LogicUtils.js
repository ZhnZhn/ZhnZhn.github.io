'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var _fnCreateQuandlKey = function _fnCreateQuandlKey(option) {
  return option.loadId === _Type.LoadType.QCT && !option.isLoadMeta ? option.seriaType === _Type.ChartType.AREA ? option.value + '_' + _Type.ChartType.AREA + '_' + option.dataColumn : option.value + '_' + option.seriaType : option.value;
};

var _fnCreateEuroStatKey = function _fnCreateEuroStatKey(option) {
  var _option$geo = option.geo;
  var geo = _option$geo === undefined ? '' : _option$geo;
  var _option$group = option.group;
  var group = _option$group === undefined ? '' : _option$group;
  var _option$metric = option.metric;
  var metric = _option$metric === undefined ? '' : _option$metric;
  var _metric = metric.replace('?', '_');
  return geo + '_' + group + '_' + _metric;
};

var LogicUtils = {
  createKeyForConfig: function createKeyForConfig(option) {
    var loadId = option.loadId;

    switch (loadId) {
      case _Type.LoadType.Q:case _Type.LoadType.QCT:
        return _fnCreateQuandlKey(option);
      case _Type.LoadType.EU_STAT:
        return _fnCreateEuroStatKey(option);
      case _Type.LoadType.WL:
        return option.id;
      default:
        return 'key';
    }
  }
};

exports.default = LogicUtils;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LogicUtils.js.map