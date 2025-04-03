"use strict";

exports.__esModule = true;
exports.crMapConfig = void 0;
var _ChartConfigFn = require("../../charts/ChartConfigFn");
var _EuroStatFn = require("./EuroStatFn");
const _assign = Object.assign;
const _addItemCaptionTo = option => {
  option.itemCaption = option.itemCaption || option.subtitle;
};
const crMapConfig = (json, option) => {
  const data = (0, _EuroStatFn.crData)(json)[0],
    config = (0, _ChartConfigFn.crAreaConfig)();
  _addItemCaptionTo(option);
  config.series[0].data = data;
  _assign(config, {
    zhDialog: option,
    json: json,
    zhMapSlice: option.zhMapSlice,
    info: (0, _EuroStatFn.crDatasetInfo)(json),
    zhConfig: (0, _EuroStatFn.crZhConfig)(option)
  });
  return config;
};
exports.crMapConfig = crMapConfig;
//# sourceMappingURL=toMap.js.map