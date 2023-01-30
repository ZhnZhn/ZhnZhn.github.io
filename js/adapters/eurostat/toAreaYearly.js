"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crAreaYearlyConfig = void 0;
var _EuroStatFn = require("./EuroStatFn");
var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));
const crAreaYearlyConfig = (json, option) => {
  const data = (0, _EuroStatFn.toPointArr)(json).reverse(),
    {
      title,
      subtitle
    } = option,
    config = (0, _toYearsByMonths.default)(data, {
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
};
exports.crAreaYearlyConfig = crAreaYearlyConfig;
//# sourceMappingURL=toAreaYearly.js.map