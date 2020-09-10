"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var OnsAdapter = {
  toConfig: function toConfig(json, option) {
    var data = crData(json),
        confOption = crConfigOption(json, option);
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
      adapter: OnsAdapter,
      json: json,
      option: option
    });
  }
};
var _default = OnsAdapter;
exports["default"] = _default;
//# sourceMappingURL=OnsAdapter.js.map