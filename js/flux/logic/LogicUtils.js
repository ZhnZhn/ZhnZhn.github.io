'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var _fnCreateQuandlKey = function _fnCreateQuandlKey(option) {
  var loadId = option.loadId,
      isLoadMeta = option.isLoadMeta,
      value = option.value,
      dataColumn = option.dataColumn,
      seriaType = option.seriaType,
      viewKey = option.viewKey;

  return loadId === _Type.LoadType.QCT && !isLoadMeta ? seriaType === _Type.ChartType.AREA ? value + '_' + _Type.ChartType.AREA + '_' + dataColumn : value + '_' + seriaType : viewKey ? viewKey : value;
};

var _fnCreateEuroStatKey = function _fnCreateEuroStatKey(option) {
  var _option$geo = option.geo,
      geo = _option$geo === undefined ? '' : _option$geo,
      _option$group = option.group,
      group = _option$group === undefined ? '' : _option$group,
      _option$metric = option.metric,
      metric = _option$metric === undefined ? '' : _option$metric,
      _option$seriaType = option.seriaType,
      seriaType = _option$seriaType === undefined ? 'AREA' : _option$seriaType,
      _option$time = option.time,
      time = _option$time === undefined ? '' : _option$time,
      _metric = metric.replace('?', '_');

  return geo + '_' + group + '_' + _metric + '_' + seriaType + '_' + time;
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