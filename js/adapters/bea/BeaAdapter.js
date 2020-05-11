"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    crSeria = _fnAdapter["default"].crSeria;
var BeaAdapter = {
  toConfig: function toConfig(json, option) {
    var Results = json.BEAAPI.Results,
        data = crData(Results, option),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      data: data
    }).toSeria(),
        title = option.title,
        dfTitle = option.dfTitle,
        config = (0, _ConfigBuilder["default"])().area2Config(dfTitle, title).addMinMax(data, option).addSeries(seria).add((0, _extends2["default"])({}, crConfigOption({
      option: option,
      data: data,
      Results: Results
    }))).toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return crSeria({
      adapter: BeaAdapter,
      json: json,
      option: option
    });
  }
};
var _default = BeaAdapter;
exports["default"] = _default;
//# sourceMappingURL=BeaAdapter.js.map