"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ChartConfigFn = require("../../charts/ChartConfigFn");
var _Chart = require("../../charts/Chart");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _stockBuilderFn = require("../../charts/stockBuilderFn");
var _QuandlFn = require("./QuandlFn");
var _C = require("./C");
var _crAreaData = _interopRequireDefault(require("./crAreaData"));
const _assign = Object.assign;
const _isMfi = names => names[2] === _C.HIGH && names[3] === _C.LOW && names[4] === _C.CLOSE && names[5] === _C.VOLUME;
const _isMomAth = names => names[1] === _C.OPEN && names[4] === _C.CLOSE;
const _addSeriesTo = (config, legendSeries) => {
  if (!legendSeries) {
    return;
  }
  const legend = [];
  if (config.series.length !== 0) {
    legend.push({
      name: config.series[0].name,
      index: 0,
      color: _C.COLOR_BLUE,
      isVisible: true
    });
  }
  let i = 0,
    max = legendSeries.length;
  for (i; i < max; i++) {
    const {
        data,
        name,
        color,
        symbol,
        isSecondAxes
      } = legendSeries[i],
      seria = (0, _ChartConfigFn.crSeriaConfig)({
        name,
        data,
        color,
        visible: false,
        marker: (0, _Chart.fSeriaMarker)(symbol)
      });
    if (!isSecondAxes) {
      config.series.push(seria);
      legend.push({
        name,
        color,
        index: config.series.length - 1,
        isVisible: false
      });
    } /*else {
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
const toArea = (json, option) => {
  const columnNames = (0, _QuandlFn.getColumnNames)(json),
    {
      columnName,
      value: chartId,
      isDrawDeltaExtrems,
      isNotZoomToMinMax,
      dfR,
      title,
      subtitle
    } = option,
    {
      seria,
      minY,
      maxY,
      dataExDividend,
      dataSplitRatio,
      dataVolume,
      dataVolumeColumn,
      dataATH,
      dataHighLow,
      legendSeries,
      zhPoints
    } = (0, _crAreaData.default)(json, option);
  let config = (0, _configBuilderFn.crAreaConfig)();
  _assign(config.series[0], {
    data: seria,
    name: columnName
  });
  const legend = _addSeriesTo(config, legendSeries);
  return {
    config: (0, _pipe.default)(config, (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAddMinMax)(seria, {
      minY,
      maxY,
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    }), (0, _configBuilderFn.fAdd)({
      valueMoving: (0, _QuandlFn.valueMoving)(seria, dfR),
      zhConfig: (0, _QuandlFn.crZhConfig)(option),
      info: (0, _QuandlFn.crDatasetInfo)(json)
    }), (0, _configBuilderFn.fAddLegend)(legend), (0, _stockBuilderFn.fAddDividend)(dataExDividend, minY, maxY), (0, _stockBuilderFn.fAddSplitRatio)(dataSplitRatio, minY, maxY), (0, _stockBuilderFn.fAddMiniVolume)({
      id: chartId,
      dColumn: dataVolumeColumn,
      dVolume: dataVolume
    }), (0, _stockBuilderFn.fAddMiniATH)({
      id: chartId,
      data: dataATH
    }), (0, _stockBuilderFn.fAddMiniHL)({
      id: chartId,
      data: dataHighLow
    }), ...[_isMfi(columnNames) && (0, _configBuilderFn.fAddZhPoints)(zhPoints), _isMomAth(columnNames) && (0, _configBuilderFn.fAddZhPoints)(zhPoints, 'zhIsMomAth')].filter(Boolean), _configBuilderFn.toConfig)
  };
};
var _default = toArea;
exports.default = _default;
//# sourceMappingURL=toArea.js.map