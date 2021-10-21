"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadGuard = _interopRequireDefault(require("../../utils/LoadGuard"));

var _loadDimsWithOptions = _interopRequireDefault(require("./loadDimsWithOptions"));

const MSG_STILL_LOADING = "Another dialog are still loading",
      MSG_DIMS = 'Loaded dims without options';

const _isDimsWithOptions = dims => {
  const _len = dims.length;
  let i = 0;

  for (i; i < _len; i++) {
    if (!dims[i].options) {
      break;
    }
  }

  return i === _len;
};

const _crPropDimsConfig = (dims, propDims) => {
  const _hmDim = Object.create(null);

  dims.forEach(dim => {
    _hmDim[dim.v] = dim;
  });
  return propDims.map(({
    v,
    c
  }) => ({
    id: v,
    caption: c,
    options: _hmDim[v].options
  }));
};

const _crDimsConfig = dims => dims.map(({
  c,
  v,
  options
}) => ({
  id: v,
  caption: c,
  options
}));

const _crConfigs = (dims, propDims) => {
  const configs = propDims ? _crPropDimsConfig(dims, propDims) : _crDimsConfig(dims);
  configs.dateOptions = dims.dateOptions;
  return configs;
};

const _crUrl = ({
  proxy = '',
  baseMeta,
  dfId
}) => "" + proxy + baseMeta + "/" + dfId;

const _crMetaUrl = props => props.metaUrl || _crUrl(props);

const guard = new _LoadGuard.default();

const loadConfigs = props => {
  if (!guard.isLoading) {
    const metaUrl = _crMetaUrl(props),
          propDims = props.dims;

    guard.start(metaUrl);
    return (0, _loadDimsWithOptions.default)(metaUrl).then(({
      dims,
      mapFrequency,
      timeId
    }) => {
      if (!_isDimsWithOptions(dims)) {
        throw {
          errMsg: MSG_DIMS
        };
      }

      return {
        timeId,
        mapFrequency,
        configs: _crConfigs(dims, propDims)
      };
    }).catch(({
      errMsg,
      message
    }) => ({
      errMsg: errMsg || message
    })).finally(() => {
      guard.stop();
    });
  } else {
    return Promise.resolve({
      errMsg: MSG_STILL_LOADING
    });
  }
};

var _default = loadConfigs;
exports.default = _default;
//# sourceMappingURL=loadConfigs.js.map