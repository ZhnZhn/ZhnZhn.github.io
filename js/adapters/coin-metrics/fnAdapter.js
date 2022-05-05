"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

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
      ...(0, _crFn.crItemConf)(option),
      ...(0, _crFn.crValueConf)(data),
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
      return [(0, _AdapterFn.ymdhmsToUTC)((time || '').replace('Z', ''), 'T'), parseFloat((values || [])[0])];
    });
  },
  crConfOption: (option, json, data) => ({
    zhConfig: _crZhConfig(option, data)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map