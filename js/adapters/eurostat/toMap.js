"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _EuroStatFn = require("./EuroStatFn");

const _assign = Object.assign;

const _addItemCaptionTo = option => {
  const {
    itemCaption,
    subtitle
  } = option;
  option.itemCaption = itemCaption || subtitle;
};

const toMap = {
  createConfig: (json, option) => {
    const {
      data
    } = (0, _EuroStatFn.crData)(json),
          config = _ChartConfig.default.crAreaConfig();

    _addItemCaptionTo(option);

    (0, _EuroStatFn.setDataAndInfo)({
      config,
      data,
      json,
      option
    });

    _assign(config, {
      zhDialog: option,
      json: json,
      zhMapSlice: option.zhMapSlice
    });

    return config;
  }
};
var _default = toMap;
exports.default = _default;
//# sourceMappingURL=toMap.js.map