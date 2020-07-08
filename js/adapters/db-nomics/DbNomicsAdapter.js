"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crData = _fnAdapter["default"].crData,
    crTitle = _fnAdapter["default"].crTitle,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var DbNomicsAdapter = {
  toConfig: function toConfig(json, option) {
    var fromDate = option.fromDate,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        _crTitle = crTitle(option, json),
        title = _crTitle.title,
        subtitle = _crTitle.subtitle,
        data = crData(json, fromDate),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth,
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder["default"])().area2Config(title, subtitle).addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, crConfigOption({
      json: json,
      option: option,
      data: data
    }))).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return _ConfigBuilder["default"].crSeria({
      adapter: DbNomicsAdapter,
      json: json,
      option: option
    });
  }
};
var _default = DbNomicsAdapter;
exports["default"] = _default;
//# sourceMappingURL=DbNomicsAdapter.js.map