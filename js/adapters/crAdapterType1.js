"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crConfigType = _interopRequireDefault(require("../charts/crConfigType1"));
var _configBuilderFn = require("../charts/configBuilderFn");
const _isArr = Array.isArray,
  _assign = Object.assign,
  _crZhConfig = _ref => {
    let {
      _itemKey,
      itemCaption,
      dataSource
    } = _ref;
    return {
      id: _itemKey,
      key: _itemKey,
      itemCaption,
      dataSource
    };
  },
  crConfOptionDf = option => ({
    zhConfig: _crZhConfig(option)
  }),
  NOP = () => {},
  IDENTITY = v => v,
  crKeyDf = _ref2 => {
    let {
      _itemKey
    } = _ref2;
    return _itemKey;
  };
const crAdapterType1 = _ref3 => {
  let {
    crKey = crKeyDf,
    crData,
    crConfOption = crConfOptionDf,
    addConfOption = NOP,
    trOption = NOP,
    addToConfig = IDENTITY
  } = _ref3;
  const adapter = {
    crKey,
    toConfig(json, option) {
      const _data = crData(json, option),
        data = _isArr(_data) ? _data : (_data || {}).data,
        confOption = _assign(crConfOption(option, json, _data), addConfOption(option, json));
      trOption(option, json);
      return {
        config: addToConfig((0, _crConfigType.default)({
          option,
          data,
          confOption
        }), json, option, _data)
      };
    },
    toSeries(json, option) {
      return (0, _configBuilderFn.crSeriaConfigFromAdapter)({
        adapter,
        json,
        option,
        type: 'spline'
      });
    }
  };
  return adapter;
};
var _default = crAdapterType1;
exports.default = _default;
//# sourceMappingURL=crAdapterType1.js.map