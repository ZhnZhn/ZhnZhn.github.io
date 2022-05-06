"use strict";

exports.__esModule = true;
exports.crError = exports.crData = exports.crConfOption = void 0;

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

const _crZhConfig = (option, data) => {
  const {
    _itemKey,
    dataSource
  } = option,
        _config = (0, _AdapterFn.crZhConfig)(option);

  _config.itemConf = {
    _itemKey,
    ...(0, _crFn.crItemConf)(option),
    ...(0, _crFn.crValueConf)(data),
    dataSource
  };
  return _config;
};

const crError = _crFn.crError.bind(null, "Server Response");

exports.crError = crError;

const crData = json => json.metricData.series.map(_ref => {
  let {
    time,
    values
  } = _ref;
  return [(0, _AdapterFn.ymdhmsToUTC)((time || '').replace('Z', ''), 'T'), parseFloat((values || [])[0])];
});

exports.crData = crData;

const crConfOption = (option, json, data) => ({
  zhConfig: _crZhConfig(option, data)
});

exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map