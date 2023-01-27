"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _fnAdapter = require("./fnAdapter");
const IntrinioAdapter = {
  toConfig(json, option) {
    option.subtitle = (0, _fnAdapter.crSubtitle)(option);
    const data = (0, _fnAdapter.crData)(json, option),
      confOption = (0, _fnAdapter.crConfigOption)(option);
    return {
      config: (0, _crConfigType.default)({
        option,
        data,
        confOption
      })
    };
  },
  toSeries(json, option) {
    return (0, _configBuilderFn.crSeriaConfigFromAdapter)({
      adapter: IntrinioAdapter,
      json,
      option
    });
  }
};
var _default = IntrinioAdapter;
exports.default = _default;
//# sourceMappingURL=IntrinioAdapter.js.map