"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

var _C = _interopRequireDefault(require("./C"));

var _crAreaData2 = _interopRequireDefault(require("./crAreaData"));

var valueMoving = _QuandlFn["default"].valueMoving,
    getColumnNames = _QuandlFn["default"].getColumnNames,
    createZhConfig = _QuandlFn["default"].createZhConfig,
    createDatasetInfo = _QuandlFn["default"].createDatasetInfo,
    _assign = Object.assign;

var _isMfi = function _isMfi(names) {
  return names[2] === _C["default"].HIGH && names[3] === _C["default"].LOW && names[4] === _C["default"].CLOSE && names[5] === _C["default"].VOLUME;
};

var _isMomAth = function _isMomAth(names) {
  return names[1] === _C["default"].OPEN && names[4] === _C["default"].CLOSE;
};

var _addSeriesTo = function _addSeriesTo(config, legendSeries) {
  if (!legendSeries) {
    return;
  }

  var legend = [];

  if (config.series.length !== 0) {
    legend.push({
      name: config.series[0].name,
      index: 0,
      color: _C["default"].COLOR_BLUE,
      isVisible: true
    });
  }

  var i = 0,
      max = legendSeries.length;

  for (i; i < max; i++) {
    var _legendSeries$i = legendSeries[i],
        data = _legendSeries$i.data,
        name = _legendSeries$i.name,
        color = _legendSeries$i.color,
        symbol = _legendSeries$i.symbol,
        isSecondAxes = _legendSeries$i.isSecondAxes,
        seria = _ChartConfig["default"].crSeria({
      name: name,
      data: data,
      visible: false,
      color: color,
      marker: _Chart["default"].fSeriaMarker({
        color: color,
        symbol: symbol
      })
    });

    if (!isSecondAxes) {
      config.series.push(seria);
      legend.push({
        name: name,
        index: config.series.length - 1,
        color: color,
        isVisible: false
      });
    }
    /*else {
    legend.push({
       name : name,
       color : color,
       isVisible : false,
       isSecondAxes : true,
       seria : seria
     });
    }*/

  }

  return legend;
};

var toArea = function toArea(json, option) {
  var columnNames = getColumnNames(json),
      columnName = option.columnName,
      chartId = option.value,
      isDrawDeltaExtrems = option.isDrawDeltaExtrems,
      isNotZoomToMinMax = option.isNotZoomToMinMax,
      dfR = option.dfR,
      title = option.title,
      subtitle = option.subtitle;

  var _crAreaData = (0, _crAreaData2["default"])(json, option),
      seria = _crAreaData.seria,
      minY = _crAreaData.minY,
      maxY = _crAreaData.maxY,
      dataExDividend = _crAreaData.dataExDividend,
      dataSplitRatio = _crAreaData.dataSplitRatio,
      dataVolume = _crAreaData.dataVolume,
      dataVolumeColumn = _crAreaData.dataVolumeColumn,
      dataATH = _crAreaData.dataATH,
      dataHighLow = _crAreaData.dataHighLow,
      legendSeries = _crAreaData.legendSeries,
      zhPoints = _crAreaData.zhPoints;

  var config = _ChartConfig["default"].crAreaConfig({
    spacingTop: 25
  });

  _assign(config.series[0], {
    data: seria,
    name: columnName
  });

  var legend = _addSeriesTo(config, legendSeries);

  config = (0, _ConfigBuilder["default"])(config).addCaption(title, subtitle).addMinMax(seria, {
    minY: minY,
    maxY: maxY,
    isNotZoomToMinMax: isNotZoomToMinMax,
    isDrawDeltaExtrems: isDrawDeltaExtrems
  }).add({
    valueMoving: valueMoving(seria, dfR),
    zhConfig: createZhConfig(option),
    info: createDatasetInfo(json)
  }).addZhPointsIf(zhPoints, 'zhIsMfi', _isMfi(columnNames)).addZhPointsIf(zhPoints, 'zhIsMomAth', _isMomAth(columnNames)).addLegend(legend).addDividend(dataExDividend, minY, maxY).addSplitRatio(dataSplitRatio, minY, maxY).addMiniVolume({
    id: chartId,
    dColumn: dataVolumeColumn,
    dVolume: dataVolume
  }).addMiniATH({
    id: chartId,
    data: dataATH
  }).addMiniHL({
    id: chartId,
    data: dataHighLow
  }).toConfig();
  return {
    config: config
  };
};

var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toArea.js.map