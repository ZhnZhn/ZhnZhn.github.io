'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var _LoadConfig = require('./LoadConfig');

var _LoadConfig2 = _interopRequireDefault(_LoadConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _crKey = function _crKey(option) {
  var loadId = option.loadId,
      value = option.value,
      loadConfig = _LoadConfig2.default[loadId] || {},
      crKey = loadConfig.crKey;

  if (typeof crKey === 'function') {
    return crKey(option);
  }
  return value || 'key';
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
        return _crKey(option);
    }
  }
};

exports.default = LogicUtils;
//# sourceMappingURL=LogicUtils.js.map