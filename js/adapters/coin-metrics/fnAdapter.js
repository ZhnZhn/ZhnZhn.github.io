"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _crFn = require("../crFn");

const {
  ymdhmsToUTC,
  crItemConf,
  crValueConf
} = _AdapterFn.default;

const _crZhConfig = (option, data) => {
  const {
    _itemKey,
    dataSource,
    itemCaption
  } = option;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption,
    dataSource,
    itemConf: {
      _itemKey,
      ...crItemConf(option),
      ...crValueConf(data),
      dataSource
    }
  };
};

const fnAdapter = {
  crError: _crFn.crError.bind(null, "Server Response"),
  crData: json => {
    const arr = json.metricData.series;
    return arr.map(_ref => {
      let {
        time,
        values
      } = _ref;
      return [ymdhmsToUTC((time || '').replace('Z', ''), 'T'), parseFloat((values || [])[0])];
    });
  },
  crConfOption: (option, json, data) => ({
    zhConfig: _crZhConfig(option, data)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map