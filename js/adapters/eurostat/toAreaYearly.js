"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

var toAreaYearly = {
  createConfig: function createConfig(json, option) {
    var _fn$crTimeIndexAndVal = _EuroStatFn["default"].crTimeIndexAndValue(json),
        timeIndex = _fn$crTimeIndexAndVal.timeIndex,
        value = _fn$crTimeIndexAndVal.value,
        data = _EuroStatFn["default"].toPointArr(timeIndex, value),
        title = option.title,
        subtitle = option.subtitle,
        config = _toYearsByMonths["default"].toConfig(data.reverse(), (0, _extends2["default"])({
      title: title,
      subtitle: subtitle,
      itemCaption: title + ': ' + subtitle,
      value: title + '_' + subtitle,
      dataSource: _EuroStatFn["default"].crDataSource(option)
    }, _EuroStatFn["default"].crLinkConf(json, option)));

    _EuroStatFn["default"].setInfo({
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