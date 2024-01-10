"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crConfigType = _interopRequireDefault(require("../charts/crConfigType1"));
var _configBuilderFn = require("../charts/configBuilderFn");
var _AdapterFn = require("./AdapterFn");
const _crZhConfig = _ref => {
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
    addConfOption = _AdapterFn.FN_NOOP,
    trOption = _AdapterFn.FN_NOOP,
    addToConfig = _AdapterFn.FN_IDENTITY
  } = _ref3;
  const adapter = {
    crKey,
    toConfig(json, option) {
      const _data = crData(json, option),
        data = (0, _AdapterFn.isArr)(_data) ? _data : (_data || {}).data,
        confOption = (0, _AdapterFn.assign)(crConfOption(option, json, _data), addConfOption(option, json));
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
var _default = exports.default = crAdapterType1;
//# sourceMappingURL=crAdapterType1.js.map