"use strict";

exports.__esModule = true;
exports.default = void 0;

const _crConfigItem = (id, caption, options) => ({
  id,
  caption,
  options
});

const _crPropDimsConfig = (dims, propDims) => {
  const _hmDim = Object.create(null);

  dims.forEach(dim => {
    _hmDim[dim.v] = dim;
  });
  return propDims.map(({
    v,
    c
  }) => _crConfigItem(v, c, _hmDim[v].options));
};

const _crDimsConfig = dims => dims.map(({
  c,
  v,
  options
}) => _crConfigItem(v, c, options));

const _addDfItemTo = configs => {
  configs.forEach((config, index) => {
    const {
      options
    } = config;

    if (options.length === 1) {
      const _item = options[0];
      config.placeholder = _item.caption;
      config.dfItem = _item;
      config.isRow = false;
    }
  });
};

const crConfigs = (dims, propDims) => {
  const configs = propDims ? _crPropDimsConfig(dims, propDims) : _crDimsConfig(dims);
  configs.dateOptions = dims.dateOptions;

  _addDfItemTo(configs);

  return configs;
};

var _default = crConfigs;
exports.default = _default;
//# sourceMappingURL=crConfigs.js.map