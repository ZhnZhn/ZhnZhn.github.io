"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crTitle = _fnAdapter["default"].crTitle,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    _assign = Object.assign;
var EiaAdapter = {
  toConfig: function toConfig(json, option) {
    var data = crData(json),
        confOption = crConfigOption(json, option);

    _assign(option, crTitle(option));

    return {
      config: (0, _crConfigType["default"])({
        option: option,
        data: data,
        confOption: confOption
      })
    };
  },
  toSeries: function toSeries(json, option) {
    return Builder.crSeria({
      adapter: EiaAdapter,
      json: json,
      option: option
    });
  }
};
var _default = EiaAdapter;
exports["default"] = _default;
//# sourceMappingURL=EiaAdapter.js.map