"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../charts/crConfigType1"));

var Builder = _crConfigType["default"].Builder,
    _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    dataSource: dataSource
  };
},
    crConfigOptionDf = function crConfigOptionDf(option) {
  return {
    zhConfig: _crZhConfig(option)
  };
};

var crAdapterType1 = function crAdapterType1(crData, crConfigOption) {
  if (crConfigOption === void 0) {
    crConfigOption = crConfigOptionDf;
  }

  var adapter = {
    crKey: function crKey(option) {
      return option._itemKey;
    },
    toConfig: function toConfig(json, option) {
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
        adapter: adapter,
        json: json,
        option: option,
        type: 'spline'
      });
    }
  };
  return adapter;
};

var _default = crAdapterType1;
exports["default"] = _default;
//# sourceMappingURL=crAdapterType1.js.map