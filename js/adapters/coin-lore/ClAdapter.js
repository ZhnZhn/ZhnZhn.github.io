"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _toTableFn = _interopRequireDefault(require("../toTableFn"));

var toTd = _AdapterFn["default"].toTd;
var HEADERS = [{
  name: 'Rank',
  pn: 'id',
  style: {
    textAlign: 'center'
  }
}, {
  name: 'Base',
  pn: 'base'
}, {
  name: 'Quote',
  pn: 'quote'
}, {
  name: 'Volume',
  pn: 'volume',
  toN: [0],
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  name: 'Price',
  pn: 'price',
  toN: [],
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  isHide: true,
  name: 'Price USD',
  pn: 'price_usd',
  toN: [],
  isF: true,
  style: {
    fontWeight: 'bold'
  }
}, {
  isHide: true,
  name: 'Time',
  pn: 'time'
}, {
  isHide: true,
  name: 'Date',
  pn: 'date'
}];

var crTableConfig = _toTableFn["default"].crTableConfig,
    crRows = _toTableFn["default"].crRows,
    _crTimeDate = function _crTimeDate(time) {
  return toTd(time * 1000).split(' ');
},
    _isNotEmptyPair = function _isNotEmptyPair(_ref) {
  var base = _ref.base,
      quote = _ref.quote,
      volume = _ref.volume;
  return base && quote && volume !== 0;
},
    _crRows = function _crRows(json) {
  var pairs = json.pairs,
      _rows = [],
      _len = pairs.length;
  var tMin = NaN,
      tMax = NaN,
      item,
      i = 0,
      id = 1;

  for (i; i < _len; i++) {
    item = pairs[i];

    if (_isNotEmptyPair(item)) {
      var _time = item.time,
          _crTimeDate2 = _crTimeDate(_time),
          _crTimeDate2$ = _crTimeDate2[0],
          time = _crTimeDate2$ === void 0 ? '' : _crTimeDate2$,
          _crTimeDate2$2 = _crTimeDate2[1],
          date = _crTimeDate2$2 === void 0 ? '' : _crTimeDate2$2;

      _rows.push((0, _extends2["default"])({}, item, {
        time: time,
        date: date,
        id: id
      }));

      tMin = tMin < _time ? tMin : _time;
      tMax = tMax > _time ? tMax : _time;
      id++;
    }
  }

  return {
    rows: crRows(HEADERS, _rows),
    tMin: tMin,
    tMax: tMax
  };
},
    _crTimePeriod = function _crTimePeriod(tMin, tMax) {
  var tdMin = toTd(tMin * 1000),
      tdMax = toTd(tMax * 1000),
      minArr = tdMin.split(' '),
      maxArr = tdMax.split(' '),
      dmy = minArr[1] === maxArr[1] ? minArr[1] : void 0;
  return dmy ? minArr[0] + " - " + maxArr[0] + " " + dmy : tdMin + " " + tdMax;
},
    _crTitle = function _crTitle(json, _ref2, tMin, tMax) {
  var items = _ref2.items;

  var _title = (json["0"] || {}).name || items[0].c,
      _period = _crTimePeriod(tMin, tMax);

  return _title + " " + _period;
};

var ClAdapter = {
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        dataSource = option.dataSource,
        _crRows2 = _crRows(json),
        rows = _crRows2.rows,
        tMin = _crRows2.tMin,
        tMax = _crRows2.tMax,
        title = _crTitle(json, option, tMin, tMax),
        config = crTableConfig({
      id: _itemKey,
      title: title,
      headers: HEADERS,
      rows: rows,
      dataSource: dataSource
    });

    return {
      config: config
    };
  }
};
var _default = ClAdapter;
exports["default"] = _default;
//# sourceMappingURL=ClAdapter.js.map