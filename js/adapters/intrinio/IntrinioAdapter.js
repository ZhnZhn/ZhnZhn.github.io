"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crSubtitle = _fnAdapter["default"].crSubtitle,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var IntrinioAdapter = {
  toConfig: function toConfig(json, option) {
    option.subtitle = crSubtitle(option);
    var data = crData(json, option),
        confOption = crConfigOption(option);
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
      adapter: IntrinioAdapter,
      json: json,
      option: option
    });
  }
};
var _default = IntrinioAdapter;
exports["default"] = _default;
//# sourceMappingURL=IntrinioAdapter.js.map