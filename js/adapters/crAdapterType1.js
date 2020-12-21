"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../charts/crConfigType1"));

var Builder = _crConfigType["default"].Builder,
    _isArr = Array.isArray,
    _assign = Object.assign,
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
    crConfOptionDf = function crConfOptionDf(option) {
  return {
    zhConfig: _crZhConfig(option)
  };
},
    NOP = function NOP() {},
    IDENTITY = function IDENTITY(v) {
  return v;
};

var crAdapterType1 = function crAdapterType1(_ref2) {
  var crData = _ref2.crData,
      _ref2$crConfOption = _ref2.crConfOption,
      crConfOption = _ref2$crConfOption === void 0 ? crConfOptionDf : _ref2$crConfOption,
      _ref2$addConfOption = _ref2.addConfOption,
      addConfOption = _ref2$addConfOption === void 0 ? NOP : _ref2$addConfOption,
      _ref2$trOption = _ref2.trOption,
      trOption = _ref2$trOption === void 0 ? NOP : _ref2$trOption,
      _ref2$addConfig = _ref2.addConfig,
      addConfig = _ref2$addConfig === void 0 ? IDENTITY : _ref2$addConfig;
  var adapter = {
    crKey: function crKey(option) {
      return option._itemKey;
    },
    toConfig: function toConfig(json, option) {
      var _data = crData(json, option),
          data = _isArr(_data) ? _data : (_data || {}).data,
          confOption = _assign(crConfOption(option, json), addConfOption(option, json));

      trOption(option, json);
      return {
        config: addConfig((0, _crConfigType["default"])({
          option: option,
          data: data,
          confOption: confOption
        }), json, option, _data)
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

crAdapterType1.Builder = Builder;
var _default = crAdapterType1;
exports["default"] = _default;
//# sourceMappingURL=crAdapterType1.js.map