'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var _fnCreateQuandlKey = function _fnCreateQuandlKey(option) {
  return option.loadId === _Type.LoadType.QCT && !option.isLoadMeta ? option.seriaType === _Type.ChartType.AREA ? option.value + '_' + _Type.ChartType.AREA + '_' + option.dataColumn : option.value + '_' + option.seriaType : option.value;
};

var _fnCreateEuroStatKey = function _fnCreateEuroStatKey(option) {
  return option.geo + '_' + option.group + '_' + option.metric;
};

var LogicUtils = {
  createKeyForConfig: function createKeyForConfig(option) {
    var loadId = option.loadId;

    switch (loadId) {
      case _Type.LoadType.Q:case _Type.LoadType.QCT:
        return _fnCreateQuandlKey(option);
      case _Type.LoadType.EU_STAT:
        return _fnCreateEuroStatKey(option);
      default:
        return 'key';
    }
  }
};

exports.default = LogicUtils;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LogicUtils.js.map