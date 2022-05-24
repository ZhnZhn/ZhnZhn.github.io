"use strict";

exports.__esModule = true;
exports.crLegendConfig = void 0;

var _Color = require("../constants/Color");

const OPEN = 'open',
      OPEN_INTEREST = 'open interest',
      OPEN_INTEREST_2 = 'o.i.',
      OPEN_INTEREST_3 = 'prev. day open interest',
      HIGH = 'high',
      LOW = 'low',
      VOLUME = 'volume',
      ADJ_CLOSE = 'adj. close',
      ADJ_CLOSE_2 = 'adjusted close',
      PRE_SETTLE = 'pre settle',
      CLOSE = 'close',
      LAST = 'last',
      TURNOVER = 'turnover',
      TRADES = 'trades',
      BALANCE = 'balance',
      IMPORTS = 'imports',
      EXPORTS = 'exports';

const _assign = Object.assign,
      _crCs = function (color, symbol) {
  if (symbol === void 0) {
    symbol = 'circle';
  }

  return {
    color,
    symbol
  };
},
      _crCsa = function (color, symbol) {
  if (symbol === void 0) {
    symbol = 'diamond';
  }

  return {
    color,
    symbol,
    isSecondAxes: true
  };
};

const crLegendConfig = columnName => {
  const _conf = {
    data: [],
    name: columnName
  };

  switch (columnName.toLowerCase()) {
    case OPEN:
      return _assign(_conf, _crCs(_Color.COLOR_S_OPEN));

    case OPEN_INTEREST:
    case OPEN_INTEREST_2:
    case OPEN_INTEREST_3:
      return _assign(_conf, _crCsa(_Color.COLOR_S_OPEN_INTEREST, 'circle'));

    case HIGH:
      return _assign(_conf, _crCs(_Color.COLOR_S_HIGH));

    case LOW:
      return _assign(_conf, _crCs(_Color.COLOR_S_LOW));

    case VOLUME:
      return _assign(_conf, _crCsa(_Color.COLOR_S_VOLUME));

    case ADJ_CLOSE:
    case ADJ_CLOSE_2:
      return _assign(_conf, _crCs(_Color.COLOR_S_ADJ_CLOSE, 'diamond'));

    case CLOSE:
    case LAST:
      return _assign(_conf, _crCs(_Color.COLOR_S_CLOSE, 'diamond'));

    case PRE_SETTLE:
      return _assign(_conf, _crCs(_Color.COLOR_S_PRE_SETTLE, 'diamond'));

    case TURNOVER:
      return _assign(_conf, _crCsa(_Color.COLOR_S_TURNOVER));

    case TRADES:
      return _assign(_conf, _crCsa(_Color.COLOR_S_TRADES));

    case BALANCE:
      return _assign(_conf, _crCs(_Color.COLOR_S_BALANCE));

    case IMPORTS:
      return _assign(_conf, _crCs(_Color.COLOR_S_IMPORTS));

    case EXPORTS:
      return _assign(_conf, _crCs(_Color.COLOR_S_EXPORTS));

    default:
      return _assign(_conf, {
        color: void 0,
        symbol: 'circle',
        isSecondAxes: false
      });
  }
};

exports.crLegendConfig = crLegendConfig;
//# sourceMappingURL=ChartLegend.js.map