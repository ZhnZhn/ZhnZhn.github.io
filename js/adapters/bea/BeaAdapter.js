"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    _assign = Object.assign;

var _setCaptionTo = function _setCaptionTo(option) {
  var title = option.title,
      dfTitle = option.dfTitle;

  _assign(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: title
  });
};

var BeaAdapter = {
  toConfig: function toConfig(json, option) {
    _setCaptionTo(option);

    var Results = json.BEAAPI.Results,
        data = crData(Results, option),
        confOption = crConfigOption(Results, option);
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
      adapter: BeaAdapter,
      json: json,
      option: option
    });
  }
};
var _default = BeaAdapter;
exports["default"] = _default;
//# sourceMappingURL=BeaAdapter.js.map