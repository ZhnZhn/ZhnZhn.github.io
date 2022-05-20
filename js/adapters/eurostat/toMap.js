"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ChartConfigFn = require("../../charts/ChartConfigFn");

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
          config = (0, _ChartConfigFn.crAreaConfig)();

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