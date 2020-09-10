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

var _setCaptionTo = function _setCaptionTo(option) {
  var title = option.title;

  _assign(option, {
    itemCaption: title,
    title: crTitle(option),
    subtitle: title
  });
};

var BlsAdapter = {
  toConfig: function toConfig(json, option) {
    _setCaptionTo(option);

    var data = crData(json),
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
      adapter: BlsAdapter,
      json: json,
      option: option
    });
  }
};
var _default = BlsAdapter;
exports["default"] = _default;
//# sourceMappingURL=BlsAdapter.js.map