"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = require("./EuroStatFn");

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

const toAreaYearly = {
  createConfig: (json, option) => {
    const data = (0, _EuroStatFn.toPointArr)(json).reverse(),
          {
      title,
      subtitle
    } = option,
          config = _toYearsByMonths.default.toConfig(data, {
      title,
      subtitle,
      itemCaption: title + ': ' + subtitle,
      value: title + '_' + subtitle,
      dataSource: (0, _EuroStatFn.crDataSource)(option),
      ...(0, _EuroStatFn.crLinkConf)(option)
    });

    (0, _EuroStatFn.setInfo)({
      config,
      json,
      option
    });
    return config;
  },
  createSeria: (json, option) => _ChartConfig.default.crSeria({
    name: 'Empty Seria'
  })
};
var _default = toAreaYearly;
exports.default = _default;
//# sourceMappingURL=toAreaYearly.js.map