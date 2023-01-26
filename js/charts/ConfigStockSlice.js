"use strict";

exports.__esModule = true;
exports.default = void 0;
var _stockBuilderFn = require("./stockBuilderFn");
const ConfigStockSlice = {
  //Used only by Alpha Vantage Daily Adjusted, Quandl EOD
  addDividend(data, min, max) {
    (0, _stockBuilderFn.fAddDividend)(data, min, max)(this.config);
    return this;
  },
  //Used only by Quandl EOD
  addSplitRatio(data, min, max) {
    (0, _stockBuilderFn.fAddSplitRatio)(data, min, max)(this.config);
    return this;
  },
  addMiniVolume(option) {
    (0, _stockBuilderFn.fAddMiniVolume)(option)(this.config);
    return this;
  },
  addMiniATH(option) {
    (0, _stockBuilderFn.fAddMiniATH)(option)(this.config);
    return this;
  },
  addMiniHL(option) {
    (0, _stockBuilderFn.fAddMiniHL)(option)(this.config);
    return this;
  }
};
var _default = ConfigStockSlice;
exports.default = _default;
//# sourceMappingURL=ConfigStockSlice.js.map