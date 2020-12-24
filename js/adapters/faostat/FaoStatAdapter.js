"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crId = _fnAdapter["default"].crId,
    crSubtitle = _fnAdapter["default"].crSubtitle,
    crTitle = _fnAdapter["default"].crTitle,
    toDataPoints = _fnAdapter["default"].toDataPoints,
    crZhConfig = _fnAdapter["default"].crZhConfig,
    toInfo = _fnAdapter["default"].toInfo,
    crValueMoving = _fnAdapter["default"].crValueMoving,
    crSeriaData = _fnAdapter["default"].crSeriaData,
    findMinY = _fnAdapter["default"].findMinY;
var FaoStatAdapter = {
  crKey: crId,
  toConfig: function toConfig(json, option) {
    var _id = crId(option),
        _title = crTitle(json, option),
        _subtitle = crSubtitle(json, option),
        _points = toDataPoints(json, option),
        config = (0, _ConfigBuilder["default"])().areaConfig({
      spacingTop: 25
    }).addCaption(_title, _subtitle).addPoints(_id, _points).addMinMax(_points, option).addTooltip(_Tooltip["default"].vDmy).add({
      info: toInfo(json, _title, _subtitle),
      valueMoving: crValueMoving(_points),
      zhConfig: crZhConfig(_id, option)
    }).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    var _data = crSeriaData(json, option),
        itemCaption = option.itemCaption;

    return (0, _ConfigBuilder["default"])().initSeria().add({
      data: _data,
      minY: findMinY(_data),
      name: itemCaption,
      itemCaption: itemCaption
    }).toSeria();
  }
};
var _default = FaoStatAdapter;
exports["default"] = _default;
//# sourceMappingURL=FaoStatAdapter.js.map