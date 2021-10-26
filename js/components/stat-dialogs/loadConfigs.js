"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadGuard = _interopRequireDefault(require("../../utils/LoadGuard"));

var _loadDimsWithOptions = _interopRequireDefault(require("./loadDimsWithOptions"));

const MSG_STILL_LOADING = "Another dialog are still loading",
      MSG_DIMS = 'Loaded dims without options',
      ES_BASE_META = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en";

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

const _crConfigs = (dims, propDims) => {
  const configs = propDims ? _crPropDimsConfig(dims, propDims) : _crDimsConfig(dims);
  configs.dateOptions = dims.dateOptions;
  return configs;
};

const _crMetaTime = mapFrequency => {
  if (mapFrequency === 'M') {
    return '2019M01';
  }

  if (mapFrequency === 'S') {
    return '2019S1';
  }

  return '2019';
};

const _crUrl = ({
  proxy = '',
  baseMeta,
  dfId,
  loadId,
  mapFrequency
}) => {
  if (loadId === "EU_STAT") {
    return ES_BASE_META + "/" + dfId + "?time=" + _crMetaTime(mapFrequency);
  }

  return "" + proxy + baseMeta + "/" + dfId;
};

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