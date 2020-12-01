"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crData = _fnAdapter["default"].crData,
    crTitle = _fnAdapter["default"].crTitle,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    _assign = Object.assign;
var CmAdapter = {
  toConfig: function toConfig(json, option) {
    var fromDate = option.fromDate,
        data = crData(json, fromDate),
        confOption = crConfigOption(json, option);

    _assign(option, crTitle(option, json));

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
      adapter: CmAdapter,
      json: json,
      option: option
    });
  }
};
var _default = CmAdapter;
exports["default"] = _default;
//# sourceMappingURL=CmAdapter.js.map