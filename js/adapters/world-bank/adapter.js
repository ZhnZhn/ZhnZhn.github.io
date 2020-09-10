"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crId = _fnAdapter["default"].crId,
    crData = _fnAdapter["default"].crData,
    crConfigOptions = _fnAdapter["default"].crConfigOptions;
var adapter = {
  crKey: crId,
  toConfig: function toConfig(json, option) {
    var data = crData(json[1]),
        confOption = crConfigOptions(option, data);
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
      adapter: adapter,
      json: json,
      option: option
    });
  }
};
var _default = adapter;
exports["default"] = _default;
//# sourceMappingURL=adapter.js.map