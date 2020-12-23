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
},
    crKeyDf = function crKeyDf(_ref2) {
  var _itemKey = _ref2._itemKey;
  return _itemKey;
};

var crAdapterType1 = function crAdapterType1(_ref3) {
  var _ref3$crKey = _ref3.crKey,
      crKey = _ref3$crKey === void 0 ? crKeyDf : _ref3$crKey,
      crData = _ref3.crData,
      _ref3$crConfOption = _ref3.crConfOption,
      crConfOption = _ref3$crConfOption === void 0 ? crConfOptionDf : _ref3$crConfOption,
      _ref3$addConfOption = _ref3.addConfOption,
      addConfOption = _ref3$addConfOption === void 0 ? NOP : _ref3$addConfOption,
      _ref3$trOption = _ref3.trOption,
      trOption = _ref3$trOption === void 0 ? NOP : _ref3$trOption,
      _ref3$addConfig = _ref3.addConfig,
      addConfig = _ref3$addConfig === void 0 ? IDENTITY : _ref3$addConfig;
  var adapter = {
    crKey: crKey,
    toConfig: function toConfig(json, option) {
      var _data = crData(json, option),
          data = _isArr(_data) ? _data : (_data || {}).data,
          confOption = _assign(crConfOption(option, json), addConfOption(option, json));

      trOption(option, json);
      return {
        config: addConfig(Builder((0, _crConfigType["default"])({
          option: option,
          data: data,
          confOption: confOption
        })), json, option, _data).toConfig()
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