"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

var ymdhmsToUTC = _AdapterFn["default"].ymdhmsToUTC,
    crVolumePoint = _AdapterFn["default"].crVolumePoint,
    crAthPoint = _AdapterFn["default"].crAthPoint;

var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var AdapterStockFn = {
  toSeriesData: function toSeriesData(_ref) {
    var _ref$arr = _ref.arr,
        arr = _ref$arr === void 0 ? [] : _ref$arr,
        _ref$toDate = _ref.toDate,
        toDate = _ref$toDate === void 0 ? ymdhmsToUTC : _ref$toDate,
        _ref$seriaOption = _ref.seriaOption,
        seriaOption = _ref$seriaOption === void 0 ? {} : _ref$seriaOption,
        _ref$option = _ref.option,
        option = _ref$option === void 0 ? {} : _ref$option;
    var _seriaOption$isAllSer = seriaOption.isAllSeries,
        isAllSeries = _seriaOption$isAllSer === void 0 ? true : _seriaOption$isAllSer,
        _seriaOption$pnDate = seriaOption.pnDate,
        pnDate = _seriaOption$pnDate === void 0 ? 'date' : _seriaOption$pnDate,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        sT = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        seriaType = _isStr(sT) ? sT.toLowerCase() : 'area';
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
          _date = toDate(date);

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
        dataVolumeColumn.push(crVolumePoint({
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
        dataATH.push(!_isUndef(_prevClose) ? crAthPoint({
          date: _date,
          close: _prevClose,
          open: open
        }) : crAthPoint({
          date: _date,
          close: close,
          open: close
        }));
        _prevClose = close;
      }
    });
    return {
      data: data,
      minClose: minClose,
      maxClose: maxClose,
      dataOpen: dataOpen,
      dataHigh: dataHigh,
      dataLow: dataLow,
      dataVolume: dataVolume,
      dataVolumeColumn: dataVolumeColumn,
      dataATH: dataATH,
      dataMfi: dataMfi,
      isNotZoomToMinMax: isNotZoomToMinMax,
      isDrawDeltaExtrems: isDrawDeltaExtrems,
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth
    };
  }
};
var _default = AdapterStockFn;
exports["default"] = _default;
//# sourceMappingURL=AdapterStockFn.js.map