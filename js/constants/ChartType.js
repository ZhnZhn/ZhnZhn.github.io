'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DialogType = require('./DialogType');

var addCharts = function addCharts(obj, dialogType, prefix) {
  for (var prop in dialogType) {
    obj[prefix + prop] = dialogType[prop];
  }
};

var createTypeObject = function createTypeObject() {
  var obj = {};
  addCharts(obj, _DialogType.Quandl, 'QUANDL_');
  obj['WATCH_LIST'] = 'WL_WATCH_LIST';

  return obj;
};

var ChartType = createTypeObject();

exports.default = ChartType;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\ChartType.js.map