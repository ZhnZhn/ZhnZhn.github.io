'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _AdapterFn = require('./AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    volumeColumnPoint = _AdapterFn2.default.volumeColumnPoint,
    athPoint = _AdapterFn2.default.athPoint;


var AdapterStockFn = {
  toSeriesData: function toSeriesData() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var seriaOption = arguments[1];

    var _ref = seriaOption || {},
        _ref$isAllSeries = _ref.isAllSeries,
        isAllSeries = _ref$isAllSeries === undefined ? true : _ref$isAllSeries,
        _ref$pnDate = _ref.pnDate,
        pnDate = _ref$pnDate === undefined ? 'date' : _ref$pnDate,
        restOption = (0, _objectWithoutProperties3.default)(_ref, ['isAllSeries', 'pnDate']);

    var data = [],
        dataOpen = [],
        dataHigh = [],
        dataLow = [],
        dataVolume = [],
        dataVolumeColumn = [],
        dataATH = [],
        dataMfi = [];
    var _prevClose = void 0,
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
          open: open, close: close, volume: volume, date: _date,
          option: { _high: high, _low: low }
        }));
        dataMfi.push([date, close, high, low, close, volume]);
        if (typeof _prevClose !== 'undefined') {
          dataATH.push(athPoint({
            date: _date,
            prevClose: _prevClose,
            open: open
          }));
        }
        _prevClose = close;
      }
    });

    return (0, _extends3.default)({
      data: data,
      minClose: minClose, maxClose: maxClose,
      dataOpen: dataOpen, dataHigh: dataHigh, dataLow: dataLow,
      dataVolume: dataVolume, dataVolumeColumn: dataVolumeColumn,
      dataATH: dataATH, dataMfi: dataMfi
    }, restOption);
  }
};

exports.default = AdapterStockFn;
//# sourceMappingURL=AdapterStockFn.js.map