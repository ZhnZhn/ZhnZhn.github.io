"use strict";

exports.__esModule = true;
exports.default = void 0;
var _EsConfig = require("./EsConfig");
var _dimConfigFn = require("./dimConfigFn");
const _keys = Object.keys;
const _crC = label => (label || '').split('_').map(_dimConfigFn.toUpperCaseFirst).join(' ');
const _crEsOptions = (category, id) => {
  const {
    label
  } = category || {};
  return _keys(label || {}).map(k => ({
    caption: label[k],
    value: k,
    id
  }));
};
const _crOptionsWithSc = dim => dim.options.map(item => {
  item.sc = item.value;
  item.caption = `${item.caption} (${item.value})`;
  return item;
});
const crDimConfigEs = dimension => {
  const dims = [null],
    adjDims = [];
  _keys(dimension).forEach(k => {
    if (k !== _EsConfig.TIME_ID) {
      const _dim = dimension[k],
        {
          label,
          category
        } = _dim || {},
        dim = {
          c: _crC(label),
          v: k,
          options: _crEsOptions(category, k)
        };
      if (k === _EsConfig.ADJ_ID) {
        dim.c = _EsConfig.ADJ;
        dim.options = _crOptionsWithSc(dim);
        adjDims.push(dim);
      } else if (k === _EsConfig.GEO_ID) {
        dim.c = _EsConfig.GEO_ENTITY;
        dims[0] = dim;
      } else {
        dims.push(dim);
      }
    }
  });
  return {
    dims: dims.filter(Boolean).concat(adjDims),
    timeId: _EsConfig.TIME_ID
  };
};
var _default = exports.default = crDimConfigEs;
//# sourceMappingURL=crDimConfigEs.js.map