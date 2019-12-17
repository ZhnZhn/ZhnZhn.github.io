"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var toInfoConfig = {
  toConfig: function toConfig(json, option) {
    var value = option.value,
        _json$Data$General = json.Data.General,
        General = _json$Data$General === void 0 ? {} : _json$Data$General,
        _General$Symbol = General.Symbol,
        id = _General$Symbol === void 0 ? value : _General$Symbol,
        config = {
      id: id,
      General: General,
      zhCompType: 'COIN_INFO',
      zhConfig: {
        //id: value, key: value
        id: id,
        key: id
      }
    };
    return {
      config: config
    };
  },
  toSeries: function toSeries() {
    throw new Error('ZH_1000');
  }
};
var _default = toInfoConfig;
exports["default"] = _default;
//# sourceMappingURL=toInfoConfig.js.map