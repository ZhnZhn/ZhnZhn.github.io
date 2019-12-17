"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC,
    volumeColumnPoint = _AdapterFn["default"].volumeColumnPoint,
    athPoint = _AdapterFn["default"].athPoint;
var AdapterStockFn = {
  toSeriesData: function toSeriesData(arr, seriaOption) {
    if (arr === void 0) {
      arr = [];
    }

    var _ref = seriaOption || {},
        _ref$isAllSeries = _ref.isAllSeries,
        isAllSeries = _ref$isAllSeries === void 0 ? true : _ref$isAllSeries,
        _ref$pnDate = _ref.pnDate,
        pnDate = _ref$pnDate === void 0 ? 'date' : _ref$pnDate,
        restOption = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["isAllSeries", "pnDate"]);

    var data = [],
        dataOpen = [],
        dataHigh = [],
        dataLow = [],
        dataVolume = [],
        dataVolumeColumn = [],
        dataATH = [],
        dataMfi = [];

    var _prevClose,
        minClose = Number.POSITIVE_INFINITY,
        maxClose = Number.NEGATIVE_INFINITY;

    arr.forEach(function (item) {
      var open = item.open,
          high = item.high,
          low = item.low,
          close = item.close,
          volume = item.volume,
          date = item[pnDate] || '',
          _date = ymdToUTC(date);

      data.push([_date, close]);

      if (isAllSeries) {
        if (minClose > close) {
          minClose = close;
        }

        if (maxClose < close) {
          maxClose = close;
        }

        dataOpen.push([_date, open]);
        dataHigh.push([_date, high]);
        dataLow.push([_date, low]);
        dataVolume.push([_date, volume]);
        dataVolumeColumn.push(volumeColumnPoint({
          open: open,
          close: close,
          volume: volume,
          date: _date,
          option: {
            _high: high,
            _low: low
          }
        }));
        dataMfi.push([date, close, high, low, close, volume]);

        if (typeof _prevClose !== 'undefined') {
          dataATH.push(athPoint({
            date: _date,
            prevClose: _prevClose,
            open: open
          }));
        } else {
          dataATH.push(athPoint({
            date: _date,
            prevClose: close,
            open: close
          }));
        }

        _prevClose = close;
      }
    });
    return (0, _extends2["default"])({
      data: data,
      minClose: minClose,
      maxClose: maxClose,
      dataOpen: dataOpen,
      dataHigh: dataHigh,
      dataLow: dataLow,
      dataVolume: dataVolume,
      dataVolumeColumn: dataVolumeColumn,
      dataATH: dataATH,
      dataMfi: dataMfi
    }, restOption);
  }
};
var _default = AdapterStockFn;
exports["default"] = _default;
//# sourceMappingURL=AdapterStockFn.js.map