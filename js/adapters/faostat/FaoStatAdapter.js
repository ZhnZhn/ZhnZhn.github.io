"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = require("../../charts/Tooltip");

var _fnAdapter = require("./fnAdapter");

const FaoStatAdapter = {
  crKey: _fnAdapter.crId,

  toConfig(json, option) {
    const _id = (0, _fnAdapter.crId)(option),
          _title = (0, _fnAdapter.crTitle)(json, option),
          _subtitle = (0, _fnAdapter.crSubtitle)(json, option),
          _points = (0, _fnAdapter.toDataPoints)(json, option),
          config = (0, _ConfigBuilder.default)().areaConfig({
      spacingTop: 25
    }).addCaption(_title, _subtitle).addPoints(_id, _points).addMinMax(_points, option).addTooltip(_Tooltip.tooltipValueDmy).add({
      info: (0, _fnAdapter.toInfo)(json, _title, _subtitle),
      valueMoving: (0, _fnAdapter.crValueMoving)(_points),
      zhConfig: (0, _fnAdapter.crZhConfig)(_id, option)
    }).toConfig();

    return {
      config
    };
  },

  toSeries(json, option) {
    const _data = (0, _fnAdapter.crSeriaData)(json, option),
          {
      itemCaption
    } = option;

    return (0, _ConfigBuilder.default)().initSeria().add({
      data: _data,
      minY: (0, _fnAdapter.findMinY)(_data),
      name: itemCaption,
      itemCaption: itemCaption
    }).toSeria();
  }

};
var _default = FaoStatAdapter;
exports.default = _default;
//# sourceMappingURL=FaoStatAdapter.js.map