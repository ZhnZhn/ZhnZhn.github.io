'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var LogicUtils = {
  createKeyForConfig: function createKeyForConfig(option) {
    var key = option.loadId === _Type.LoadType.QCT && !option.isLoadMeta ? option.seriaType === _Type.ChartType.AREA ? option.value + '_' + _Type.ChartType.AREA + '_' + option.dataColumn : option.value + '_' + option.seriaType : option.value;
    return key;
  }
};

exports.default = LogicUtils;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LogicUtils.js.map