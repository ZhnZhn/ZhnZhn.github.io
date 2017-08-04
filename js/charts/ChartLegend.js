'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ChartLegend = {
  fLegendConfig: function fLegendConfig(columnName) {
    var baseConfig = {
      data: [], name: columnName
    };

    switch (columnName.toLowerCase()) {
      case C.OPEN:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_OPEN, symbol: 'circle' });
      case C.OPEN_INTEREST:case C.OPEN_INTEREST_2:case C.OPEN_INTEREST_3:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_OPEN_INTEREST, symbol: 'circle', isSecondAxes: true });
      case C.HIGH:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_HIGH, symbol: 'circle' });
      case C.LOW:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_LOW, symbol: 'circle' });
      case C.VOLUME:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_VOLUME, symbol: 'diamond', isSecondAxes: true });
      case C.ADJ_CLOSE:case C.ADJ_CLOSE_2:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_ADJ_CLOSE, symbol: 'diamond' });
      case C.CLOSE:case C.LAST:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_CLOSE, symbol: 'diamond' });
      case C.PRE_SETTLE:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_PRE_SETTLE, symbol: 'diamond' });
      case C.TURNOVER:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_TURNOVER, symbol: 'diamond', isSecondAxes: true });
      case C.TRADES:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_TRADES, symbol: 'diamond', isSecondAxes: true });
      case C.BALANCE:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_BALANCE, symbol: 'circle' });
      case C.IMPORTS:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_IMPORTS, symbol: 'circle' });
      case C.EXPORTS:
        return Object.assign({}, baseConfig, { color: _Color2.default.S_EXPORTS, symbol: 'circle' });
      default:
        return Object.assign({}, baseConfig, { color: undefined, symbol: 'circle', isSecondAxes: false });
    }
  }
};

exports.default = ChartLegend;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartLegend.js.map