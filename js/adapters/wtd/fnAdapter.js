"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require("../AdapterFn");

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdtToUTC = _AdapterFn2.default.ymdtToUTC,
    volumeColumnPoint = _AdapterFn2.default.volumeColumnPoint,
    athPoint = _AdapterFn2.default.athPoint,
    valueMoving = _AdapterFn2.default.valueMoving;


var _crZhConfig = function _crZhConfig(_ref) {
  var _itemId = _ref._itemId,
      value = _ref.value,
      dataSource = _ref.dataSource;
  return {
    dataSource: dataSource,
    id: _itemId,
    key: _itemId,
    item: value,
    linkFn: "NASDAQ",
    isWithLegend: true,
    isWithoutAdd: true,
    legend: _AdapterFn2.default.stockSeriesLegend()
  };
};

var _crInfo = function _crInfo(_ref2) {
  var title = _ref2.title,
      toDate = _ref2.toDate,
      fromDate = _ref2.fromDate;
  return {
    frequency: "Daily",
    name: title,
    toDate: toDate, fromDate: fromDate
  };
};

var _parseToFloat = function _parseToFloat(item) {
  var open = item.open,
      close = item.close,
      high = item.high,
      low = item.low,
      volume = item.volume;

  item.open = parseFloat(open);
  item.close = parseFloat(close);
  item.high = parseFloat(high);
  item.low = parseFloat(low);
  item.volume = parseFloat(volume);
  return item;
};

var fnAdapter = {

  crData: function crData(json, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        history = json.history,
        keys = Object.keys(history),
        data = [],
        dataHigh = [],
        dataLow = [],
        dataOpen = [],
        dataVolumeColumn = [],
        dataVolume = [],
        dataATH = [],
        max = keys.length;

    var minClose = Number.POSITIVE_INFINITY,
        maxClose = Number.NEGATIVE_INFINITY,
        _prevClose = void 0,
        i = 0;
    for (i; i < max; i++) {
      var _dateKey = keys[i],
          _item = history[_dateKey],
          _parseToFloat2 = _parseToFloat(_item),
          open = _parseToFloat2.open,
          close = _parseToFloat2.close,
          high = _parseToFloat2.high,
          low = _parseToFloat2.low,
          volume = _parseToFloat2.volume,
          date = ymdtToUTC(_dateKey);

      data.push([date, close]);
      dataHigh.push([date, high]);
      dataLow.push([date, low]);
      dataOpen.push([date, open]);
      dataVolume.push([date, volume]);
      dataVolumeColumn.push(volumeColumnPoint({
        open: open, close: close, volume: volume, date: date,
        option: { _high: high, _low: low }
      }));
      if (typeof _prevClose !== 'undefined') {
        dataATH.push(athPoint({
          date: date, prevClose: _prevClose, open: open
        }));
      }
      _prevClose = close;

      if (minClose > close) {
        minClose = close;
      }
      if (maxClose < close) {
        maxClose = close;
      }
    }

    return {
      isNotZoomToMinMax: isNotZoomToMinMax,
      isDrawDeltaExtrems: isDrawDeltaExtrems,
      data: data,
      dataHigh: dataHigh,
      dataLow: dataLow,
      dataOpen: dataOpen,
      dataVolumeColumn: dataVolumeColumn,
      dataVolume: dataVolume,
      dataATH: dataATH,
      minClose: minClose,
      maxClose: maxClose
    };
  },

  crConfigOption: function crConfigOption(_ref3) {
    var data = _ref3.data,
        option = _ref3.option;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map