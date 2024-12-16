"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _toTableFn = require("../toTableFn");
const _pnTurnoverUsd = "turnover",
  HEADERS = [{
    ...(0, _toTableFn.crNameProps)("Rank", "id"),
    ...(0, _toTableFn.crStyleCenter)()
  }, (0, _toTableFn.crNameProps)("Base"), (0, _toTableFn.crNameProps)("Quote"), {
    ...(0, _toTableFn.crNameProps)("Volume"),
    ...(0, _toTableFn.crNumberProps)(0)
  }, {
    ...(0, _toTableFn.crNameProps)("Price"),
    ...(0, _toTableFn.crNumberProps)()
  }, {
    ...(0, _toTableFn.crNameProps)("Price USD", "price_usd", true),
    ...(0, _toTableFn.crNumberProps)()
  }, {
    ...(0, _toTableFn.crNameProps)("V*P USD", _pnTurnoverUsd, true),
    ...(0, _toTableFn.crNumberProps)(0)
  }, (0, _toTableFn.crNameProps)("Time", true), (0, _toTableFn.crNameProps)("Date", true)];
const _crTimeDate = time => (0, _AdapterFn.toTd)(time * 1000).split(" ")
  // base = null or quote = null or volume = 0
  ,
  _isNotEmptyPair = _ref => {
    let {
      base,
      quote,
      volume
    } = _ref;
    return base && quote && volume !== 0;
  },
  _crRows = json => {
    const {
        pairs
      } = json,
      _rows = [],
      _len = pairs.length;
    let tMin = NaN,
      tMax = NaN,
      item,
      i = 0,
      id = 1;
    for (i; i < _len; i++) {
      item = pairs[i];
      if (_isNotEmptyPair(item)) {
        const _time = item.time,
          [time = "", date = ""] = _crTimeDate(_time),
          _priceUsd = item.price_usd;
        _rows.push({
          ...item,
          "price_usd": (0, _AdapterFn.roundByOHLC)(_priceUsd),
          [_pnTurnoverUsd]: item.volume * _priceUsd,
          time,
          date,
          id
        });
        tMin = tMin < _time ? tMin : _time;
        tMax = tMax > _time ? tMax : _time;
        id++;
      }
    }
    return {
      rows: (0, _toTableFn.crTableRows)(HEADERS, _rows),
      tMin,
      tMax
    };
  },
  _crTimePeriod = (tMin, tMax) => {
    const tdMin = (0, _AdapterFn.toTd)(tMin * 1000),
      tdMax = (0, _AdapterFn.toTd)(tMax * 1000),
      minArr = tdMin.split(" "),
      maxArr = tdMax.split(" "),
      dmy = minArr[1] === maxArr[1] ? minArr[1] : void 0;
    return dmy ? `${minArr[0]} - ${maxArr[0]} ${dmy}` : `${tdMin} ${tdMax}`;
  },
  _crTitle = (json, _ref2, tMin, tMax) => {
    let {
      items
    } = _ref2;
    const _title = (json["0"] || {}).name || items[0].c,
      _period = _crTimePeriod(tMin, tMax);
    return `${_title} ${_period}`;
  };
const ClAdapter = {
  toConfig(json, option) {
    const {
        _itemKey,
        dataSource
      } = option,
      {
        rows,
        tMin,
        tMax
      } = _crRows(json),
      title = _crTitle(json, option, tMin, tMax),
      config = (0, _toTableFn.crTableConfig)({
        id: _itemKey,
        title,
        headers: HEADERS,
        rows,
        dataSource
      });
    return {
      config
    };
  }
};
var _default = exports.default = ClAdapter;
//# sourceMappingURL=ClAdapter.js.map