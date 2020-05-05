"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

var crTimeIndexAndValue = _EuroStatFn["default"].crTimeIndexAndValue,
    toPointArr = _EuroStatFn["default"].toPointArr,
    crDataSource = _EuroStatFn["default"].crDataSource,
    crLinkConf = _EuroStatFn["default"].crLinkConf,
    setInfo = _EuroStatFn["default"].setInfo;
var toAreaYearly = {
  createConfig: function createConfig(json, option) {
    var _crTimeIndexAndValue = crTimeIndexAndValue(json),
        timeIndex = _crTimeIndexAndValue.timeIndex,
        value = _crTimeIndexAndValue.value,
        data = toPointArr(timeIndex, value).reverse(),
        title = option.title,
        subtitle = option.subtitle,
        config = _toYearsByMonths["default"].toConfig(data, (0, _extends2["default"])({
      title: title,
      subtitle: subtitle,
      itemCaption: title + ': ' + subtitle,
      value: title + '_' + subtitle,
      dataSource: crDataSource(option)
    }, crLinkConf(json, option)));

    setInfo({
      config: config,
      json: json,
      option: option
    });
    return config;
  },
  createSeria: function createSeria(json, option) {
    var seria = _ChartConfig["default"].fSeries();

    Object.assign(seria, {
      zhSeriaId: 'Empty_Seria',
      zhValueText: 'Empty Seria'
    });
    return seria;
  }
};
var _default = toAreaYearly;
exports["default"] = _default;
//# sourceMappingURL=toAreaYearly.js.map