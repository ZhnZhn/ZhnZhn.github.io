'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var toInfoConfig = {
  toConfig: function toConfig(json, option) {
    var value = option.value,
        _json$Data$General = json.Data.General,
        General = _json$Data$General === undefined ? {} : _json$Data$General,
        config = {
      General: General,
      zhCompType: 'COIN_INFO',
      zhConfig: {
        id: value, key: value
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