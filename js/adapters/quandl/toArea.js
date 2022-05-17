"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _QuandlFn = require("./QuandlFn");

var _C = _interopRequireDefault(require("./C"));

var _crAreaData = _interopRequireDefault(require("./crAreaData"));

const _assign = Object.assign;

const _isMfi = names => names[2] === _C.default.HIGH && names[3] === _C.default.LOW && names[4] === _C.default.CLOSE && names[5] === _C.default.VOLUME;

const _isMomAth = names => names[1] === _C.default.OPEN && names[4] === _C.default.CLOSE;

const _addSeriesTo = (config, legendSeries) => {
  if (!legendSeries) {
    return;
  }

  const legend = [];

  if (config.series.length !== 0) {
    legend.push({
      name: config.series[0].name,
      index: 0,
      color: _C.default.COLOR_BLUE,
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
          seria = _ChartConfig.default.crSeria({
      name,
      data,
      color,
      visible: false,
      marker: _Chart.default.fSeriaMarker({
        color,
        symbol
      })
    });

    if (!isSecondAxes) {
      config.series.push(seria);
      legend.push({
        name,
        color,
        index: config.series.length - 1,
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

  let config = _ChartConfig.default.crAreaConfig({
    spacingTop: 25
  });

  _assign(config.series[0], {
    data: seria,
    name: columnName
  });

  const legend = _addSeriesTo(config, legendSeries);

  config = (0, _ConfigBuilder.default)(config).addCaption(title, subtitle).addMinMax(seria, {
    minY,
    maxY,
    isNotZoomToMinMax,
    isDrawDeltaExtrems
  }).add({
    valueMoving: (0, _QuandlFn.valueMoving)(seria, dfR),
    zhConfig: (0, _QuandlFn.crZhConfig)(option),
    info: (0, _QuandlFn.crDatasetInfo)(json)
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
    config
  };
};

var _default = toArea;
exports.default = _default;
//# sourceMappingURL=toArea.js.map