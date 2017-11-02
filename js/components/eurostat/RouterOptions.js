'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var OPTIONS = {
  DF: [{ caption: 'Default: Area', value: 'AREA' }, { caption: 'Map: All Countries', value: 'MAP', compType: _Type.CompItemType.EUROSTAT_MAP }, { caption: 'Column: All Countries', value: 'COLUMN' }, { caption: 'Bar: All Countries', value: 'BAR' }],
  T2: [{ caption: 'Default: Area', value: 'AREA' }, { caption: 'Yearly by Months', value: 'AREA_YEARLY' }],
  T3: [{ caption: 'Default: Area', value: 'AREA' }, { caption: 'Column: All Items', value: 'COLUMN' }, { caption: 'Column: All Items: Clusters', value: 'COLUMN_CLUSTER' }, { caption: 'Bar: All Items', value: 'BAR' }, { caption: 'Bar: All Items: Clusters', value: 'BAR_CLUSTER' }]
};

var CATEGORY_TYPES = ['MAP', 'COLUMN', 'COLUMN_CLUSTER', 'BAR', 'BAR_CLUSTER'];

var RouterOptions = {
  getOptions: function getOptions(optionType) {
    switch (optionType) {
      case 't2':
        return OPTIONS.T2;
      case 't3':
        return OPTIONS.T3;
      default:
        return OPTIONS.DF;
    }
  },
  isCategory: function isCategory(chartType) {
    if (!chartType) {
      return false;
    }
    return CATEGORY_TYPES.indexOf(chartType.value) !== -1;
  }
};

exports.default = RouterOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\eurostat\RouterOptions.js.map