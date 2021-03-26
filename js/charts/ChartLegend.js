"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

var C = {
  OPEN: 'open',
  OPEN_INTEREST: 'open interest',
  OPEN_INTEREST_2: 'o.i.',
  OPEN_INTEREST_3: 'prev. day open interest',
  HIGH: 'high',
  LOW: 'low',
  VOLUME: 'volume',
  ADJ_CLOSE: 'adj. close',
  ADJ_CLOSE_2: 'adjusted close',
  PRE_SETTLE: 'pre settle',
  CLOSE: 'close',
  LAST: 'last',
  TURNOVER: 'turnover',
  TRADES: 'trades',
  BALANCE: 'balance',
  IMPORTS: 'imports',
  EXPORTS: 'exports'
};

var _assign = Object.assign,
    _crCs = function _crCs(color, symbol) {
  if (symbol === void 0) {
    symbol = 'circle';
  }

  return {
    color: color,
    symbol: symbol
  };
},
    _crCsa = function _crCsa(color, symbol) {
  if (symbol === void 0) {
    symbol = 'diamond';
  }

  return {
    color: color,
    symbol: symbol,
    isSecondAxes: true
  };
};

var ChartLegend = {
  crLegendConfig: function crLegendConfig(columnName) {
    var _conf = {
      data: [],
      name: columnName
    };

    switch (columnName.toLowerCase()) {
      case C.OPEN:
        return _assign(_conf, _crCs(_Color["default"].S_OPEN));

      case C.OPEN_INTEREST:
      case C.OPEN_INTEREST_2:
      case C.OPEN_INTEREST_3:
        return _assign(_conf, _crCsa(_Color["default"].S_OPEN_INTEREST, 'circle'));

      case C.HIGH:
        return _assign(_conf, _crCs(_Color["default"].S_HIGH));

      case C.LOW:
        return _assign(_conf, _crCs(_Color["default"].S_LOW));

      case C.VOLUME:
        return _assign({}, _conf, _crCsa(_Color["default"].S_VOLUME));

      case C.ADJ_CLOSE:
      case C.ADJ_CLOSE_2:
        return _assign(_conf, _crCs(_Color["default"].S_ADJ_CLOSE, 'diamond'));

      case C.CLOSE:
      case C.LAST:
        return _assign(_conf, _crCs(_Color["default"].S_CLOSE, 'diamond'));

      case C.PRE_SETTLE:
        return _assign(_conf, _crCs(_Color["default"].S_PRE_SETTLE, 'diamond'));

      case C.TURNOVER:
        return _assign(_conf, _crCsa(_Color["default"].S_TURNOVER));

      case C.TRADES:
        return _assign(_conf, _crCsa(_Color["default"].S_TRADES));

      case C.BALANCE:
        return _assign(_conf, _crCs(_Color["default"].S_BALANCE));

      case C.IMPORTS:
        return _assign(_conf, _crCs(_Color["default"].S_IMPORTS));

      case C.EXPORTS:
        return _assign(_conf, _crCs(_Color["default"].S_EXPORTS));

      default:
        return _assign(_conf, {
          color: void 0,
          symbol: 'circle',
          isSecondAxes: false
        });
    }
  }
};
var _default = ChartLegend;
exports["default"] = _default;
//# sourceMappingURL=ChartLegend.js.map