"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

var _toArea = _interopRequireDefault(require("./toArea"));

var _toSemiDonut = _interopRequireDefault(require("./toSemiDonut"));

var _toStackedArea = _interopRequireDefault(require("./toStackedArea"));

var _toStackedColumn = _interopRequireDefault(require("./toStackedColumn"));

var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

var _toScatter = _interopRequireDefault(require("./toScatter"));

var _rToConfig2, _rToSeria2;

var getData = _QuandlFn["default"].getData,
    getDataColumnIndex = _QuandlFn["default"].getDataColumnIndex;

var _fToConfig = function _fToConfig(builder) {
  return function (json, option) {
    var data = getData(json);
    return {
      config: builder.toConfig(data, option)
    };
  };
};

var _fToSeria = function _fToSeria(builder) {
  return function (json, option, chart) {
    var data = getData(json);
    return builder.toSeria(data, option, chart);
  };
};

var _rToConfig = (_rToConfig2 = {}, _rToConfig2[_Type.ChartType.AREA] = _toArea["default"], _rToConfig2[_Type.ChartType.SEMI_DONUT] = _toSemiDonut["default"], _rToConfig2[_Type.ChartType.STACKED_AREA] = _toStackedArea["default"], _rToConfig2[_Type.ChartType.STACKED_AREA_PERCENT] = _toStackedArea["default"], _rToConfig2[_Type.ChartType.STACKED_COLUMN] = _toStackedColumn["default"], _rToConfig2[_Type.ChartType.STACKED_COLUMN_PERCENT] = _toStackedColumn["default"], _rToConfig2[_Type.ChartType.TREE_MAP] = _toTreeMap["default"], _rToConfig2[_Type.ChartType.YEARLY] = _fToConfig(_toYearsByMonths["default"]), _rToConfig2[_Type.ChartType.SCATTER] = _fToConfig(_toScatter["default"]), _rToConfig2[_Type.ChartType.SCATTER_UP] = _fToConfig(_toScatter["default"]), _rToConfig2[_Type.ChartType.SCATTER_DOWN] = _fToConfig(_toScatter["default"]), _rToConfig2);

var _crSeriaData = function _crSeriaData(data, yIndex) {
  return data.map(function (p) {
    return [_AdapterFn["default"].ymdToUTC(p[0]), p[yIndex]];
  }).sort(_AdapterFn["default"].compareByDate);
};

var _toSeria = function _toSeria(json, option) {
  var chartId = option.value,
      yPointIndex = getDataColumnIndex(json, option),
      data = _crSeriaData(getData(json), yPointIndex);

  return _ChartConfig["default"].crSeria({
    name: chartId.substring(0, 12),
    data: data,
    minY: _AdapterFn["default"].findMinY(data)
  });
};

var _rToSeria = (_rToSeria2 = {
  DF: _toSeria
}, _rToSeria2[_Type.ChartType.SCATTER] = _fToSeria(_toScatter["default"]), _rToSeria2[_Type.ChartType.SCATTER_UP] = _fToSeria(_toScatter["default"]), _rToSeria2[_Type.ChartType.SCATTER_DOWN] = _fToSeria(_toScatter["default"]), _rToSeria2);

var QuandlAdapter = {
  toConfig: function toConfig(json, option) {
    var _option$seriaType = option.seriaType,
        seriaType = _option$seriaType === void 0 ? _Type.ChartType.AREA : _option$seriaType;
    return _rToConfig[seriaType](json, option);
  },
  toSeries: function toSeries(json, option, chart) {
    var seriaType = option.seriaType,
        _toSeria = _rToSeria[seriaType] || _rToSeria.DF;

    return _toSeria(json, option, chart);
  }
};
var _default = QuandlAdapter;
exports["default"] = _default;
//# sourceMappingURL=QuandlAdapter.js.map