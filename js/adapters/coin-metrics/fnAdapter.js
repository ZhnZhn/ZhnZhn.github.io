"use strict";

exports.__esModule = true;
exports.getDaysFromYmd = exports.crError = exports.crData = exports.crConfOption = void 0;

var _AdapterFn = require("../AdapterFn");

exports.getDaysFromYmd = _AdapterFn.getDaysFromYmd;
exports.crError = _AdapterFn.crError;

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

const crData = (json, _ref) => {
  let {
    metric
  } = _ref;
  return json.data.map(function (item) {
    if (item === void 0) {
      item = {};
    }

    return [(0, _AdapterFn.ymdhmsToUTC)((item.time || '').replace('Z', ''), 'T'), parseFloat(item[metric])];
  });
};

exports.crData = crData;

const crConfOption = (option, json, data) => ({
  zhConfig: _crZhConfig(option, data)
});

exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map