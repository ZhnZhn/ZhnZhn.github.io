'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var toInfoConfig = {
  toConfig: function toConfig(json, option) {
    var value = option.value,
        _json$Data$General = json.Data.General,
        General = _json$Data$General === undefined ? {} : _json$Data$General,
        _General$Symbol = General.Symbol,
        id = _General$Symbol === undefined ? value : _General$Symbol,
        config = {
      id: id, General: General,
      zhCompType: 'COIN_INFO',
      zhConfig: {
        //id: value, key: value
        id: id, key: id
      }
    };

    return { config: config };
  },

  toSeries: function toSeries() {
    throw new Error('ZH_1000');
  }
};

exports.default = toInfoConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\crypto-compare\toInfoConfig.js.map