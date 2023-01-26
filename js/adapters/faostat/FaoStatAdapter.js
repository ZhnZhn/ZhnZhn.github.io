"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _Tooltip = require("../../charts/Tooltip");
var _fnAdapter = require("./fnAdapter");
const FaoStatAdapter = {
  crKey: _fnAdapter.crId,
  toConfig(json, option) {
    const _id = (0, _fnAdapter.crId)(option),
      _title = (0, _fnAdapter.crTitle)(json, option),
      _subtitle = (0, _fnAdapter.crSubtitle)(json, option),
      _points = (0, _fnAdapter.toDataPoints)(json, option);
    return {
      config: (0, _pipe.default)((0, _configBuilderFn.crAreaConfig)(), (0, _configBuilderFn.fAddCaption)(_title, _subtitle), (0, _configBuilderFn.fAddPointsToConfig)(_id, _points), (0, _configBuilderFn.fAddMinMax)(_points, option), (0, _configBuilderFn.fAddTooltip)(_Tooltip.tooltipValueDmy), (0, _configBuilderFn.fAdd)({
        info: (0, _fnAdapter.toInfo)(json, _title, _subtitle),
        valueMoving: (0, _fnAdapter.crValueMoving)(_points),
        zhConfig: (0, _fnAdapter.crZhConfig)(_id, option)
      }), _configBuilderFn.toConfig)
    };
  },
  toSeries(json, option) {
    const _data = (0, _fnAdapter.crSeriaData)(json, option),
      {
        itemCaption
      } = option;
    return (0, _pipe.default)((0, _configBuilderFn.crSeriaConfig)(), (0, _configBuilderFn.fAdd)({
      data: _data,
      minY: (0, _fnAdapter.findMinY)(_data),
      name: itemCaption,
      itemCaption
    }));
  }
};
var _default = FaoStatAdapter;
exports.default = _default;
//# sourceMappingURL=FaoStatAdapter.js.map